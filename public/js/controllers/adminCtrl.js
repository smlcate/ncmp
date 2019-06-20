app.controller('adminCtrl',  ['$scope', '$http', function($scope, $http) {

  var monthNames =  ['January','February','March','April','May','June','July','August','September','October','November','December'];

  var monthDays = [31,28,31,30,31,30,31,31,30,31,30,31];

  var daysOfWeek = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];



  $scope.photos = [];
  // $scope.photoPreviews = [];
  $scope.eventGroups = [];

  $scope.eventPreviews = [];

  $scope.adminEvents = [];
  
  $scope.nextEvent;
  
  $scope.selectedEvent;
  
  $scope.news = {
    series:[],
    selectedEvent: {
    },
    selectedSeries: {
    },
    delayedUntil:'',
    postponedUntil:'',
    postUntil:'',
    type:'normal',
    color:'',
    title:'',
    article:'',
    postedAt: new Date()
  }
  
  $scope.registry = {
    options: [],
    classes: [],
    price_1: 0,
    price_2: 0,
    openReg: {
      qty:10,
      days:true,
      weeks:false,
      months:false
    },
    passes: {
      one_day:{
        name:"One Day",
        available:false,
        price:null
      },
      two_day:{
        name:"Two Day",
        available:false,
        price:null
      },
      three_day:{
        name:"Three Day",
        available:false,
        price:null
      }
    }
  }
  
  
  $scope.savedReg;

  
  $scope.edit = {
    events: 'add',
    
  }

  $scope.controller = {
    startTime: new Date('8:00'),
    endTime: new Date('20:00'),
    daysLength:1,
    info: {

      name: '',
      color: '',
      description: ''

    },
    toAdd: [],
    toRemove: []
  }

  $scope.registrations = {
    registries: [],
    entry_lists: []
  }
  $scope.selectedRegistration;
  $scope.selectedRegistrationList;
  $scope.selectedRegistrationOption;
  $scope.selectedRegistrationMembers = [];
  
  $scope.currentPoints;
  $scope.selectedPointsClass;

  $scope.selectedSeries = 'new';
  
  if ($scope.announcements) {
    $scope.nextEvent = $scope.announcements.events[0];
    console.log($scope.nextEvent);
  }
  
  $http.get('getEventEntryLists')
  .then(function(data) {
    var lists = [];
    for (var i = 0; i < data.data.length; i++) {
      console.log(JSON.parse(data.data[i].entries))
      var l = {
        original:data.data[i],
        entries: JSON.parse(data.data[i].entries)
      }
      lists.push(l);
      for (var j = 0; j < $scope.events.length; j++) {
        if (l.original.event_id === $scope.events[j].id) {
          l.ev = $scope.events[j]
        }
      }
    }
    console.log(lists);
    $scope.registrations.entry_lists = lists;
  })
  

  $('.eventGroupCell').css('border','none');
  $('#newEventGroupCell').css('border-bottom','2px solid #154498');

  $(".seriesInfoInput").on("input", function() {
    if ($scope.selectedSeries !== 'new') {
      
      $scope.edit.events = 'editSeries';
      $('.eventInfoInputs').prop('disabled', 'true')
      $('.timeInputs').prop('disabled', 'true')
      $('.numberInputs').prop('disabled', 'true')
      
    }
      // console.log($scope.edit.events);
  });
  $(".eventInfoInputs").on("input", function() {
    console.log($scope.edit.events);
    if ($scope.edit.events !== 'add') {
      
      $scope.edit.events = 'editEventTrue';
      
    }
      // console.log($scope.edit.events);
  });
  $(".timeInputs").on("input", function() {
    if ($scope.edit.events !== 'add') {
      
      $scope.edit.events = 'editEventTrue';
      
    }
      // console.log($scope.edit.events);
  });
  $(".numberInputs").on("input", function() {
    if ($scope.edit.events !== 'add') {
      
      $scope.edit.events = 'editEventTrue';
      
    }
      // console.log($scope.edit.events);
  });
  
  // $('.eventCells').on('mousenter', function() {
  //   $(this).css('box-shadow','0px 0px 3px 2px rgba(0,0,0,0.7)');
  //   console.log('hit');
  // })
  // .on('mouseout', function(){ 
  //   $(this).css('box-shadow','none');
  // })
  
  $('.registriesViews').css('display','none');
  $('#classesRegistriesView').css('display','flex');

  
  function build(g) {
    $('.adminControlGroups').css('display','none');
    $('#admin' + g + 'Control').css('display', 'flex');
    $('#adminEventsImageSelectPanelCell').css('display','none');
  }
  build()
  $('#adminEventsControl').css('display','flex'); 

  function sortByDate(arr) {

    var stack = arr;

    // console.log(arr);

    var toComp = [] //takes 2 elements to be compared
    var repeat = false;
    for (var i = 0; i < arr.length; i++) {

      toComp = [arr[i],arr[i+1]];
      // console.log('loop #' + i);
      // console.log(toComp)
      if (i === arr.length - 1) {
        if (repeat == true) {
          i = -1;
          repeat = false;
        } else {
          // console.log('hit');
          // console.log(stack);
          return stack;
        }
      } else if (toComp[1].date.slice(5,-17) < toComp[0].date.slice(5,-17)) {
        // toComp.push(arr[i],arr[i+1]);
        stack[i] = toComp[1]
        stack[i+1] = toComp[0]
        toComp = [];
        repeat = true;
        // i=0;
      } else if(toComp[1].date.slice(5,-17) === toComp[0].date.slice(5,-17)) {
        // toComp.push(arr[i],arr[i+1]);
        if (toComp[1].date.slice(8,-14) < toComp[0].date.slice(8,-14)) {
          stack[i] = toComp[1]
          stack[i+1] = toComp[0]
          repeat = true;
          // i=0;
        }
        toComp = [];
      }


    // return stack;
    }
    // console.log(stack);

  }
  function lookAtKeys(arr) {
    var eventKeys = [];

    var newStack = [];

    for (var i = 0; i < arr.length; i++) {
      // console.log('hit')
      if (arr[i].event_key) {
        // console.log('hit2');
        if (eventKeys.length > 0) {
          // console.log('hit3');
          var keep = true;
          for (var j = 0; j < eventKeys.length; j++) {
            // console.log('hit4');
            if (eventKeys[j] == arr[i].event_key) {
              // console.log('hit5');
              keep = false;
              j = eventKeys.length;
            } else if(eventKeys[j] != arr[i].event_key && j+1 == eventKeys.length) {
              eventKeys.push(arr[i].event_key);
              newStack.push(arr[i]);
            }
          }
        } else {
          // console.log('hit6');
          eventKeys.push(arr[i].event_key);
          newStack.push(arr[i]);
        }
        // eventKeys.push(arr[i].event_key)
      } else {
        // console.log('hit7');
        newStack.push(arr[i]);
      }
    }

    return newStack;

  }
  function makeDatePretty(d) {

    var month = monthNames[d.slice(5,-17)-1];
    var date = d.slice(8,-14);
    var day = daysOfWeek[new Date(d).getDay()];

    return day + ', ' + month + ' ' + date;

  }
  function makeTimePretty(t) {
    var h = t.slice(0,-6);
    var m = t.slice(3,-3);
    var append = 'am';
    if (h>12) {
      h = h-12;
      append = 'pm';
    } else if(h===12) {
      append = 'pm'
    }
    return h + ':' + m + append;
  }
  function buildEvents(arr) {

    comparedStack = lookAtKeys(arr);
    // console.log(comparedStack);
    var sortedStack = sortByDate(comparedStack);
    // console.log(sortedStack)
    for (var i = 0; i < sortedStack.length; i++) {
      if (sortedStack[i].display_date) {

      } else {

        sortedStack[i].display_date = makeDatePretty(sortedStack[i].date)

      }
      sortedStack[i].display_start = makeTimePretty(sortedStack[i].start);
      sortedStack[i].display_end = makeTimePretty(sortedStack[i].end)

    }
    $scope.events = sortedStack;
    // console.log($scope.events);
  }
  if ($scope.events.length > 0) {

    buildEvents($scope.events);

  }
  
  function addEntryLists() {
    
    var eventIds = []
    for (var i = 0; i < $scope.eventPreviews.length; i++) {
      eventIds.push($scope.eventPreviews[i].id)
    }
    var entryListObject = {
      classes: [],
      members: [],
      options: [],
      req_member: $scope.registry.req_member
    }
    for (var i = 0; i < $scope.registry.classes.length; i++) {
      entryListObject.classes.push($scope.registry.classes[i].name)
    }
    for (var i = 0; i < $scope.registry.options.length; i++) {
      entryListObject.options.push($scope.registry.options[i].name)
    }
    for (var i = 0; i < entryListObject.classes.length; i++) {
      entryListObject.classes[i] = {
        name:entryListObject.classes[i],
        list:[]
      }
    }
    for (var i = 0; i < entryListObject.options.length; i++) {
      entryListObject.options[i] = {
        name:entryListObject.options[i],
        list:[]
      }
    }
    
    $http.post('addEntryLists',{eventIds: eventIds,objectString:JSON.stringify(entryListObject)})
    .then(function(res) {
      console.log(res.data);
    })
    .catch(function(err) {
      console.log(err);
    })
  }
  
  function buildResults(data) {
    
    console.log(data);
    var d = JSON.parse(data.results);
    // var d = JSON.parse(d.data)
    console.log(d);
    for (var i = 0; i < d.length; i++) {
      for (var j = 0; j < d[i].drivers.length; j++) {
        for (var k = 0; k < d[i].drivers[j].results.length; k++) {
          if (d[i].drivers[j].results[k].position == 1) {
            d[i].drivers[j].results[k].style = "color:gold;font-size:200%;"
          } else if (d[i].drivers[j].results[k].position == 2) {
            d[i].drivers[j].results[k].style = "color:silver;"
          } else if (d[i].drivers[j].results[k].position == 3) {
            d[i].drivers[j].results[k].style = "color:orange;"
          } else if (d[i].drivers[j].results[k].position == 0) {
            d[i].drivers[j].results[k].style = "color:lightgrey;"
          } else if (d[i].drivers[j].results[k].position == 'DQ') {
            d[i].drivers[j].results[k].style = "color:red;"
          }
          if (d[i].drivers[j].results[k].position == 11) {
            d[i].drivers[j].results[k].position = d[i].drivers[j].results[k].position + 'th'
          } else if (d[i].drivers[j].results[k].position == 12) {
            d[i].drivers[j].results[k].position = d[i].drivers[j].results[k].position + 'th'
          } else if (d[i].drivers[j].results[k].position == 13) {
            d[i].drivers[j].results[k].position = d[i].drivers[j].results[k].position + 'th'
          } else if (d[i].drivers[j].results[k].position[d[i].drivers[j].results[k].position.length-1] == 1) {
            d[i].drivers[j].results[k].position = d[i].drivers[j].results[k].position + 'st'
          } else if (d[i].drivers[j].results[k].position[d[i].drivers[j].results[k].position.length-1] == 2) {
            d[i].drivers[j].results[k].position = d[i].drivers[j].results[k].position + 'nd'
          } else if (d[i].drivers[j].results[k].position[d[i].drivers[j].results[k].position.length-1] == 3) {
            d[i].drivers[j].results[k].position = d[i].drivers[j].results[k].position + 'rd'
          } else if(d[i].drivers[j].results[k].position == 0) {
            
          } else if(d[i].drivers[j].results[k].position == 'DQ') {
            
          } else {
            d[i].drivers[j].results[k].position = d[i].drivers[j].results[k].position + 'th'
          }
          if (k === d[i].drivers[j].results.length-1) {
            d[i].drivers[j].results[k].position = d[i].drivers[j].results[k].position.slice(0,-2)
          }
        }
      }
    }
    console.log(d);
    return d;
    
  }
  
  function getPoints() {
    $http.get('getPoints')
    .then(function(data) {
      // console.log(data);
      $scope.currentPoints = buildResults(data.data[data.data.length-1]);
      // console.log($scope.currentPoints);
    })
  }
  getPoints();

$('.adminResultsDriversCells').on('mouseenter', function() {
  // console.log('hit');
  $(this).css('border-bottom','1px solid lightgrey')
})
.on('mouseleave', function() {
  $this.css('border-bottom','none')
})

  // function buildNewsController() {
  //   // console.log('hit');
  //   for (var i = 0; i < $scope.eventGroups.length; i++) {
  //     console.log('hit');
  //     var s = $scope.eventGroups[i];
  //     s.events = [];
  //     console.log(s);
  //     for (var j = 0; j < $scope.events.length; j++) {
  //       if (s.id == $scope.events[j].event_group_id) {
  //         // console.log('hit');
  //         s.events.push($scope.events[j])
  //       }
  //       if (j == $scope.events.length-1) {
  //         $scope.news.series.push(s);
  //         console.log($scope.news.series);
  //       }
  //     }
  // 
  //   }
  // }
  // buildNewsController();
  
  $scope.selectNewsType = function(t) {
    
    $scope.news.type = t;
    
    $('#newsControllerTypeNav a').css('background','white');
    $('#newsControllerTypeNav a').css('color','#154498');
    
    $('#'+t+'NewsTypeAnc').css('background','#154498');
    $('#'+t+'NewsTypeAnc').css('color','#E1F5FE');
    
    if (t == 'normal') {
      $('.newsInputSpans').css('display','none');
      $('#newsWarningSpan p').css('display','none');

    } else if(t == 'delay') {
      $('.newsInputSpans').css('display','none');
      $('#newsDelayInputSpan').css('display','flex');
      $('#newsWarningSpan p').css('display','flex');

    } else if(t == 'postpone') {
      $('.newsInputSpans').css('display','none');
      $('#newsPostponeInputSpan').css('display','flex');
      $('#newsWarningSpan p').css('display','flex');
    } else {
      $('.newsInputSpans').css('display','none');
      $('#newsWarningSpan p').css('display','flex');
    }
  }
  
  $scope.selectNewsSeries = function(s) {
    // console.log(s);
    // $('#newsEventSelectNav').css('display','flex');
    // $('#newsEventSelectNav').css('border-bottom','#154498');
    $scope.news.selectedEvent = {};
    console.log($scope.selectedSeries.color);
    $('.newsSeriesCells').css('background','white');
    $('#'+$scope.news.selectedSeries.id+'newsSeriesCell').css('color',$scope.news.selectedSeries.color);
    $('#noNewsEventBtn').css('background','#154498');
    $('#noNewsEventBtn').css('color','#E1F5FE');
    if (s != 'none') {
      $('#noNewsSeriesBtn').css('background','white');
      $('#noNewsSeriesBtn').css('color','#154498');
      
      $('#newsEventSelectNav').css('border-top','2px solid '+s.color);
      // $('#noNewsSeriesBtn').css('color','#154498');
      $('#'+s.id+'newsSeriesCell').css('background',s.color);
      $('#'+s.id+'newsSeriesCell').css('color','white')

      s.events = [];
      console.log($scope.events);
      for (var i = 0; i < $scope.events.length; i++) {
        if (s.id == $scope.events[i].event_group_id) {
          s.events.push($scope.events[i]);     
        }
        if (i == $scope.events.length-1) {
          $scope.news.selectedSeries = s;
          console.log($scope.news.selectedSeries);      
        }
      }
    } else {
      $scope.news.selectedSeries = {
        name:s,
        color:'#154498'
      }
      $('#noNewsSeriesBtn').css('background','#154498');
      $('#noNewsSeriesBtn').css('color','#E1F5FE');
      
      $('#newsEventSelectNav').css('border-top','2px solid #154498');

      // $('#newsEventSelectNav').css('display','none');
    }
  }
  
  $scope.selectNewsEvent = function(e) {
    $('#newsEventSelectNav .newsEventCells').css('background','white');
    $('#newsEventSelectNav .newsEventCells').css('color',e.color);
    
    $scope.news.selectedEvent = e;
    if (e == 'none') {
      $('#newsEventSelectNav .newsEventCells').css('background','white');
      $('#newsEventSelectNav .newsEventCells').css('color',$scope.news.selectedSeries.color);
      $('#noNewsEventBtn').css('background','#154498');
      $('#noNewsEventBtn').css('color','#E1F5FE');
    } else {
      $('#'+e.id+'newsEventCell').css('background',e.color);
      $('#'+e.id+'newsEventCell').css('color','white');
      $('#noNewsEventBtn').css('background','white');
      $('#noNewsEventBtn').css('color','#154498');
    }




  }
  
  
  
  $scope.checkNewsVars = function() {
    console.log($scope.news.selectedEvent);
  }

  $scope.changeNewsEvent = function(e) {
    console.log($scope.news.selectedEvent.e);
    // console.log(JSON.parse($scope.news.selectedEvent));
    // $scope.news.selectedEvent.info = $scope.news.selectedEvent;
    // $scope.news.selectedEvent.display_date = JSON.parse($scope.news.selectedEvent).display_date;
 
  }
  $scope.saveNews = function() {
    
    function AdjTime(t) {
      if (t.getUTCHours()-5 < 0) {
        n = 24-(5-t.getUTCHours());
        return n+':'+t.getUTCMinutes()+'0';
      } else  {
        return t.getUTCHours()-5+':'+t.getUTCMinutes()+'0';
      }
    }
    var evs = []
    var body = {
      events:[],
      type:'news',
      eventLength:1
    }
    console.log($scope.news);
    if ($scope.news.type == 'delay' || $scope.news.type == 'postpone') {
      console.log('HIT HERE');
      if ($scope.news.selectedEvent.display_date.slice(9).length > 2) {
        console.log("HIT HERE 3");
        console.log('Multiple days');
        f = $scope.news.selectedEvent.display_date.slice(12);
        t = $scope.news.selectedEvent.display_date.slice(9,-3);
        // console.log(f-t);
        // console.log(($scope.news.selectedEvent.display_date.slice(12) - $scope.news.selectedEvent.display_date.slice(9)));
        e = $scope.news.selectedEvent;
        console.log($scope.news.selectedEvent.date);
        $scope.news.postUntil = $scope.news.selectedEvent.date;
        console.log($scope.news.postUntil);
        
        body.eventLength = (f-t)+1;
        console.log(body.eventLength);
        if (typeof(e.date) != 'string') {
          e.date = e.date.toISOString();
        }
        for (var i = 0; i < (f-t)+1; i++) {
          var m = Number(e.date.slice(5,-17));
          var d = e.date.slice(8,-14);
          var y = e.date.slice(0,-20);
          var nd = Number(d) + i;
          var event = {
            id:e.id,
            name: e.name,
            date: m + '/' + nd + '/' + y,
            color: e.color,
            start: e.start,
            end: e.end,
            
            display_end: e.display_end,
            event_key: e.event_key,
            event_group_id:e.event_group_id,
            image: e.image
          }
          event.id += i;
          if ($scope.news.type == 'postpone') {
            
            var d = new Date($scope.news.postponedUntil).toDateString()
            
            var day = d.slice(0,-12),
            month = d.slice(4,-8),
            date = d.slice(8,-5),
            edate = Number(d.slice(8,-5))+(f-t)
            
            event.display_date = day + ' ' + month + ', ' + date;
            
            if ((f-t)+1 > 1) {
              event.display_date = day + ' ' + month + ', ' + date + '-' + edate;
              event.display_start = null;
            }
            
            date += i;
            if (monthDays[month-1] < date) {
              date = (date - monthDays[month-1]);
              month ++;
            }
            
            var y = new Date().getFullYear();
            
            event.date = new Date(y, month-1, date);
            console.log(event.date);
          }
          
            // console.log(makeTimePretty(AdjTime(c.startTime)));
          if ($scope.news.type == 'delay') {
            event.start = $scope.news.delayedUntil;
            if (AdjTime(c.info.startTime).slice(0,-3)<12) {
              event.display_start = AdjTime($scope.news.delayedUntil) + 'am'
            } else {
              event.display_start = (AdjTime($scope.news.delayedUntil).slice(0,-3) - 12) + (AdjTime($scope.news.delayedUntil).slice(2)) + 'pm'
            }
            // if (AdjTime(c.info.endTime).slice(0,-3)<12) {
            //   e.display_end = AdjTime(c.info.endTime) + 'am'
            // } else {
            //   e.display_end = (AdjTime(c.info.endTime).slice(0,-3) - 12) + (AdjTime(c.info.endTime).slice(2)) + 'pm'
            // }
            event.display_end = e.display_end;

          } else {
            event.display_start = e.display_start;
            event.display_end = e.display_end;
          }
            // eventInfo.display_start = makeTimePretty(AdjTime(c.startTime));
            // eventInfo.display_end = makeTimePretty(AdjTime(c.endTime));
          
          evs.push(event);
        }
        
      } else {
        console.log('HIT HERE 1');
        // f = $scope.news.selectedEvent.display_date.slice(12);
        // t = $scope.news.selectedEvent.display_date.slice(9,-3);
        // console.log(f-t);
        // console.log(($scope.news.selectedEvent.display_date.slice(12) - $scope.news.selectedEvent.display_date.slice(9)));
        e = $scope.news.selectedEvent;
        $scope.news.postUntil = $scope.news.selectedEvent.date;
        console.log($scope.news.postUntil);
        
        body.eventLength = 1;
        
        if (typeof(e.date) != 'string') {
          e.date = e.date.toISOString();
        }

        var m = Number(e.date.slice(5,-17));
        var d = e.date.slice(8,-14);
        var y = e.date.slice(0,-20);
        var nd = Number(d) + i;
        var event = {
          id:e.id,
          name: e.name,
          date: m + '/' + nd + '/' + y,
          color: e.color,
          start: e.start,
          end: e.end,
          event_key: e.event_key,
          event_group_id:e.event_group_id,
          image: e.image
        }
        
        // event.id += i;
        if ($scope.news.type == 'postpone') {
          var d = new Date($scope.news.postponedUntil).toDateString()
          
          var day = d.slice(0,-12),
          month = d.slice(4,-8),
          date = d.slice(8,-5),
          edate = Number(d.slice(8,-5))
          
          event.display_date = day + ' ' + month + ', ' + date;
          
          
          event.date = $scope.news.postponedUntil;
          // if ((f-t)+1 > 1) {
          //   event.display_date = day + ' ' + month + ', ' + date + '-' + edate;
          //   event.display_start = null;
          // }
        }
        
          // console.log(makeTimePretty(AdjTime(c.startTime)));
        if ($scope.news.type == 'delay') {
          event.start = $scope.news.delayedUntil;
          if (AdjTime($scope.news.delayedUntil.startTime).slice(0,-3)<12) {
            event.display_start = AdjTime($scope.news.delayedUntil) + 'am'
          } else {
            event.display_start = (AdjTime($scope.news.delayedUntil).slice(0,-3) - 12) + (AdjTime($scope.news.delayedUntil).slice(2)) + 'pm'
          }
          // if (AdjTime(c.info.endTime).slice(0,-3)<12) {
          //   e.display_end = AdjTime(c.info.endTime) + 'am'
          // } else {
          //   e.display_end = (AdjTime(c.info.endTime).slice(0,-3) - 12) + (AdjTime(c.info.endTime).slice(2)) + 'pm'
          // }
          event.display_end = e.display_end;

        } else {
          event.display_start = e.display_start;
          event.display_end = e.display_end;
        }
          // eventInfo.display_start = makeTimePretty(AdjTime(c.startTime));
          // eventInfo.display_end = makeTimePretty(AdjTime(c.endTime));
        
        evs.push(event);
        
      }
      body.events = evs;
      body.type = 'news';
      console.log(body);
      $http.post('editEvent',body)
      .then(function(res) {
        console.log(res);
      })
      .catch(function(err) {
        console.log(err);
      })
    }
    $http.post('saveNews',{news:$scope.news})
    .then(function(res) {
      console.log(res);
    })
  }

  $scope.dropdown = function() {
    $('#seriesName').css('display','flex');
  }

  $scope.selectPointsClass = function(cl) {
    $scope.selectedPointsClass = cl;
  }

  $scope.selectRegistration = function(list, index) {
    console.log(list);
    console.log(index);
    $('.mainRegistryCells').css('background',list.ev.color);
    $('.mainRegistryCells').css('color','black');


    $('#'+index+'registryCell').css('background','#154498','color','#E1F5FE');
    $('#'+index+'registryCell').css('color','#E1F5FE');

    $scope.selectedRegistration = list;
    for (var i = 0; i < list.entries.members.length; i++) {
      var mem = list.entries.members[i];
      mem.entries = [];
      mem.options = [];
      for (var j = 0; j < list.entries.classes.length; j++) {
        for (var k = 0; k < list.entries.classes[j].list.length; k++) {
          if (list.entries.classes[j].list[k].member_id == mem.id) {
            mem.entries.push({
              driver:list.entries.classes[j].list[k],
              name:list.entries.classes[j].name
            });
          }
        }
      }
      for (var l = 0; l < list.entries.options.length; l++) {
        // console.log(list.entries.options[l]);
        for (var m = 0; m < list.entries.options[l].list.length; m++) {
          if (list.entries.options[l].list[m].member_id == mem.id) {
            mem.options.push({
              option:list.entries.options[l].list[m],
              name:list.entries.options[l].name
            });
          }
          
        }
      }
      $scope.selectedRegistrationMembers.push(mem);
    }
    // console.log($scope.selectedRegistrationMembers);
  }
  
  $scope.selectRegistrationList = function(list,index) {
    $('.registryClassCell').css('background','white');
    $('.registryClassCell h1').css('color','#154498');
    console.log(index);

    $('#'+index+'registryClassCell').css('background','#154498');
    $('#'+index+'registryClassCell h1').css('color','#E1F5FE');
    // $('#'+index+'registryClassCell ').css('color','#154498');

    console.log(list);
    $scope.selectedRegistrationList = list;
  }
  $scope.selectRegistrationOption = function(list) {
    var l = list;
    for (var i = 0; i < l.length; i++) {
      for (var j = 0; j < $scope.selectedRegistration.entries.members.length; j++) {
        if (l[i].member_id == $scope.selectedRegistration.entries.members[j].id) {
          l[i].membership = $scope.selectedRegistration.entries.members[j];
        }
      }
    }
    $scope.selectedRegistrationOption = l;
  }
  $scope.selectRegistryView = function(v) {
    $('.registriesViews').css('display','none');
    // $('.mainRegistryCells').css('background','white');
    $('#'+v+'RegistriesView').css('display','flex');
    
    $('#registryViewNav a').css('background','white');
    $('#registryViewNav a').css('color','#154498');

    $('#selectReg'+v+'View').css('background','#154498');
    $('#selectReg'+v+'View').css('color','#E1F5FE');
    
    // $('.mainRegistryCells').css('color','black');


    
  }
  
  $scope.updatePoints = function() {
    
    var fileUpload = document.getElementById("pointsInput");
    console.log(fileUpload.files  );

    var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;

    if (regex.test(fileUpload.value.toLowerCase())) {

      if (typeof (FileReader) != "undefined") {

        var reader = new FileReader();

        var classes = [];
        var i = 0;
        reader.onload = function (e) {
          var cl = e.target.result;
          var classObject = {
            name: '',
            dates: [],
            drivers: [],
          }
          var row = cl.split('\n');
          for (var j = 0; j < row.length; j++) {
            // console.log(row[j]);
            if (j === 0) {
              classObject.name = row[j].split(',')[0];
              console.log(classObject.name);
            } else if(j === 2) {
              for (var k = 0; k < row[j].split(',').length; k++) {
                var evDate = row[j].split(',')[k];
                if (evDate != "") {
                  classObject.dates.push(evDate)    
                }
              }
              
            } else if(j >= 4) {
              var driver = {
                name: row[j].split(',')[0],
                results: []
              }
              if (driver.name == "") {
                
                i++
                classes.push(classObject)
                if (i === fileUpload.files.length) {
                  console.log(classes);
                  var stringData = JSON.stringify(classes)
                  $http.post('updatePoints', {data:stringData})
                  .then(function(res) {
                    console.log(res.data);
                  })
                  .catch(function(err) {
                    console.log(err);
                  })
                  return;
                } else {
                  
                  return reader.readAsText(fileUpload.files[i]);
                  
                }
                
              } else {
                
                for (var k = 1; k < row[j].split(',').length; k = k+2) {
                  var result = {
                    position: row[j].split(',')[k],
                    points: row[j].split(',')[k+1]
                  }
                  driver.results.push(result);
                }
                classObject.drivers.push(driver)
                
              }
            }
          }
          
        }
        
        reader.readAsText(fileUpload.files[i]);
        
      }
    }
    


    
  }

  $scope.selectSeries = function(s) {
    console.log(s);
    // $('#seriesName').css('display','none');
    if (s == 'new') {
      $scope.selectedSeries = 'new'
      $scope.controller.info = {};
      $scope.selectedPhoto = {};
      $scope.eventPreviews = [];
      $scope.edit.events = 'add';
      $('.eventGroupCell').css('border','none');
      $('#newEventGroupCell').css('border-bottom','2px solid #154498');
      
    } else {
      // console.log();
      $scope.selectedSeries = s;
      $('.eventGroupCell').css('border','none');
      $('#' + s.name + 'EventGroupCell').css('border-bottom','2px solid #154498');
      $scope.controller.info.name = s.name;
      $scope.controller.info.color = s.color;
      $scope.controller.info.description = s.description;
      $scope.eventPreviews = [];
      $scope.edit.events = 'view';
      $http.post('getEventRegistration', {seriesId:s.id})
      .then(function(res) {
        if (res.data != "") {
          
          console.log(res.data);
          var reg = JSON.parse(res.data.registry_data);
          $scope.savedReg = reg;
            
          $scope.registry.price_1 = reg.price_1;
          $scope.registry.price_2 = reg.price_2;
          $scope.registry.main_registration = reg.main_registration;

          $scope.registry.req_member = reg.req_member;
          $scope.registry.start_preentry = reg.start_preentry;
          $scope.registry.options = reg.options;
          $scope.registry.classes = reg.classes;
          $scope.registry.passes = reg.passes;
          $scope.registry.passes.one_day.name = "One Day";
          $scope.registry.passes.two_day.name = "Two Day";
          $scope.registry.passes.three_day.name = "Three Day";

          $scope.registry.trans_rental_price = reg.trans_rental_price;
          
        }
      })
      for (var i = 0; i < $scope.events.length; i++) {
        // console.log($scope.events[i], s.id)
        if ($scope.events[i].event_group_id == s.id) {
          // console.log('hit');
          $scope.eventPreviews.push($scope.events[i])
          // console.log($scope.controller.events)
        }
      }
      for (var i = 0; i < $scope.photos.length; i++) {
        // console.log(JSON.parse(s.picture_ids));
        if ($scope.photos[i].id===JSON.parse(s.picture_ids)[0]) {
          $scope.selectedPhoto = $scope.photos[i];
        }
      }
    }
    // console.log($scope.edit.events);
  }
  $scope.edit = function() {
    $scope.edit.events = 'edit';
  }
  $scope.selectEvent = function(e) {
    if (e == $scope.selectedEvent) {
      $('.eventCellInfoContainers').css('display','none');
      $scope.selectedEvent = null;
    } else {
      $scope.selectedEvent = e;
      $('.eventCellInfoContainers').css('display','none');
      $('.eventCells').css('box-shadow','none');
      $('#event'+e+'Cell').css('box-shadow','0px 0px 4px 0px rgba(0,0,0,0.7)');
      $('#event'+e+'Cell .eventCellInfoContainers').css('display','flex');
    }
  }
  
  $scope.saveEdit = function() {
    
    var info = {
      series: $scope.selectedSeries,
      name: $scope.controller.info.name,
      color: $scope.controller.info.color,
      description: $scope.controller.info.description,
      image: $scope.selectedPhoto.id
    }
    
    $http.post('editEventGroup',info)
    .then(function(res) {
      console.log(res.data);
    })
    .catch(function(err) {
      console.log(err);
    })
    
    $http.post('editEventsBySeries', info)
    .then(function(res) {
      console.log(res.data);
    })
    .catch(function(err) {
      console.log(err);
    })
    
  }
  
  $scope.cancelEdit = function() {
    
    $('.eventInfoInputs').prop('disabled', 'false');
    $('.timeInputs').prop('disabled', 'false');
    $('.numberInputs').prop('disabled', 'false');
    
    $('.eventInfoInputs').removeAttr('disabled');
    $('.timeInputs').removeAttr('disabled');
    $('.numberInputs').removeAttr('disabled');
    
    $scope.controller.info.name = $scope.selectedSeries.name;
    $scope.controller.info.color = $scope.selectedSeries.color;
    $scope.controller.info.description = $scope.selectedSeries.description;
    
    $scope.edit.events = 'add';
    
    
  }
  
  $scope.cancelEventEdit = function(req, res, next) {
    
    console.log($scope.selectedEvent);
    
    $scope.controller.info.eventName = $scope.selectedEvent.name;
    $scope.controller.info.startTime = new Date(Date.UTC(0,0,0,$scope.selectedEvent.start.slice(0,-6)+5));
    $scope.controller.info.endTime = new Date(Date.UTC(0,0,0,$scope.selectedEvent.end.slice(0,-6)+16));
    $scope.controller.info.daysLength = $scope.selectedEvent.daysLength;
    $scope.controller.info.date = new Date($scope.selectedEvent.date);
    
    $scope.edit.events = 'select';
    
  }
  
  $scope.saveEventEdit = function(req, res, next) {
    
    function AdjTime(t) {
      if (t.getUTCHours()-5 < 0) {
        n = 24-(5-t.getUTCHours());
        return n+':'+t.getUTCMinutes()+'0';
      } else  {
        return t.getUTCHours()-5+':'+t.getUTCMinutes()+'0';
      }
    }
    
    var eventKey = Math.floor((Math.random() * 100)) + $scope.controller.info.name[1] + $scope.controller.info.name[0];
    var info = {
      id:$scope.selectedEvent.id,
      series: $scope.selectedSeries,
      eventLength: $scope.controller.info.daysLength,
      events: []
    }
    
    function update() {
      $http.post('editEvent', info)
      .then(function(res) {
        console.log(res.data);
      })
      .catch(function(err) {
        console.log(err);
      })
    }
    
    
    for (var i = 0; i < $scope.controller.daysLength; i++) {
      var m = Number(new Date($scope.controller.info.date).getMonth()+1);
      var d = Number(new Date($scope.controller.info.date).getDate());
      var y = Number(new Date($scope.controller.info.date).getYear()+1900);
      var nd = Number(d) + i;
      thisEvent = {
        name: $scope.controller.info.eventName,
        date: m + '/' + nd + '/' + y,
        // color: $scope.controller.info.color,
        start: AdjTime($scope.controller.info.startTime),
        end: AdjTime($scope.controller.info.endTime),
        // event_key: eventKey,
        // image: $scope.selectedPhoto.id
      }
      console.log(thisEvent);
      if ($scope.controller.daysLength == 1) {
        thisEvent.event_key = null;
      } else {
        thisEvent.event_key = eventKey;
      }
      info.events.push(thisEvent);
      if (i+1 === $scope.controller.daysLength) {
        update()
      }
    }    
    
  }
  
  
  $scope.addRegistry = function() {
    
    $('#adminEventRegistryContainer').css('display','flex');
    
  }
  $scope.registryPrice = function() {
    
  }
  $scope.addRegistryOption = function() {
    var opt = {
      name: $scope.registry.option.name,
      price: $scope.registry.option.price,
      quantity_option: $scope.registry.option.quantity_option,
      quantity_limit: $scope.registry.option.quantity_limit
    }
    $scope.registry.options.push(opt);
  }
  $scope.addRegistryClass = function() {
    var cl = {
      name: $scope.registry.class.name,
      cap: $scope.registry.class.entry_cap
    }
    $scope.registry.classes.push(cl);
  }
  $scope.toggleClassesView = function() {
    if ($('#registryClassesContainer').css('display') === 'none') {      
      $('#registryClassesContainer').css('display','flex')
    } else {
      $('#registryClassesContainer').css('display','none')
    }
  }
  
  
  $scope.saveEventRegistry = function() {
    
    var reg = {
      series:$scope.selectedSeries,
      registry:JSON.stringify($scope.registry)
    }
    console.log(reg);
    $http.post('saveEventRegistry', reg)
    .then(function(res) {
      console.log(res.data);
      
    })
    .catch(function(err) {
      console.log(err);
    })
    
    addEntryLists();
    
  }
  
  $scope.deleteSeries = function() {
    var info = {
      id:$scope.selectedSeries.id
    }
    $http.post('deleteEventGroup', info)
    .then(function(res) {
      console.log(res.data);
    })
    .catch(function(err) {
      console.log(err);
    })
  }
  
  $scope.addView = function() {
    $scope.edit.events = 'add';
    $scope.selectedEvent = {};
  }
  
  $scope.selectEventPreview = function(e) {
    console.log(e);
    $('.eventsPreviewCells').css('height','40px');
    $('.eventsPreviewCells').css('box-shadow','none');
    if (e == $scope.selectedEvent) {
      // $('.eventsPreviewCells').css('height','40px');
      // $('.eventsPreviewCells').css('box-shadow','none');
      
      $scope.selectedEvent = null;
    } else {
      $scope.selectedEvent = e;
      $scope.edit.events = 'select';
      $scope.controller.info.eventName = e.name;
      $scope.controller.info.date = new Date(e.date);
      $scope.controller.info.startTime = new Date(Date.UTC(0,0,0,e.start.slice(0,-6)+5));
      $scope.controller.info.endTime = new Date(Date.UTC(0,0,0,e.end.slice(0,-6)+16));
      
      if (e.display_date.split('-').length==2) {
        var fd = Number(e.display_date.split('-')[0].slice(e.display_date.split('-')[0].length-2))
        var ld = Number(e.display_date.split('-')[1])
        $scope.controller.daysLength = ld - fd + 1;
      }
      
      // console.log(e.end,new Date(Date.UTC(0,0,0,e.end.slice(0,-6)+5)));
      // 
      // console.log('hello',$scope.controller.info)
      
      $('#event'+e.id+'PreviewCell').css('box-shadow','0px 1px 2px 0px rgba(0,0,0,0.7)');
      $('#event'+e.id+'PreviewCell').css('height','70px');
    }
  }
  
  
  $scope.addDate = function(c) {

    var eventKey = Math.floor((Math.random() * 100)) + c.info.name[1] + c.info.name[0];

    function AdjTime(t) {
      if (t.getUTCHours()-5 < 0) {
        n = 24-(5-t.getUTCHours());
        return n+':'+t.getUTCMinutes()+'0';
      } else  {
        return t.getUTCHours()-5+':'+t.getUTCMinutes()+'0';
      }
    }

    var eventInfo = {
      name: c.info.name,
      date: c.info.date,
      dateString: c.info.date.toISOString(),
      display_date: '',
      image: $scope.selectedPhoto.id,
      color: c.info.color,
      description: c.info.description,
      tag: 'add',
      events: [],
    }
    if (typeof(eventInfo.date) != 'string') {
      eventInfo.date = eventInfo.date.toISOString();
    }
    for (var i = 0; i < c.daysLength; i++) {
      var m = Number(eventInfo.date.slice(5,-17));
      var d = eventInfo.date.slice(8,-14);
      var y = eventInfo.date.slice(0,-20);
      var nd = Number(d) + i;
      var event = {
        name: c.info.eventName,
        date: m + '/' + nd + '/' + y,
        color: eventInfo.color,
        start: AdjTime(c.info.startTime),
        end: AdjTime(c.info.endTime),
        event_key: eventKey,
        image: $scope.selectedPhoto.id
      }
      if (c.daysLength == 1) {
        event.event_key = null;
      }
      eventInfo.events.push(event);
    }
    var d = new Date(eventInfo.date).toDateString()

    var day = d.slice(0,-12),
        month = d.slice(4,-8),
        date = d.slice(8,-5),
        edate = Number(d.slice(8,-5))+c.daysLength-1

    eventInfo.display_date = day + ' ' + month + ', ' + date;

    if (c.daysLength > 1) {
      eventInfo.display_date = day + ' ' + month + ', ' + date + '-' + edate;
      eventInfo.display_start = null;
    } else {
      // console.log(makeTimePretty(AdjTime(c.startTime)));
      if (AdjTime(c.info.startTime).slice(0,-3)<12) {
        eventInfo.display_start = AdjTime(c.info.startTime) + 'am'
      } else {
        eventInfo.display_start = (AdjTime(c.info.startTime).slice(0,-3) - 12) + (AdjTime(c.info.startTime).slice(2)) + 'pm'
      }
      if (AdjTime(c.info.endTime).slice(0,-3)<12) {
        eventInfo.display_end = AdjTime(c.info.endTime) + 'am'
      } else {
        eventInfo.display_end = (AdjTime(c.info.endTime).slice(0,-3) - 12) + (AdjTime(c.info.endTime).slice(2)) + 'pm'
      }
      // eventInfo.display_start = makeTimePretty(AdjTime(c.startTime));
      // eventInfo.display_end = makeTimePretty(AdjTime(c.endTime));
    }


    $scope.eventPreviews.push(eventInfo);
    $scope.controller.toAdd.push(eventInfo);

    function sortPreviewsByDate (arr) {

      var arr = $scope.eventPreviews;

      // console.log(arr);

      var toComp = [] //takes 2 elements to be compared
      var repeat = false;
      for (var i = 0; i < arr.length; i++) {

        toComp = [arr[i],arr[i+1]];
        // console.log(typeof(arr[i].date));
        // console.log(toComp)
        if (i === arr.length - 1) {
          if (repeat == true) {
            i = -1;
            repeat = false;
          } else {
            // console.log('hit');
            return arr;
          }
        } else if (toComp[1].date.slice(5,-17) < toComp[0].date.slice(5,-17)) {
          // toComp.push(arr[i],arr[i+1]);
          arr[i] = toComp[1]
          arr[i+1] = toComp[0]
          toComp = [];
          repeat = true;
          // i=0;
        } else if(toComp[1].date.slice(5,-17) === toComp[0].date.slice(5,-17)) {
          // toComp.push(arr[i],arr[i+1]);
          if (toComp[1].date.slice(8,-14) < toComp[0].date.slice(8,-14)) {
            arr[i] = toComp[1]
            arr[i+1] = toComp[0]
            repeat = true;
            // i=0;
          }
          toComp = [];
        }



        // return stack;
      }

    }
    $scope.eventPreviews = sortPreviewsByDate($scope.eventPreviews);
    // console.log($scope.eventPreviews);

  }
  $scope.submitEvents = function() {

    if ($scope.selectedSeries === 'new') {
      $http.post('addEventGroup', $scope.controller)
      .then(function(res) {
        if (res.data = 'success') {
          $http.post('getEventGroup', $scope.controller)
          .then(function(res) {

            var groupId = res.data[0].id;
            for (var i = 0; i < $scope.eventPreviews.length; i++) {
              for (var j = 0; j < $scope.eventPreviews[i].events.length; j++) {
                $scope.eventPreviews[i].events[j].event_group_id = groupId;
                $scope.eventPreviews[i].events[j].description = $scope.eventPreviews[i].description;
                // $scope.eventPreviews[i].events[j].name = $scope.eventPreviews[i].name;
                $scope.eventPreviews[i].events[j].display_date = $scope.eventPreviews[i].display_date;
                // console.log($scope.eventPreviews[i].events[j].date);
              }
              $scope.eventPreviews[i].event_group_id = groupId;

            }
            
            console.log($scope.eventPreviews);
            if (i+1 === $scope.eventPreviews.length) {

              $http.post('addEvents', $scope.eventPreviews)
              .then(function(res) {
                // console.log(res);
              })
              .catch(function(err) {
                console.log(err);
              })

            } else {
              console.log($scope.eventPreviews);
              $http.post('addEvents', $scope.eventPreviews)
              .then(function(res) {
                // console.log(res);
              })
              .catch(function(err) {
                console.log(err);
              })
            }
            addEntryLists();
          })
        }
      })
      .catch(function(err) {
        console.log(err);
      })

    } else {
      
      console.log($scope.controller.toAdd);

      for (var i = 0; i < $scope.controller.toAdd.length; i++) {

        for (var j = 0; j < $scope.controller.toAdd[i].events.length; j++) {
          $scope.controller.toAdd[i].events[j].event_group_id = $scope.selectedSeries.id;
          $scope.controller.toAdd[i].events[j].description = $scope.controller.toAdd[i].description;
          // $scope.controller.toAdd[i].events[j].name = $scope.controller.toAdd[i].name;
          $scope.controller.toAdd[i].events[j].display_date = $scope.controller.toAdd[i].display_date;
          // console.log($scope.eventPreviews[i].events[j].date);
        }

        $scope.controller.toAdd[i].event_group_id = $scope.selectedSeries.id;

      }
      $http.post('addEvents', $scope.controller.toAdd)
      .then(function(res) {
        // console.log(res)
      })
      .catch(function(err) {
        console.log(err);
      })
      addEntryLists();

    }



  }

  $scope.deleteEvent = function(e) {
    
    console.log("HIIITTTTTT");

    console.log(e);
    
    var days = 1;
    
    if (e.display_date.slice('-').length == 2) {
      
      var fd = Number(e.display_date.slice(9,-3));
      var ld = Number(e.display_date.slice(12));
      
      days = ld-fd+1;
      
    }
    
    
    console.log(e.display_date);
    
    toDelete = [];
    
    for (var i = 0; i < days; i++) {
      var ed =  {
        id: e.id+i
      };
      toDelete.push(ed);
      console.log(toDelete);
      if (i === days-1) { 
        
        $http.post('deleteEvent', toDelete)
        .then(function(res) {
          $http.get('getData')
          .then(function(res) {
            $scope.events = res.data;
            console.log($scope.events);
            buildEvents($scope.events);
            
            $scope.eventPreviews = [];
            // $scope.controller.info.description = s.description;
            for (var i = 0; i < $scope.events.length; i++) {
              // console.log($scope.events[i], s.id)
              if ($scope.events[i].event_group_id == e.event_group_id) {
                // console.log('hit');
                $scope.eventPreviews.push($scope.events[i])
                // console.log($scope.controller.events)
              }
            }
            console.log($scope.eventPreviews);
          })
          .catch(function(err) {
            console.log(err);
          })
        })
        .catch(function(err) {
          console.log(err);
        })
        
      }
    }

  }

  $scope.openPhotoSelect = function() {
    $('#adminEventsImageSelectPanelCell').css('display','flex');
  }
  $scope.selectPreviewImg = function(p) {
    $scope.selectedPhoto = p;
    $scope.controller.image = p.id;
    $('#adminEventsImageSelectPanelCell').css('display','none');
  }

  $scope.sendInput = function() {

    // console.log($('#input')[0].files)

    var files = $('#input')[0].files;

    // console.log(file);


    var urls = [];

    var i = 0;

    function readUrl(file) {

      var reader = new FileReader();

      reader.onload = function(){

        // take dataURL and push onto preview
        var dataURL = reader.result;


        // console.log(dataURL);

        // urls.push(dataURL);



        $http.post('uploadImage', {data:dataURL})
        .then(function(res) {
          // console.log(res.data);
        })
        .catch(function(err) {
          console.log(err);
        })

        if (urls.length < files.length) {
          i++;
          readUrl(files[i])
        }

      };

      reader.readAsDataURL(file);

    }

    readUrl(files[i])

    // console.log(reader);

  }

  $scope.addSponsor = function() {
    
    var file = $('#sponsorInput')[0].files
    
    var reader = new FileReader();
    
    function readUrl(file) {
      
      reader.onload = function(){
        
        // take dataURL and push onto preview
        var dataURL = reader.result;
        
        var s = {
          page_url: $scope.sponsor.pageURL,
          image_data_url: dataURL
        }
        
        $http.post('addSponsor', s)
        .then(function(res) {
          console.log(res.data);
          $http.get('getSponsors')
          .then(function(data) {
            $scope.sponsors = data.data;
          })
          
        })
        .catch(function(err) {
          console.log(err);
        })
        
      };
      
      reader.readAsDataURL(file);
      
    }

    readUrl(file[0])

    
  }

  $scope.thisPhoto = function(p) {
    // console.log(p);
  }

  $scope.changeAdminDisplay = function(d) {
    $('.adminControlGroups').css('display','none');
    $('#admin'+d+'Control').css('display','flex');
    
    if (d == 'Registrations' && $scope.selectedRegistration == null) {
      
      var list = $scope.registrations.entry_lists[0];
      console.log(list);
      // console.log(index);
      // $('.mainRegistryCells').css('background',list.ev.color);
      // $('.mainRegistryCells').css('color','black');


      $('#1registryCell').css('background','#154498','color','#E1F5FE');
      $('#1registryCell').css('color','#E1F5FE');

      $scope.selectedRegistration = list;
      for (var i = 0; i < list.entries.members.length; i++) {
        var mem = list.entries.members[i];
        mem.entries = [];
        mem.options = [];
        for (var j = 0; j < list.entries.classes.length; j++) {
          for (var k = 0; k < list.entries.classes[j].list.length; k++) {
            if (list.entries.classes[j].list[k].member_id == mem.id) {
              mem.entries.push({
                driver:list.entries.classes[j].list[k],
                name:list.entries.classes[j].name
              });
            }
          }
        }
        for (var l = 0; l < list.entries.options.length; l++) {
          // console.log(list.entries.options[l]);
          for (var m = 0; m < list.entries.options[l].list.length; m++) {
            if (list.entries.options[l].list[m].member_id == mem.id) {
              mem.options.push({
                option:list.entries.options[l].list[m],
                name:list.entries.options[l].name
              });
            }
            
          }
        }
        $scope.selectedRegistrationMembers.push(mem);
      }
      
    }
  }

  $http.get('getAllEventGroups')
  .then(function(res) {
    $scope.eventGroups = res.data;
  })
  .catch(function(err) {
    console.log(err);
  })

  $http.get('getImages')
  .then(function(res) {

    for (var i = 0; i < res.data.length; i++) {

      var photo = res.data[i];

      photo.dataURL = res.data[i].dataURL;

      $scope.photos.push(photo);

    }
  })


}])
