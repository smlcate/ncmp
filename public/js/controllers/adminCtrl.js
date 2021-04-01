app.controller('adminCtrl',  ['$scope', '$http', '$compile', function($scope, $http,$compile) {

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

  $scope.newAccount = {
    email:'',
    password:''
  }

  $scope.people = [];
  $scope.peopleToShow = [];

  $scope.drivers = [];
  $scope.driversToShow = [];

  $scope.manager = {
    inputs: {
      newAccountEmail:'',
      newAccountPassword:'',
      newMembershipAccount:{},
      newMembershipAccountInput:'',
      newMembershipNewDriver:'',
      newMembershipDrivers:[],
      registerRacerDriver:{},
      registerRacerDriverInput:'',
      registerRacerClasses:[],
      registerRacerClassInput:'',
      registerRacerClassNumber:'',
      registerRacerClass:{},
      searchingDrivers:false,
      searchingClasses:false,
      searchingAccounts:false,
      membershipExists:false
    }
  }

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

  $scope.clubRules = {
    ruleLists:[
      {
        id:0,
        name:'KRA 1',
        classes:[]
      }
    ],
    inputs: {
      edit:false,
      newClass:'',
      newList:'',
      newRule:'',
      addNewList:false
    },
    currentList:0,
    currentClass:0
  };
  $scope.clubSchedules = {
    schedules:[
      {
        id:0,
        name:'KRA 1',
        days:[{
          id:1,
          header:'',
          rounds:[]
        }]
      }
    ],
    inputs: {
      edit:false,
      editHeader:false,
      editTitle:false,
      editSchedule:true,
      editRound:false,
      newScheduleTitle:'',
      gatesOpen:new Date(1970,0,1,7,0,0),
      gatesClosed:new Date(1970,0,1,20,0,0),
      addingRound:false,
      newClass:'',
      newRoundType:'Practice',
      kidKart:false,
      kidKartInfo:[],
      kidKartInfoInput:'',
      roundInfo:'',
      newTime:'',
      interval:7,
      intervalLap:false,
      intervalTime:true,
      roundStart:new Date(1970,0,1,8,0,0),
      newSchedule:'',
      addNewSchedule:false,
      roundGroups:[],
      newGroupClasses:'',
      newGroupTime:'',
      newGroupNotes:''
    },
    currentSchedule:0,
    currentRound:0,
    currentDay:0
  }

  $scope.registry = {
    series_id:'',
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

  $scope.newClass = {
    name:'',
    entryCap:'0',
    weight:'',
    tires:'',
    otherRules:[]
  }
  $scope.newOtherRule;

  $scope.savedReg;


  $scope.edit = {
    events: 'add',

  }

  $scope.controller = {
    // startTime: new Date('8:00'),
    // endTime: new Date('20:00'),
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
    entry_lists: [],
    // passes:[],
    // options:[]
  }
  $scope.selectedRegistration;
  $scope.selectedRegistrationList;
  $scope.selectedRegistrationPasses;
  $scope.selectedRegistrationOption;
  $scope.selectedRegistrationMembers = [];

  $scope.currentPoints;
  $scope.selectedPointsClass;

  $scope.selectedSeries = 'new';

  if ($scope.announcements) {
    $scope.nextEvent = $scope.announcements.events[0];
    // console.log($scope.nextEvent);
  }

  $http.get('getSchedules')
  .then(function(data) {
    console.log(data.data);
    if (data.data.length > 0) {
      $scope.clubSchedules.schedules = JSON.parse(data.data[0].schedule_data);

      console.log($scope.clubSchedules);
      // var newScheds = [];
      for (var i = 0; i < $scope.clubSchedules.schedules.length; i++) {
        sched = $scope.clubSchedules.schedules[i];
        sched.gatesOpen = new Date(sched.gatesOpen);
        sched.gatesClosed = new Date(sched.gatesClosed);
        // newScheds.push(sched);
        // i = $scope.clubSchedules.schedules.length;
        // $scope.clubSchedules.schedules = newScheds;
      }

    }
  })
  .catch(function(err) {
    console.log(err);
  })

  $http.get('getMembers')
  .then(function(data) {
    $scope.people = data.data;
    $scope.peopleToShow = data.data;
    // console.log(data);
    for (var i = 0; i < $scope.people.length; i++) {
      $scope.people[i].membership = JSON.parse($scope.people[i].membership);
      console.log($scope.people[i].membership);
      if ($scope.people[i].membership != null) {
        for (var j = 0; j < $scope.people[i].membership.members.length; j++) {
          if ($scope.people[i].membership.members[j].fName != '') {
            $scope.drivers.push($scope.people[i].membership.members[j]);
            $scope.driversToShow.push($scope.people[i].membership.members[j]);
          }
        }
      }
    }

    console.log($scope.people);
    console.log($scope.drivers);

  })
  .catch(function(err) {
    console.log(err);
  })

  $http.get('getEventEntryLists')
  .then(function(data) {
    var lists = [];
    for (var i = 0; i < data.data.length; i++) {
      console.log(data.data[i]);
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
  .catch(function(err) {
    console.log(err);
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
    // console.log($scope.edit.events);
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
    $('#adminManagerDisplayBtn').css('background','#E1F5FE');
    $('#adminManagerDisplayBtn').css('color','#154498');
    $('#adminManagerControl').css('display','flex');
  }
  build()

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

  function AdjTime(t) {
    console.log('hit this function');
    if (t.getUTCHours()-5 < 0) {
      n = 24-(5-t.getUTCHours());
      console.log(t.getUTCMinutes());
      if (t.getUTCMinutes() < 10) {
        console.log('hit here');
        return n+':'+'0'+t.getUTCMinutes()+'0';

      } else {

        return n+':'+t.getUTCMinutes()+'0';
      }
    } else  {
      if (t.getUTCMinutes() < 10) {
        console.log('hit here');
        return t.getUTCHours()-5+':0'+t.getUTCMinutes()+'0';
      } else {
        return t.getUTCHours()-5+':'+t.getUTCMinutes()+'0';
      }
    }
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
    console.log(t);
    var h, m;
    var splitTime;
    if (t.length > 6) {
       h = t.slice(0,-6);
       m = t.slice(3,-3);
    } else {
      splitTime = t.split(':');
      h = Number(splitTime[0])
      m = splitTime[1]
      if (m.length > 2) {
        m = m.slice(0,-1)
      }
    }
    console.log(h);
    var append = 'am';
    if (h>12) {
      h = h-12;
      append = 'pm';
    } else if(h===12) {
      append = 'pm'
    } else if(h == 0) {
      h = 12;
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
      // sortedStack[i].display_start = makeTimePretty(sortedStack[i].start);
      // sortedStack[i].display_end = makeTimePretty(sortedStack[i].end)

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
    // console.log(d);
    return d;

  }

  function getPoints() {
    $http.get('getPoints')
    .then(function(data) {
      console.log(data);
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

  $scope.deleteAllEventRegistrations = function() {
    $http.get('deleteAllEventRegistrations')
    .then(function(res){
      console.log(res.data);
    })
    .catch(function(err) {
      console.log(err);
    })
  }

  $scope.createAccount = function() {
    $scope.newAccount.email = $scope.manager.inputs.newAccountEmail;
    $scope.newAccount.password = $scope.manager.inputs.newAccountPassword;

    $http.post('/signUp', {auth:$scope.newAccount})
    .then(function(res) {
      console.log(res);
    })
    .catch(function(err) {
      console.log(err);
    })
  }

  $scope.openAccountsList = function() {

    // console.log('hit');

    if ($scope.manager.inputs.searchingAccounts == false) {
      // console.log('switch false');
      $('#adminManagerControlAccountListDiv').css('display','flex');
      $scope.manager.inputs.searchingAccounts = true;
    } else if ($scope.manager.inputs.searchingAccounts == true) {
      // console.log('switch true');
      $('#adminManagerControlAccountListDiv').css('display','none');
      $scope.manager.inputs.searchingAccounts = false;
    }


  }
  $scope.selectAccount = function(a) {
    $scope.manager.inputs.newMembershipAccount = a;
    $scope.manager.inputs.newMembershipAccountInput = a.email;
    $('#adminManagerControlAccountListDiv').css('display','none');
    $scope.manager.inputs.searchingAccounts = false;
    if (a.membership != null) {

      // console.log('hit membership');
      $scope.manager.inputs.membershipExists = true;
    } else {
      $scope.manager.inputs.membershipExists = false;
    }
  }
  $scope.addDriverToNewMembership = function() {
    $scope.manager.inputs.newMembershipDrivers.push($scope.manager.inputs.newMembershipNewDriver);
    $scope.manager.inputs.newMembershipNewDriver = '';
  }


  $scope.openDriversList = function() {

    console.log('hit');

    if ($scope.manager.inputs.searchingDrivers == false) {
      // console.log('switch false');
      $('#adminManagerControlRegisterRacersDriverListDiv').css('display','flex');
      $scope.manager.inputs.searchingDrivers = true;
    } else if ($scope.manager.inputs.searchingDrivers == true) {
      // console.log('switch true');
      $('#adminManagerControlRegisterRacersDriverListDiv').css('display','none');
      $scope.manager.inputs.searchingDrivers = false;
    }


  }
  $scope.selectRegisterRacersDriver = function(d) {
    // console.log(d);
    $scope.manager.inputs.registerRacerDriver = d;
    $scope.manager.inputs.registerRacerDriverInput = d.fName + ' ' + d.lName;
    $('#adminManagerControlRegisterRacersDriverListDiv').css('display','none');
    $scope.manager.inputs.searchingDrivers = false;

  }
  $scope.selectRegisterRacersClass = function(c) {
    // console.log(c);
    $scope.manager.inputs.registerRacerClass = c;
    $scope.manager.inputs.registerRacerClassInput = c.name;
    $('#adminManagerControlRegisterRacersClassesListDiv').css('display','none');
    $scope.manager.inputs.searchingClasses = false;

  }
  $scope.addClassToRegisterRacers = function() {
    $scope.manager.inputs.registerRacerClasses.push({
      class:$scope.manager.inputs.registerRacerClass,
      number:$scope.manager.inputs.registerRacerClassNumber
    });
  }
  $scope.openClassesList = function() {

    // console.log('hit');

    if ($scope.manager.inputs.searchingClasses == false) {
      // console.log($scope.nextEvent);
      // console.log('switch false');
      $('#adminManagerControlRegisterRacersClassesListDiv').css('display','flex');
      $scope.manager.inputs.searchingClasses = true;
    } else if ($scope.manager.inputs.searchingClasses == true) {
      // console.log('switch true');
      $('#adminManagerControlRegisterRacersClassesListDiv').css('display','none');
      $scope.manager.inputs.searchingClasses = false;
    }


  }



  function setClubRules() {

    $http.get('getRules')
    .then(function(data) {
      // console.log(data);
      // console.log(data.data);
      if (data.data[0].ruleData != undefined) {

        $scope.clubRules.ruleLists = JSON.parse(data.data[0].ruleData);
        // console.log($scope.clubRules);
      }
    })
    .catch(function(err) {
      console.log(err);
    })

    $scope.clubRules.inputs.newList = 'KRA ' + ($scope.clubRules.ruleLists.length+1);
  }
  setClubRules();

  function setClubSchedules() {
    $scope.clubSchedules.inputs.newSchedule = 'KRA ' + ($scope.clubSchedules.schedules.length+1);
    $scope.clubSchedules.inputs.newGroupTime = $scope.clubSchedules.inputs.roundStart;
    $scope.clubSchedules.inputs.newGroupLaps = $scope.clubSchedules.inputs.interval;
  }
  setClubSchedules();

  $scope.editClubRules = function() {
    $scope.clubRules.inputs.edit = true;
  }
  $scope.cancelClubRulesEdit = function() {
    $scope.clubRules.inputs.edit = false;
  }

  $scope.newRuleList = function() {
    $scope.clubRules.inputs.addNewList = true;
  }
  $scope.cancelNewRuleList = function() {
    $scope.clubRules.inputs.addNewList = false;
  }

  $scope.thisRuleList = function(id) {
    $scope.clubRules.currentList = id;
  }

  $scope.addRuleList = function() {
    $scope.clubRules.ruleLists.push(
      {
        id:$scope.clubRules.ruleLists.length,
        name:$scope.clubRules.inputs.newList,
        classes:[]
      }
    )
    $scope.clubRules.inputs.newList = 'KRA ' + ($scope.clubRules.ruleLists.length+1);
    $scope.clubRules.inputs.addNewList = false;
  }

  $scope.addClassToRuleList = function() {
    $scope.clubRules.ruleLists[$scope.clubRules.currentList].classes.push(
      {
        id:$scope.clubRules.ruleLists[$scope.clubRules.currentList].classes.length,
        name:$scope.clubRules.inputs.newClass,
        rules:[]
      }
    );
    $scope.clubRules.currentClass = $scope.clubRules.ruleLists[$scope.clubRules.currentList].classes.length-1;
    // console.log($scope.clubRules);
  }

  $scope.thisClubRuleClass = function(id) {
    $scope.clubRules.currentClass = id;
  }

  $scope.addClubRule = function() {
    $scope.clubRules.ruleLists[$scope.clubRules.currentList].classes[$scope.clubRules.currentClass].rules.push(
      {
        rule:$scope.clubRules.inputs.newRule,
        id:$scope.clubRules.ruleLists[$scope.clubRules.currentList].classes[$scope.clubRules.currentClass].rules.length
      }
    );

    $scope.clubRules.inputs.newRule = "";
    // console.log($scope.clubRules);
  }

  $scope.removeClubRule= function(id) {

      // we have an array of objects, we want to remove one object using only the id property
    // var apps = [{id:34,name:'My App',another:'thing'},{id:37,name:'My New App',another:'things'}];

    // get index of object with id:37
    var removeIndex = $scope.clubRules.ruleLists[$scope.clubRules.currentList].classes[$scope.clubRules.currentClass].rules.map(function(item) { return item.id; }).indexOf(id);

    // remove object
    $scope.clubRules.ruleLists[$scope.clubRules.currentList].classes[$scope.clubRules.currentClass].rules.splice(removeIndex, 1);

    // console.log($scope.clubRules.ruleLists[$scope.clubRules.currentList].classes[$scope.clubRules.currentClass].rules);

    // $scope.clubRules.ruleLists[$scope.clubRules.currentList].classes[$scope.clubRules.currentClass].rules.splice(0,-1*($scope.clubRules.ruleLists[$scope.clubRules.currentList].classes[$scope.clubRules.currentClass].rules.length-id))
  }

  $scope.saveRuleLists = function() {
    var ruleLists = $scope.clubRules.ruleLists;
    var stringifiedData = JSON.stringify(ruleLists);
    // console.log(stringifiedData);
    $http.post("saveRuleLists",{data:stringifiedData})
    .then(function(data) {
      console.log('success');
    })
    .catch(function(err) {
      console.log(err);
    })

  }


  $scope.thisSchedule = function(id) {
    $scope.clubSchedules.currentSchedule = id;
    $scope.clubSchedules.currentDay = 0;
    $scope.clubSchedules.currentRound = 0;
    console.log(id);
  }
  $scope.editClubSchedules = function() {
    $scope.clubSchedules.inputs.edit = true;
  }
  $scope.cancelClubSchedulesEdit = function() {
    $scope.clubSchedules.inputs.edit = false;
  }

  $scope.newClubSchedule = function() {
    $scope.clubSchedules.inputs.addNewSchedule = true;
  }
  $scope.cancelNewSchedule = function() {
    $scope.clubSchedules.inputs.addNewSchedule = false;
  }

  $scope.addSchedule = function() {
    $scope.clubSchedules.schedules.push(
      {
        id:$scope.clubSchedules.schedules.length,
        name:$scope.clubSchedules.inputs.newSchedule,
        gatesOpen:new Date(1970,0,1,7,0,0),
        gatesClosed:new Date(1970,0,1,20,0,0),
        days:[{
          id:0,
          roundType:'Practice',
          rounds:[]
        }]
      }
    )
    $scope.clubSchedules.inputs.newSchedule = 'KRA ' + ($scope.clubSchedules.schedules.length+1);
    $scope.clubSchedules.inputs.addNewSchedule = false;
    console.log($scope.clubSchedules.schedules);
  }

  $scope.editScheduleName = function() {
    $scope.clubSchedules.inputs.editTitle = true;
    $scope.clubSchedules.inputs.newScheduleTitle = $scope.clubSchedules.schedules[$scope.clubSchedules.currentSchedule].name
  }
  $scope.cancelScheduleNameEdit = function() {
    $scope.clubSchedules.inputs.editTitle = false
  }
  $scope.applyScheduleNameEdit = function() {
    $scope.clubSchedules.inputs.editTitle = false;
    $scope.clubSchedules.schedules[$scope.clubSchedules.currentSchedule].name = $scope.clubSchedules.inputs.newScheduleTitle;
    console.log($scope.clubSchedules);
  }

  $scope.selectNewRoundType = function(t) {

    if ($scope.clubSchedules.inputs.editRound == true) {
      console.log(t);
      console.log('hit this');
      console.log($scope.clubSchedules.currentRound);
      console.log('#' + (Number($scope.clubSchedules.currentRound) + 1) + 'ScheduleRoundPlannerDiv');
      $('#' + (Number($scope.clubSchedules.currentRound) + 1) + 'ScheduleRoundPlannerDiv .scheduleRoundPlannerBtns').css('background','#E1F5FE').css('color','#154498')
      $('#' + (Number($scope.clubSchedules.currentRound) + 1) + 'ScheduleRoundPlannerDiv #scheduleRound'+t+'PlannerBtn').css('background','#154498').css('color','#E1F5FE');

    } else {

      $('.scheduleRoundPlannerBtns').css('background','#E1F5FE').css('color','#154498')
      $('#scheduleRound'+t+'PlannerBtn').css('background','#154498').css('color','#E1F5FE');

    }


    $scope.clubSchedules.inputs.newRoundType = t;

  }

  function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes*60000);
  }

  function makeTimeEditable(time) {

    var editableTime = AdjTime(time).split(':')
    if (editableTime[0].toString().length < 2) {
      editableTime[0] = "0"+editableTime[0];
    }
    if (editableTime[1].toString().length < 2) {
      editableTime[1] = "0"+editableTime[1];
    }
    if (editableTime[1].toString().length > 2) {
      editableTime[1] = editableTime[1].toString().slice(0,-1);
    }
    return editableTime;
  }

  $scope.editThisScheduleDayHeader = function() {
    $scope.clubSchedules.inputs.editHeader = true;
  }
  $scope.cancelThisScheduleDayHeaderEdit = function() {
    $scope.clubSchedules.inputs.editHeader = false;
  }
  $scope.applyScheduleDayHeader = function() {
    $scope.clubSchedules.schedules[$scope.clubSchedules.currentSchedule].days[$scope.clubSchedules.currentDay].header = $scope.clubSchedules.inputs.newDayHeader;
    $scope.clubSchedules.inputs.editHeader = false;
  }
  $scope.applyScheduleOpenClose = function() {
    console.log($scope.clubSchedules.currentSchedule);
    if ($scope.clubSchedules.schedules[$scope.clubSchedules.currentSchedule].gatesOpen) {
      $scope.clubSchedules.schedules[$scope.clubSchedules.currentSchedule].gatesOpen = new Date($scope.clubSchedules.schedules[$scope.clubSchedules.currentSchedule].gatesOpen);
    }
    if ($scope.clubSchedules.schedules[$scope.clubSchedules.currentSchedule].gatesClosed) {
      $scope.clubSchedules.schedules[$scope.clubSchedules.currentSchedule].gatesClosed = new Date($scope.clubSchedules.schedules[$scope.clubSchedules.currentSchedule].gatesClosed);
    }
  }

  $scope.editScheduleRound = function(r) {
    console.log(r);
    $scope.clubSchedules.inputs.editRound = true;
    $('.scheduleRoundDivs .scheduleRoundDivInfoDivs').css('display','flex');
    $("#" + r.id + "scheduleRoundDiv .scheduleRoundDivInfoDivs").css('display','none');
    $(".scheduleRoundPlannerDivs").css('display','none');

    var html = "<div class='scheduleRoundPlannerDivs' id='"+r.id+"ScheduleRoundPlannerDiv'><div class='scheduleRoundTypeBtnDivs' id=''><a id='scheduleRoundPracticePlannerBtn' class='scheduleRoundPlannerBtns' href='' ng-click='selectNewRoundType(" + JSON.stringify('Practice') + ")'><h3>Practice</h3></a><a id='scheduleRoundQualifyingPlannerBtn' class='scheduleRoundPlannerBtns' href='' ng-click='selectNewRoundType(" + JSON.stringify('Qualifying') + ")'><h3>Qualifying</h3></a><a id='scheduleRoundHeatsPlannerBtn' class='scheduleRoundPlannerBtns' href='' ng-click='selectNewRoundType(" + JSON.stringify('Heats') + ")'><h3>Heats</h3></a><a id='scheduleRoundPrefinalsPlannerBtn' class='scheduleRoundPlannerBtns' href='' ng-click='selectNewRoundType(" + JSON.stringify('Prefinals') + ")'><h3>Pre-Finals</h3></a><a id='scheduleRoundRacesPlannerBtn' class='scheduleRoundPlannerBtns' href='' ng-click='selectNewRoundType(" + JSON.stringify('Races') + ")'><h3>Races</h3></a></div><span><p>Round Info</p><textarea id='roundInfoTextarea' name='name' rows='8' cols='80'></textarea></span><span><p>Kid Kart</p><input type='checkbox' name=' value=' ng-model='clubSchedules.inputs.kidKart'></span>  <div ng-if='clubSchedules.inputs.kidKart' class='scheduleRoundKidKartInputs'><span ng-repeat='i in clubSchedules.inputs.kidKartInfo track by $index'><a href='>X</a>  <p>- {{i}}</p></span><span>  <p>-</p><input type='text' placeholder='Info 1' name=' value=' ng-model='clubSchedules.inputs.kidKartInfoInput'><a href=' ng-click='addKidKartInfo()'>+</a></span></div><div class='' id='scheduleRoundTimeInputs'><span><p>Round Start</p><input type='time' name='' value='' ng-model='clubSchedules.inputs.roundStart' ng-change='setRoundStart()'></span><span><p>Intervals</p><p>Amount</p><input type='number' name='' value='' ng-change='changeScheduleInterval()' ng-model='clubSchedules.inputs.interval'><span><input type='checkbox' name='' value='' ng-model='clubSchedules.inputs.intervalLap' ng-change='changeScheduleIntervalType('lap')'><p>Laps</p></span><span><input type='checkbox' name='' value='' ng-model='clubSchedules.inputs.intervalTime' ng-change='changeScheduleIntervalType('time')'><p>Minutes</p></span></span></div><div class='scheduleRoundClassesDivs'><div class='scheduleRoundClassesDisplayDivs'><div class='scheduleRoundClassesCells' id='{{g.id}}ScheduleRoundClassesCell' ng-repeat='g in clubSchedules.inputs.roundGroups'><a href='' style='width:80px' ng-click='editThisGroup(g)'>Group {{g.id}}</a><a href='' class='applyGroupEditAnchors' style='display:none;' ng-click='applyGroupEdit()'>Apply</a><a href='' ng-click='moveGroup(g,"+JSON.stringify("up")+")'>↑</a><a href='' ng-click='moveGroup(g,"+JSON.stringify("down")+")'>↓</a><div class='scheduleRoundGroupCells'><p>{{g.classes}}</p><h3 ng-if='clubSchedules.inputs.intervalTime == true'>{{g.prettyTime}}</h3><h3 ng-if='clubSchedules.inputs.intervalTime == false'>{{g.laps}} Laps</h3><p ng-if='g.notes != "+JSON.stringify("")+"'>{{g.notes}}</p></div><div class='scheduleRoundEditGroupCells'><input type='text' name='' value='{{g.classes}}'><input  ng-if='clubSchedules.inputs.intervalType == " + 'time' + "' type='time' name='' value='{{g.time}}'><input  ng-if='clubSchedules.inputs.intervalType == " + 'lap' + "' type='number' name='' value='{{g.laps}}'><input type='text' name='' value='{{g.notes}}'></div></div><div class='scheduleRoundClassesDivHeaders'><p>Class(es)</p><p>Duration/Time</p><p>Extra Notes</p></div><div class='newScheduleRoundClassesCells'><input type='text' name='' value='' placeholder='Class/Class/Class' ng-model='clubSchedules.inputs.newGroupClasses'><input type='number' ng-if='clubSchedules.inputs.intervalLap == true' name='' value='' ng-model='clubSchedules.inputs.newGroupLaps'><input type='time' ng-if='clubSchedules.inputs.intervalTime == true' name='' value='' ng-model='clubSchedules.inputs.newGroupTime'><input type='text' name='' value='' placeholder='Additional Notes' ng-model='clubSchedules.inputs.newGroupNotes'><a href='' ng-click='applyScheduleGroup()'>Apply</a></div></div></div><a href='' ng-click='addEditToSchedule()'>Apply Edit</a></div>";

    angular.element($('#'+r.id+'scheduleRoundDiv')).append($compile(html)($scope))



    $scope.clubSchedules.currentRound = r.id-1;
    $scope.clubSchedules.inputs.roundStart = new Date(r.roundStart);
    $scope.clubSchedules.inputs.roundGroups = r.groups;
    $scope.clubSchedules.inputs.newRoundType = r.roundType;

    $scope.clubSchedules.inputs.interval = r.interval;
    $scope.clubSchedules.inputs.roundGroups = [];
    $scope.clubSchedules.inputs.kidKartInfo = r.kidKartInfo;
    if (r.kidKartInfo.length > 0) {
      $scope.clubSchedules.inputs.kidKart = true;
    }

    for (var i = 0; i < r.groups.length; i++) {
      $scope.clubSchedules.inputs.roundGroups.push(r.groups[i]);
    }
    $scope.clubSchedules.inputs.newGroupTime = r.time;

    console.log(r.groups);
    console.log($scope.clubSchedules.inputs.roundGroups);
    if (r.intervalType == 'lap') {
      $scope.clubSchedules.inputs.intervalLap = true;
    } else {
      $scope.clubSchedules.inputs.intervalTime = true;

    }

    $('#' + (Number($scope.clubSchedules.currentRound) + 1) + 'ScheduleRoundPlannerDiv .scheduleRoundPlannerBtns').css('background','#E1F5FE').css('color','#154498')
    $('#' + (Number($scope.clubSchedules.currentRound) + 1) + 'ScheduleRoundPlannerDiv #scheduleRound'+r.roundType+'PlannerBtn').css('background','#154498').css('color','#E1F5FE');

  }

  $scope.editThisGroup = function(g) {

    $('#'+g.id+'ScheduleRoundClassesCell .scheduleRoundGroupCells').css('display','none');
    $('#'+g.id+'ScheduleRoundClassesCell a').css('display','none');

    $('#'+g.id+'ScheduleRoundClassesCell .scheduleRoundEditGroupCells').css('display','flex');
    $('#'+g.id+'ScheduleRoundClassesCell .applyGroupEditAnchors').css('display','flex');

  }

  $scope.moveGroup = function(g,d) {

    console.log(g);
    console.log(d);

    var changingGroups = $scope.clubSchedules.inputs.roundGroups;

    // var groupsToSwitch = [];
    //
    // var splitGroups = [[],[]];

    var groupToMove = changingGroups[g.id-1];
    var groupToSwitch = {};

    var timeToSave = '';
    var prettyTimeToSave = '';

    if (d == 'up' && g.id != 1) {

      // groupsToSwitch.push(g.id, g.id-1);
      groupToSwitch = changingGroups[g.id-2];

      changingGroups[g.id-1] = groupToSwitch;
      changingGroups[g.id-2] = groupToMove;

      timeToSave = groupToSwitch.time;
      prettyTimeToSave = groupToSwitch.time;

      changingGroups[g.id-1].time = groupToMove.time;
      changingGroups[g.id-1].prettyTime = groupToMove.prettyTime;

      changingGroups[g.id-2].time = timeToSave;
      changingGroups[g.id-2].prettyTime = makeTimePretty(prettyTimeToSave);


    } else {

      // groupsToSwitch.push(g.id, g.id+1);
      groupToSwitch = changingGroups[g.id];

      changingGroups[g.id-1] = groupToSwitch;
      changingGroups[g.id] = groupToMove;

      timeToSave = groupToSwitch.time;
      prettyTimeToSave = groupToSwitch.time;

      changingGroups[g.id-1].time = groupToMove.time;
      changingGroups[g.id-1].prettyTime = groupToMove.prettyTime;

      changingGroups[g.id].time = timeToSave;
      changingGroups[g.id].prettyTime = makeTimePretty(prettyTimeToSave);


    }

    for (var i = 0; i < changingGroups.length; i++) {

      changingGroups[i].id = i+1;

    }

    $scope.clubSchedules.inputs.roundGroups = changingGroups;

  }

  $scope.addEditToSchedule = function() {
    $('.scheduleRoundDivs .scheduleRoundDivInfoDivs').css('display','flex');
    $("#" + $scope.clubSchedules.currentRound + "scheduleRoundDiv .scheduleRoundDivInfoDivs").css('display','flex');
    $('#'+$scope.clubSchedules.currentRound+'ScheduleRoundPlannerDiv').remove();

    var round = {
      id: $scope.clubSchedules.schedules[$scope.clubSchedules.currentSchedule].days[$scope.clubSchedules.currentDay].rounds[$scope.clubSchedules.currentRound].id,
      roundType:$scope.clubSchedules.inputs.newRoundType,
      groups:$scope.clubSchedules.inputs.roundGroups,
      intervalType:'',
      interval:$scope.clubSchedules.inputs.interval,
      roundStart:new Date($scope.clubSchedules.inputs.roundStart),
      prettyRoundStart:makeTimePretty(AdjTime($scope.clubSchedules.inputs.roundStart)),
      kidKart:$scope.clubSchedules.inputs.kidKart,
      kidKartInfo:$scope.clubSchedules.inputs.kidKartInfo
    }
    if ($scope.clubSchedules.inputs.intervalLap) {
      round.intervalType = 'lap';
    } else if ($scope.clubSchedules.inputs.intervalTime) {
      round.intervalType = 'time';
    }

    // $scope.clubSchedules.inputs.newGroupClasses = round.groups[0].classes;
    var newGroups = [];
    if (round.roundType == 'Practice') {
      $scope.clubSchedules.inputs.roundStart = $scope.clubSchedules.inputs.newGroupTime;
      for (var i = 0; i < round.groups.length; i++) {
        // var multItt;
        // if (i == 0) {
        //   multItt = 0;
        // } else {
        //
        // }
        if ($scope.clubSchedules.inputs.newGroupTime) {

          var editableTime = makeTimeEditable($scope.clubSchedules.inputs.newGroupTime);

          if (i > 0) {
            editableTime = makeTimeEditable(addMinutes($scope.clubSchedules.inputs.newGroupTime,($scope.clubSchedules.inputs.interval)))
            editableTime = editableTime[0]+':'+editableTime[1]
          } else {
            editableTime = editableTime[0]+':'+editableTime[1]
          }

        }


        newGroups.push({
          id:newGroups.length+1,
          classes:round.groups[i].classes,
          time:editableTime,
          prettyTime:$scope.clubSchedules.inputs.newGroupTime,
          notes:$scope.clubSchedules.inputs.newGroupNotes
        })
        if ($scope.clubSchedules.inputs.newGroupTime) {

          $scope.clubSchedules.inputs.newGroupTime = addMinutes($scope.clubSchedules.inputs.newGroupTime,$scope.clubSchedules.inputs.interval);

        }
      }
      $scope.clubSchedules.inputs.roundGroups = newGroups;
    } else if(round.roundType == 'Qualifying') {
      for (var i = 0; i < round.groups.length; i++) {
        newGroups.push({
          id:newGroups.length+1,
          classes:round.groups[i].classes,
          laps:round.interval,
          notes:$scope.clubSchedules.inputs.newGroupNotes
        })
      }
      $scope.selectNewRoundType('Races');
      $scope.clubSchedules.inputs.intervalLap = true;
      $scope.clubSchedules.inputs.intervalTime = false;

      $scope.clubSchedules.inputs.roundGroups = newGroups;
    }

    $scope.clubSchedules.schedules[$scope.clubSchedules.currentSchedule].days[$scope.clubSchedules.currentDay].rounds[$scope.clubSchedules.currentRound] = round;

    console.log($scope.clubSchedules.schedules);
    // $scope.clubSchedules.currentRound ++;
  }

  $scope.applyScheduleGroup = function() {
    var editableTime = makeTimeEditable($scope.clubSchedules.inputs.newGroupTime)
    var group = {
      id:  $scope.clubSchedules.inputs.roundGroups.length+1,
      classes:$scope.clubSchedules.inputs.newGroupClasses,
      prettyTime:makeTimePretty(AdjTime($scope.clubSchedules.inputs.newGroupTime)),
      laps:$scope.clubSchedules.inputs.newGroupLaps+1,
      time:editableTime[0] + ':' + editableTime[1],
      notes:$scope.clubSchedules.inputs.newGroupNotes
    }
    // console.log(group.time);
    $scope.clubSchedules.inputs.roundGroups.push(group);


    if ($scope.clubSchedules.inputs.intervalTime) {
      $scope.clubSchedules.inputs.newGroupTime = addMinutes($scope.clubSchedules.inputs.newGroupTime,$scope.clubSchedules.inputs.interval)
    } else {

    }

    // console.log($scope.clubSchedules);

  }

  $scope.newScheduleRound = function() {
    $scope.clubSchedules.inputs.addingRound = true;

  }
  $scope.cancelAddingRound = function() {
    $scope.clubSchedules.inputs.addingRound = false;
  }

  $scope.changeScheduleIntervalType = function(t) {
    if (t == 'lap') {
      $scope.clubSchedules.inputs.intervalTime = false;
    }
    if (t == 'time') {
      $scope.clubSchedules.inputs.intervalLap = false;
    }
  }

  $scope.addKidKartInfo = function() {
    $scope.clubSchedules.inputs.kidKartInfo.push($scope.clubSchedules.inputs.kidKartInfoInput);
    console.log($scope.clubSchedules.inputs.kidKartInfoInput);
    $scope.clubSchedules.inputs.kidKartInfoInput = '';

  }

  $scope.changeScheduleInterval = function() {
    var round = {
      id: $scope.clubSchedules.schedules[$scope.clubSchedules.currentSchedule].days[$scope.clubSchedules.currentDay].rounds[$scope.clubSchedules.currentRound].id,
      roundType:$scope.clubSchedules.inputs.newRoundType,
      groups:$scope.clubSchedules.inputs.roundGroups,
      intervalType:'',
      interval:$scope.clubSchedules.inputs.interval
    }
    if ($scope.clubSchedules.inputs.intervalLap) {
      round.intervalType = 'lap';
    } else if ($scope.clubSchedules.inputs.intervalTime) {
      round.intervalType = 'time';
    }

    // $scope.clubSchedules.inputs.newGroupClasses = round.groups[0].classes;
    var newRound = [];
    var editableTime;
    var newTime = new Date($scope.clubSchedules.inputs.roundStart)
    for (var i = 0; i < round.groups.length; i++) {
      if (round.intervalType == 'time') {

        if (i > 0) {
          newTime = addMinutes(newTime,($scope.clubSchedules.inputs.interval));
          editableTime = makeTimeEditable(newTime);
          editableTime = editableTime[0]+':'+editableTime[1]
        } else {
          editableTime = makeTimeEditable(newTime);
          editableTime = editableTime[0]+':'+editableTime[1]
        }
        // console.log(editableTime);

        newRound.push({
          id:newRound.length+1,
          classes:round.groups[i].classes,
          time:editableTime,
          prettyTime:makeTimePretty(editableTime),
          notes:$scope.clubSchedules.inputs.newGroupNotes
        })
        if (i == round.groups.length-1) {
          $scope.clubSchedules.inputs.newGroupTime = addMinutes(newTime,$scope.clubSchedules.inputs.interval)

        }

      }
      if (round.intervalType == 'lap') {

        newRound.push({
          id:newRound.length+1,
          classes:round.groups[i].classes,
          laps:$scope.clubSchedules.inputs.interval,
          // time:editableTime,
          // prettyTime:makeTimePretty(editableTime),
          notes:$scope.clubSchedules.inputs.newGroupNotes
        })

        if (i == round.groups.length-1) {
          $scope.clubSchedules.inputs.newGroupLaps = $scope.clubSchedules.inputs.interval;
        }
        // $scope.clubSchedules.inputs.roundGroups = $scope.clubSchedules.inputs.roundGroups.map(function(g) {
        //   g.laps = $scope.clubSchedules.inputs.interval;
        //   console.log(g.laps);
        //   return g;
        // })

      }
      // var multItt;
      // if (i == 0) {
      //   multItt = 0;
      // } else {
      //
      // }
    }
    round.groups = newRound;
    // $scope.clubSchedules.schedules[$scope.clubSchedules.currentSchedule].days[$scope.clubSchedules.currentDay].rounds[$scope.clubSchedules.currentRound] = round;
    $scope.clubSchedules.inputs.roundGroups = newRound;

    // console.log($scope.clubSchedules);

  }

  $scope.setRoundStart = function() {
    $scope.changeScheduleInterval();
  }

  $scope.addRoundToSchedule = function() {

    var round = {
      id: $scope.clubSchedules.schedules[$scope.clubSchedules.currentSchedule].days[$scope.clubSchedules.currentDay].rounds.length+1,
      roundType:$scope.clubSchedules.inputs.newRoundType,
      groups:$scope.clubSchedules.inputs.roundGroups,
      intervalType:'',
      interval:$scope.clubSchedules.inputs.interval,
      roundStart:$scope.clubSchedules.inputs.roundStart,
      prettyRoundStart:makeTimePretty(AdjTime($scope.clubSchedules.inputs.roundStart)),
      kidKartInfo:$scope.clubSchedules.inputs.kidKartInfo,
      kidKart:$scope.clubSchedules.inputs.kidKart,
      roundInfo:$scope.clubSchedules.inputs.roundInfo
    }
    console.log(round.kidKart);
    if ($scope.clubSchedules.inputs.intervalLap) {
      round.intervalType = 'lap';
    } else if ($scope.clubSchedules.inputs.intervalTime) {
      round.intervalType = 'time';
    }

    // $scope.clubSchedules.inputs.newGroupClasses = round.groups[0].classes;
    var newGroups = [];
    if (round.roundType == 'Practice') {
      $scope.clubSchedules.inputs.roundStart = $scope.clubSchedules.inputs.newGroupTime;
      for (var i = 0; i < round.groups.length; i++) {
        // var multItt;
        // if (i == 0) {
        //   multItt = 0;
        // } else {
        //
        // }
        var editableTime = makeTimeEditable($scope.clubSchedules.inputs.newGroupTime);

        if (i > 0) {
          editableTime = makeTimeEditable(addMinutes($scope.clubSchedules.inputs.newGroupTime,($scope.clubSchedules.inputs.interval)))
          editableTime = editableTime[0]+':'+editableTime[1]
        } else {
          editableTime = editableTime[0]+':'+editableTime[1]
        }

        newGroups.push({
          id:newGroups.length+1,
          classes:round.groups[i].classes,
          time:editableTime,
          prettyTime:makeTimePretty(AdjTime($scope.clubSchedules.inputs.newGroupTime)),
          notes:$scope.clubSchedules.inputs.newGroupNotes
        })
        $scope.clubSchedules.inputs.newGroupTime = addMinutes($scope.clubSchedules.inputs.newGroupTime,$scope.clubSchedules.inputs.interval);
      }
      $scope.clubSchedules.inputs.roundGroups = newGroups;
    } else if(round.roundType == 'Qualifying') {
      for (var i = 0; i < round.groups.length; i++) {
        newGroups.push({
          id:newGroups.length+1,
          classes:round.groups[i].classes,
          laps:round.interval,
          notes:$scope.clubSchedules.inputs.newGroupNotes
        })
      }
      $scope.selectNewRoundType('Races');
      $scope.clubSchedules.inputs.intervalLap = true;
      $scope.clubSchedules.inputs.intervalTime = false;

      $scope.clubSchedules.inputs.roundGroups = newGroups;
    }

    $scope.clubSchedules.schedules[$scope.clubSchedules.currentSchedule].days[$scope.clubSchedules.currentDay].rounds.push(round);
    $scope.clubSchedules.inputs.kidKartInfo = [];
    $scope.clubSchedules.inputs.kidKart = false;
    $scope.clubSchedules.inputs.roundInfo = '';
    $scope.clubSchedules.currentRound ++;
  }

  $scope.addDayToSchedule = function() {
    $scope.clubSchedules.schedules[$scope.clubSchedules.currentSchedule].days.push(
      {
        id:$scope.clubSchedules.schedules[$scope.clubSchedules.currentSchedule].days.length+1,
        rounds:[]
      }
    )
  }

  $scope.saveSchedule = function() {
    $scope.applyScheduleOpenClose();
    $http.post('saveSchedules',{schedules:$scope.clubSchedules.schedules})
    .then(function(res) {
      // console.log(res.data);
      console.log(res.data);
    })
    .catch(function(err) {
      console.log(err);
    })
  }


  $scope.addRule = function() {
    $scope.newClass.otherRules.push($scope.newOtherRule);
  }




  $scope.addNewAccount = function() {

    // console.log($scope.newAccount)

    // $http.get('getUsers')
    // .then(function(res) {
    //   var people = res.data;
      var pass = true;
    //   console.log(people);

      for(var i = 0;i < $scope.people.length;i++) {
        if ($scope.people[i].email === $scope.newAccount.email) {
          pass = false;
          $('#emailErrorMessage').css('display','flex')
        }
      }
      if ($scope.newAccount.checkPassword !== $scope.newAccount.password) {
        pass = false;
        $('#passwordErrorMessage').css('display','flex')
      }

      if (pass === true) {

        // console.log(true);

        $http.post('signUp', {auth:$scope.newAccount})
        .then(function(res) {
          // console.log(res.data);

          $http.get('getMembers')
          .then(function(data) {
            $scope.people = data.data;
            $scope.peopleToShow = data.data;
            // console.log(data);
          })
          .catch(function(err) {
            console.log(err);
          })
          // sessionStorage.setItem('user',JSON.stringify(res.data));
          //
          // $scope.user = res.data;
          // console.log($scope.user);
          // $('.loginDisplays').css('display','none');
          // $('#accCreatedDisplay').css('display','flex');
          // $('#signInUpHeaderInfoCell').css('display','none')
          // $('#userHeaderInfoCell').css('display','flex')
          // window.location.href = '#!/welcomePage';
        })

      }

    // })

  }

  $scope.filterAccounts = function() {

    $scope.peopleToShow = [];
    if ($scope.searchAccounts.membersOnly == true) {
      for (var i = 0; i < $scope.people.length; i++) {
        if ($scope.people[i].membership != null) {
          $scope.peopleToShow.push($scope.people[i]);
        }
      }

    } else {
      $scope.peopleToShow = $scope.people;
    }
  }

  $scope.removeAllGroups = function() {
    $http.post('removeAllGroups')
    .then(function(data) {
      // console.log(data);
    } )
    .catch(function(err) {
      console.log(err);
    })
    $http.post('removeAllEvents')
    .then(function(data) {
      // console.log(data);
    } )
    .catch(function(err) {
      console.log(err);
    })
  }

  $scope.selectNewsType = function(t) {

    $scope.news.type = t;

    $('#newsControllerTypeNav a').css('background','white');
    $('#newsControllerTypeNav a').css('color','#154498');

    $('#'+t+'NewsTypeAnc').css('background','#154498');
    $('#'+t+'NewsTypeAnc').css('color','#E1F5FE');

    if (t == 'normal') {
      $('.newsInputSpans').css('display','none');
      $('#newsWarningSpan p').css('display','none');
      $('#newsNormalInputSpan').css('display','flex');


    } else if(t == 'delay') {
      $('.newsInputSpans').css('display','none');
      $('#newsDelayInputSpan').css('display','flex');
      $('#newsWarningSpan p').css('display','flex');
      $('#newsNormalInputSpan').css('display','none');

    } else if(t == 'postpone') {
      $('.newsInputSpans').css('display','none');
      $('#newsPostponeInputSpan').css('display','flex');
      $('#newsWarningSpan p').css('display','flex');
      $('#newsNormalInputSpan').css('display','none');

    } else {
      $('.newsInputSpans').css('display','none');
      $('#newsWarningSpan p').css('display','flex');
      $('#newsNormalInputSpan').css('display','none');

    }
  }

  $scope.selectNewsSeries = function(s) {
    // console.log(s);
    // $('#newsEventSelectNav').css('display','flex');
    // $('#newsEventSelectNav').css('border-bottom','#154498');
    $scope.news.selectedEvent = {};
    // console.log($scope.selectedSeries.color);
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
      // console.log($scope.events);
      for (var i = 0; i < $scope.events.length; i++) {
        if (s.id == $scope.events[i].event_group_id) {
          s.events.push($scope.events[i]);
        }
        if (i == $scope.events.length-1) {
          $scope.news.selectedSeries = s;
          // console.log($scope.news.selectedSeries);
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
    // console.log($scope.news.selectedEvent);
  }

  $scope.changeNewsEvent = function(e) {
    // console.log($scope.news.selectedEvent.e);
    // console.log(JSON.parse($scope.news.selectedEvent));
    // $scope.news.selectedEvent.info = $scope.news.selectedEvent;
    // $scope.news.selectedEvent.display_date = JSON.parse($scope.news.selectedEvent).display_date;

  }
  $scope.saveNews = function() {

    function AdjTime(t) {
      if (t.getUTCHours()-5 < 0) {
        n = 24-(5-t.getUTCHours());
        if (t.getUTCMinutes() < 10) {
          return n+':'+'0'+t.getUTCMinutes()+'0';

        } else {

          return n+':'+t.getUTCMinutes()+'0';
        }
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
    // console.log($scope.news);
    if ($scope.news.type == 'delay' || $scope.news.type == 'postpone') {
      // console.log('HIT HERE');
      if ($scope.news.selectedEvent.display_date.slice(9).length > 2) {
        // console.log("HIT HERE 3");
        // console.log('Multiple days');
        f = $scope.news.selectedEvent.display_date.slice(12);
        t = $scope.news.selectedEvent.display_date.slice(9,-3);
        // console.log(f-t);
        // console.log(($scope.news.selectedEvent.display_date.slice(12) - $scope.news.selectedEvent.display_date.slice(9)));
        e = $scope.news.selectedEvent;
        // console.log($scope.news.selectedEvent.date);
        $scope.news.postUntil = $scope.news.selectedEvent.date;
        // console.log($scope.news.postUntil);

        body.eventLength = (f-t)+1;
        // console.log(body.eventLength);
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
            // start: e.start,
            // end: e.end,

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
            // console.log(event.date);
          }

            // console.log(makeTimePretty(AdjTime(c.startTime)));
          if ($scope.news.type == 'delay') {
            event.start = $scope.news.delayedUntil;
            if (AdjTime(c.info.startTime).slice(0,-3)<12) {
              event.display_start = AdjTime($scope.news.delayedUntil) + 'am'
            } else {
              event.display_start = (AdjTime($scope.news.delayedUntil).slice(0,-3) - 12) + (AdjTime($scope.news.delayedUntil).slice(2)) + 'pm'
            }
            if (AdjTime(c.info.endTime).slice(0,-3)<12) {
              e.display_end = AdjTime(c.info.endTime) + 'am'
            } else {
              e.display_end = (AdjTime(c.info.endTime).slice(0,-3) - 12) + (AdjTime(c.info.endTime).slice(2)) + 'pm'
            }
            event.display_end = e.display_end;

          } else {
            event.display_start = e.display_start;
            event.display_end = e.display_end;
          }
            eventInfo.display_start = makeTimePretty(AdjTime(c.startTime));
            eventInfo.display_end = makeTimePretty(AdjTime(c.endTime));

          evs.push(event);
        }

      } else {
        // console.log('HIT HERE 1');
        // f = $scope.news.selectedEvent.display_date.slice(12);
        // t = $scope.news.selectedEvent.display_date.slice(9,-3);
        // console.log(f-t);
        // console.log(($scope.news.selectedEvent.display_date.slice(12) - $scope.news.selectedEvent.display_date.slice(9)));
        e = $scope.news.selectedEvent;
        $scope.news.postUntil = $scope.news.selectedEvent.date;
        // console.log($scope.news.postUntil);

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
          // start: e.start,
          // end: e.end,
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
      // console.log(body);
      $http.post('editEvent',body)
      .then(function(res) {
        // console.log(res);
      })
      .catch(function(err) {
        console.log(err);
      })
    }
    if ($scope.news.type == 'normal') {
      e = $scope.news.selectedEvent;
      if ($scope.news.postRemains == true) {
        $scope.news.postUntil = true;
      } else if($scope.news.selectedEvent) {
        $scope.news.postUntil = $scope.news.selectedEvent.date;

      }
      // console.log($scope.news.postUntil);

      // body.eventLength = 1;
      //
      // if(e) {
      //
      // }
      // if (typeof(e.date) != 'string') {
      //   e.date = e.date.toISOString();
      // }
      //
      // var m = Number(e.date.slice(5,-17));
      // var d = e.date.slice(8,-14);
      // var y = e.date.slice(0,-20);
      // var nd = Number(d) + i;
      // var event = {
      //   id:e.id,
      //   name: e.name,
      //   date: m + '/' + nd + '/' + y,
      //   color: e.color,
      //   start: e.start,
      //   end: e.end,
      //   event_key: e.event_key,
      //   event_group_id:e.event_group_id,
      //   image: e.image
      // }

    }
    $http.post('saveNews',{news:$scope.news})
    .then(function(res) {
      console.log(res);
    })
    .catch(function(err) {
      console.log(err);
    })
  }

  $scope.dropdown = function() {
    $('#seriesName').css('display','flex');
  }

  $scope.selectPointsClass = function(cl) {
    $scope.selectedPointsClass = cl;
  }

  // var data = [
  //  ['Foo', 'programmer'],
  //  ['Bar', 'bus driver'],
  //  ['Moo', 'Reindeer Hunter']
  // ];

  $scope.competitors = [];

  $scope.download_csv = function() {
    // console.log($scope.competitors);
    for (var k = 0; k < $scope.registrations.entry_lists.length; k++) {
      var event = $scope.registrations.entry_lists[k];
      if (event.original.event_id !== null) {

        // console.log(event);
        for (var i = 0; i < event.entries.classes.length; i++) {
          var clList = event.entries.classes[i]
          // console.log(clList);
          var csv = 'No,Class,FirstName,LastName,CarRegistration,DriverRegistration,Transponder1,Transponder2,Additional1,Additional2,Additional3,Additional4,Additional5,Additional6,Additional7,Additional8\n';
          for (var j = 0; j < clList.list.length; j++) {
            var driver = clList.list[j];
            row = driver.number + ',' + clList.name + ',' + driver.name.split(' ')[0] + ',' + driver.name.split(' ')[1] + ',"","",' + driver.transponder + ',"","","","","","","","",""\n';
            // console.log(row);
            csv += row;
            // console.log(csv);
            // csv += "\n";
            // console.log(csv);

            if (j == clList.list.length-1) {
              var hiddenElement = document.createElement('a');
              hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
              hiddenElement.target = '_blank';
              hiddenElement.download = clList.name+'.csv';
              hiddenElement.click();
            }

          }



        }

      }
    }

  }

  $scope.selectRegistration = function(list, index) {
    // console.log(list);
    // console.log(index);
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

    var oneDayPassCount = 0,
        twoDayPassCount = 0,
        threeDayPassCount = 0;

    var passes = [];

    console.log('HIT');

    for (var i = 0; i < $scope.selectedRegistration.entries.passes.length; i++) {
      var pass = {
        oneDay:0,
        twoDay:0,
        threeDay:0,
        member:{}
      }
      for (var k = 0; k < $scope.selectedRegistration.entries.passes[i].order.length; k++) {
        if ($scope.selectedRegistration.entries.passes[i].order[k].name == "One Day") {
          pass.oneDay = $scope.selectedRegistration.entries.passes[i].order[k].amnt_ordered;
        }
        if ($scope.selectedRegistration.entries.passes[i].order[k].name == "Two Day") {
          pass.twoDay = $scope.selectedRegistration.entries.passes[i].order[k].amnt_ordered;
        }
        if ($scope.selectedRegistration.entries.passes[i].order[k].name == "Three Day") {
          pass.threeDay = $scope.selectedRegistration.entries.passes[i].order[k].amnt_ordered;
        }
      }
      console.log($scope.people);
      for (var j = 0; j < $scope.people.length; j++) {

        console.log($scope.people[j].id,$scope.selectedRegistration.entries.passes[i].member_id-1);
        if ($scope.people[j].id == $scope.selectedRegistration.entries.passes[i].member_id-1) {
          console.log('match');
          pass.member = $scope.people[j].membership.members[0];
          j = $scope.people.length;
        }
      }

      passes.push(pass);

    }
    $scope.selectedRegistrationPasses = passes;
    console.log(passes);
    // console.log($scope.selectedRegistrationMembers);
  }

  $scope.selectRegistrationList = function(list,index) {

    console.log('HIT');
    $('.registryClassCell').css('background','white');
    $('.registryClassCell h1').css('color','#154498');
    // console.log(index);

    $('#'+index+'registryClassCell').css('background','#154498');
    $('#'+index+'registryClassCell h1').css('color','#E1F5FE');
    // $('#'+index+'registryClassCell ').css('color','#154498');

    // console.log(list);
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
            console.log(row[j]);
            if (j === 0) {
              classObject.name = row[j].split(',')[0];
              // console.log(classObject.name);
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
              if (driver.name == "" || driver.name == "Position = Point Value") {

                i++
                classes.push(classObject)
                if (i >= fileUpload.files.length-1) {
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
    // console.log(s);
    // $('#seriesName').css('display','none');
    if (s == 'closed') {
      $scope.selectedSeries = 'closed'
      $scope.controller.info = {};
      $scope.selectedPhoto = {};
      $scope.eventPreviews = [];
      $scope.edit.events = 'add';
      $scope.controller.info.color = 'lightpink';
      $('.eventGroupCell').css('border','none');
      $('#closedEventGroupCell').css('border-bottom','2px solid #154498');
      $('#seriesAdminEventsControlPanel').css('display','none');

    } else if (s == 'open') {
      $scope.selectedSeries = 'open'
      $scope.controller.info = {};
      $scope.selectedPhoto = {};
      $scope.eventPreviews = [];
      $scope.edit.events = 'add';
      $scope.controller.info.color = 'lightgreen';
      $('.eventGroupCell').css('border','none');
      $('#openEventGroupCell').css('border-bottom','2px solid #154498');
      $('#seriesAdminEventsControlPanel').css('display','none');

    } else if (s == 'new') {
      $scope.selectedSeries = 'new'
      $scope.controller.info = {};
      $scope.selectedPhoto = {};
      $scope.eventPreviews = [];
      $scope.edit.events = 'add';
      $('.eventGroupCell').css('border','none');
      $('#newEventGroupCell').css('border-bottom','2px solid #154498');
      $('#seriesAdminEventsControlPanel').css('display','flex');

    } else {
      // console.log();
      $scope.selectedSeries = s;
      $('.eventGroupCell').css('border','none');
      $('#' + s.name + 'EventGroupCell').css('border-bottom','2px solid #154498');
      $('#seriesAdminEventsControlPanel').css('display','flex');

      $scope.controller.info.name = s.name;
      $scope.controller.info.color = s.color;
      $scope.controller.info.description = s.description;
      $scope.eventPreviews = [];
      $scope.edit.events = 'view';
      $http.post('getEventRegistration', {seriesId:s.id})
      .then(function(res) {
        $scope.registry.series_id = s.id;
        if (res.data != "") {

          // console.log(res.data);
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

    // console.log($scope.selectedEvent);

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
        if (t.getUTCMinutes() < 10) {
          return n+':'+'0'+t.getUTCMinutes()+'0';

        } else {

          return n+':'+t.getUTCMinutes()+'0';
        }
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
        // console.log(res.data);
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
      // console.log(thisEvent);
      if ($scope.controller.daysLength == 1) {
        thisEvent.event_key = null;
      } else {
        thisEvent.event_key = eventKey;
      }
      info.events.push(thisEvent);
      console.log(info.events);
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
    // console.log(reg);
    $http.post('saveEventRegistry', reg)
    .then(function(res) {
      // console.log(res.data);

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
      // console.log(res.data);
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
    // console.log(e);
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
      console.log(t);
      if (t.getUTCHours()-5 < 0) {
        n = 24-(5-t.getUTCHours());
        if (t.getUTCMinutes() < 10) {
          return n+':'+'0'+t.getUTCMinutes()+'0';

        } else {

          return n+':'+t.getUTCMinutes()+'0';
        }
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
        // start: AdjTime(c.info.startTime),
        // end: AdjTime(c.info.endTime),
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
      // eventInfo.display_start = null;
    } else {
      // console.log(makeTimePretty(AdjTime(c.startTime)));
      // if (AdjTime(c.info.startTime).slice(0,-3)<12) {
      //   eventInfo.display_start = AdjTime(c.info.startTime) + 'am'
      // } else {
      //   eventInfo.display_start = (AdjTime(c.info.startTime).slice(0,-3) - 12) + (AdjTime(c.info.startTime).slice(2)) + 'pm'
      // }
      // if (AdjTime(c.info.endTime).slice(0,-3)<12) {
      //   eventInfo.display_end = AdjTime(c.info.endTime) + 'am'
      // } else {
      //   eventInfo.display_end = (AdjTime(c.info.endTime).slice(0,-3) - 12) + (AdjTime(c.info.endTime).slice(2)) + 'pm'
      // }
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

            // console.log($scope.eventPreviews);
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

      // console.log($scope.controller.toAdd);

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
        console.log("HIT");
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
          // console.log($scope.eventPreviews);
        })
        .catch(function(err) {
          console.log(err);
        })
        // console.log(res)
      })
      .catch(function(err) {
        console.log(err);
      })
      addEntryLists();

    }



  }

  $scope.deleteEvent = function(e) {

    // console.log("HIIITTTTTT");

    // console.log(e);

    var days = 1;

    if (e.display_date.slice('-').length == 2) {

      var fd = Number(e.display_date.slice(9,-3));
      var ld = Number(e.display_date.slice(12));

      days = ld-fd+1;

    }


    // console.log(e.display_date);

    toDelete = [];

    for (var i = 0; i < days; i++) {
      var ed =  {
        id: e.id+i
      };
      toDelete.push(ed);
      // console.log(toDelete);
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
            // console.log($scope.eventPreviews);
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
          // console.log(res.data);
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
    $('.adminDisplayBtns').css('background','#154498');
    $('.adminDisplayBtns').css('color','#E1F5FE');


    $('#admin'+d+'DisplayBtn').css('background','#E1F5FE');
    $('#admin'+d+'DisplayBtn').css('color','#154498');

    $('#admin'+d+'Control').css('display','flex');

    if (d == 'Registrations' && $scope.selectedRegistration == null) {

      var list = $scope.registrations.entry_lists[0];
      // console.log(list);
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
