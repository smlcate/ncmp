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


  $scope.selectedSeries = 'new';
  
  if ($scope.announcements) {
    $scope.nextEvent = $scope.announcements.events[0];
    console.log($scope.nextEvent);
  }

  $('.eventGroupCell').css('border','none');
  $('#newEventGroupCell').css('border-bottom','2px solid #154498');

  // $('.eventCells').on('mousenter', function() {
  //   $(this).css('box-shadow','0px 0px 3px 2px rgba(0,0,0,0.7)');
  //   console.log('hit');
  // })
  // .on('mouseout', function(){ 
  //   $(this).css('box-shadow','none');
  // })
  

  
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

  $scope.dropdown = function() {
    $('#seriesName').css('display','flex');
  }



  $scope.selectSeries = function(s) {
    // console.log(s);
    // $('#seriesName').css('display','none');
    if (s == 'new') {
      $scope.selectedSeries = 'new'
      $('.eventGroupCell').css('border','none');
      $('#newEventGroupCell').css('border-bottom','2px solid #154498');

    } else {
      // console.log();
      $scope.selectedSeries = s;
      $('.eventGroupCell').css('border','none');
      $('#' + s.name + 'EventGroupCell').css('border-bottom','2px solid #154498');
      $scope.controller.info.name = s.name;
      $scope.controller.info.color = s.color;
      $scope.eventPreviews = [];
      $scope.controller.info.description = s.description;
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
    // console.log($scope.eventPreviews);
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
      image: c.image,
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
        date: m + '/' + nd + '/' + y,
        color: eventInfo.color,
        start: AdjTime(c.startTime),
        end: AdjTime(c.endTime),
        event_key: eventKey,
        image: c.image
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
      if (AdjTime(c.startTime).slice(0,-3)<12) {
        eventInfo.display_start = AdjTime(c.startTime) + 'am'
      } else {
        eventInfo.display_start = (AdjTime(c.startTime).slice(0,-3) - 12) + (AdjTime(c.startTime).slice(2)) + 'pm'
      }
      if (AdjTime(c.endTime).slice(0,-3)<12) {
        eventInfo.display_end = AdjTime(c.endTime) + 'am'
      } else {
        eventInfo.display_end = (AdjTime(c.endTime).slice(0,-3) - 12) + (AdjTime(c.endTime).slice(2)) + 'pm'
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
                $scope.eventPreviews[i].events[j].name = $scope.eventPreviews[i].name;
                $scope.eventPreviews[i].events[j].display_date = $scope.eventPreviews[i].display_date;
                // console.log($scope.eventPreviews[i].events[j].date);
              }
              $scope.eventPreviews[i].event_group_id = groupId;

            }
            if (i+1 === $scope.eventPreviews.length) {

              $http.post('addEvents', $scope.eventPreviews)
              .then(function(res) {
                // console.log(res);
              })
              .catch(function(err) {
                console.log(err);
              })

            } else {
              $http.post('addEvents', $scope.eventPreviews)
              .then(function(res) {
                // console.log(res);
              })
              .catch(function(err) {
                console.log(err);
              })
            }
          })
        }
      })
      .catch(function(err) {
        console.log(err);
      })

    } else {

      for (var i = 0; i < $scope.controller.toAdd.length; i++) {

        for (var j = 0; j < $scope.controller.toAdd[i].events.length; j++) {
          $scope.controller.toAdd[i].events[j].event_group_id = $scope.selectedSeries.id;
          $scope.controller.toAdd[i].events[j].description = $scope.controller.toAdd[i].description;
          $scope.controller.toAdd[i].events[j].name = $scope.controller.toAdd[i].name;
          $scope.controller.toAdd[i].events[j].display_date = $scope.controller.toAdd[i].displayDate;
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

    }



  }

  $scope.deleteEvent = function(e) {

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
      if (i === days-1) {
        
        $http.post('deleteEvent', toDelete)
        .then(function(res) {
          $http.get('getData')
          .then(function(res) {
            $scope.events = res.data;
            // console.log($scope.events);
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



  $scope.thisPhoto = function(p) {
    // console.log(p);
  }

  $scope.changeAdminDisplay = function(d) {
    $('.adminControlGroups').css('display','none');
    $('#admin'+d+'Control').css('display','flex');
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
