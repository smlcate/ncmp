app.controller('mainCtrl', ['$scope', '$http', function($scope, $http) {

  var monthNames =  ['January','February','March','April','May','June','July','August','September','October','November','December'];

  var monthDays = [31,28,31,30,31,30,31,31,30,31,30,31];

  var daysOfWeek = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];


  //Global $scope variables
  $scope.events = [];
  $scope.announcements;
  $scope.sponsors = [];
  $scope.miniCells = [];
  $scope.selectedBit;
  $scope.todaysEvent;

  $scope.date = new Date();
  $scope.headerInfo = {}

  $scope.weather;
  $scope.tenDayForecast;

  $('.headerNavAnc').on('click', function() {
      $('.headerNavAnc').css({'background':'#E1F5FE','color':'#154498'});
    $(this).css({'background':'#154498','color':'white'});
    console.log('hit');
  })

  function init() {
    $http.get('getData')
    .then(function(data) {
      // console.log(data);
      $scope.events = data.data;
      giveAnnouncements();
    })
    .catch(function(err) {
      console.log(err);
    })

    function makeDatePretty(d) {

      var month = monthNames[d.getMonth()];
      var date = d.getDate();
      var day = daysOfWeek[d.getDay()];

      console.log(day + ', ' + month + ' ' + date)

      return day + ', ' + month + ' ' + date;

    }
    console.log($scope.date);
    $scope.headerInfo.displayDate = makeDatePretty($scope.date);

  }

  init();



  // Will pull from sponsors list
  function pullSponsors() {
    for (var i = 0; i < 10; i++) {
      // console.log(i);
      var s = {
        img: '../images/topkartlogo.png',
        url: 'www.topkartusa.com'
      }
      $scope.sponsors.push(s);
    }

  }
  pullSponsors();

  function giveAnnouncements() {

    var date = new Date();

    var day = date.getDate();
    var month = date.getMonth() + 1

    var announcements = {
      news: [],
      events: []
    };

    $http.get('getNews')
    .then(function(res) {
      announcements.news = res.data;
    })

    var stack = []; //contains a stack with the upcoming events

    console.log($scope.events);

    for (var i = 0; i < $scope.events.length; i++) {

      if ($scope.events[i].date.slice(5,-17) > month) {

        stack.push($scope.events[i])

      } else if ($scope.events[i].date.slice(5,-17) == month) {

        if ($scope.events[i].date.slice(8,-14) >= day) {

          if ($scope.events[i].date.slice(8,-14) == day) {
            $scope.todaysEvent = $scope.events[i]
            $scope.selectedBit = $scope.events[i];
          } else {

            stack.push($scope.events[i])

          }

        }

      }

    }

    function sortByDate(arr) {

      console.log(arr);

      var stack = [];

      var toComp = [] //takes 2 elements to be compared
      var repeat = false;
      for (var i = 0; i < arr.length; i++) {

        toComp = [arr[i],arr[i+1]];
        console.log(typeof(arr[i].date));
        console.log(toComp)
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
          stack[i] = toComp[1]
          stack[i+1] = toComp[0]
          toComp = [];
          repeat = true;
          // i=0;
        } else if(toComp[1].date.slice(5,-17) === toComp[0].date.slice(5,-17)) {
          // toComp.push(stack[i],stack[i+1]);
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

    }

    console.log(stack);

    var sortedStack = sortByDate(stack);

    console.log(sortedStack);
    var eventKeys = [];

    var newStack = [];

    if (sortedStack) {

      for (var i = 0; i < sortedStack.length; i++) {
        if (sortedStack[i].event_key) {
          if (eventKeys.length > 0) {
            var keep = true;
            for (var j = 0; j < eventKeys.length; j++) {
              if (eventKeys[j] == sortedStack[i].event_key) {
                keep = false;
                j = eventKeys.length;
              }
            }
          } else {
            eventKeys.push(sortedStack[i].event_key);
            newStack.push(sortedStack[i]);
          }
          // eventKeys.push(sortedStack[i].event_key)
        } else {
          newStack.push(sortedStack[i]);
        }
      }

      if (newStack.length > 10) {
        newStack = newStack.slice(0,newStack.length - 10)
        announcements.events = newStack;
      } else {
        announcements.events = newStack;
      }

      console.log(announcements.events)

      function makeDatePretty(d) {

        var month = monthNames[d.slice(5,-17)-1];
        var date = d.slice(8,-14);
        var day = daysOfWeek[new Date(d).getDay()];

        return day + ', ' + month + ' ' + date;

      }



      for (var i = 0; i < announcements.events.length; i++) {

        announcements.events[i].displayDate = makeDatePretty(announcements.events[i].date);

      }

      var i = 0;
      function pairImage(e, r) {

        i++;

        $http.post('getImage', {id:e.image})
        .then(function(res) {

          if (r === 'single') {
            $scope.todaysEvent.imageUrl = res.data[0].dataURL;
            return;
          }

          if(res.data.length > 0) {

            announcements.events[i-1].imageUrl = res.data[0].dataURL;

          }

          if (i < announcements.events.length) {

            pairImage(announcements.events[i])

          }
        })

      }



      pairImage(announcements.events[i], 'repeat');


      console.log(announcements);

      $scope.announcements = announcements;

      if ($scope.todaysEvent === undefined) {
        if (date.getDay() != 1) {
          $scope.todaysEvent = {
            name:'Open Practice',
            color:'lightgreen'
          }
        } else {
          $scope.todaysEvent = {
            name:'Track Closed',
            color:'lightpink'
          }
        }
      }


      if ($scope.todaysEvent.date) {

        $scope.todaysEvent.displayDate = makeDatePretty($scope.todaysEvent.date);
        pairImage($scope.todaysEvent, 'single')

      } else {
        $scope.selectedBit = announcements.events[0]
      }
    }



    // var groupIds = [];
    //
    // var groups = [];
    //
    // for (var i = 0; i < announcements.events.length; i++) {
    //
    //   var push = true;
    //
    //   for (var j = 0; j < groupIds.length; j++) {
    //     if (groupIds[j] === announcements.events[i].event_group_id) {
    //       push = false;
    //     }
    //   }
    //   if (push) {
    //     console.log(i)
    //     // console.log(announcements.events[i].event_group_id)
    //     groupIds.push(announcements.events[i].event_group_id)
    //     $http.post('getEventGroups', {id:announcements.events[i].event_group_id})
    //     .then(function(res) {
    //       console.log(res);
    //     })
    //     .catch(function(err) {
    //       console.log(err);
    //     })
    //   }

    // }



  }

  $scope.thisBit = function(b) {
    console.log(b);
    $scope.selectedBit = b;

  }

  $http.get('https://api.wunderground.com/api/7c8eaaf84b5e5dd0/conditions/q/IN/New_Castle.json')
  .then(function(res) {

    var weather = res.data.current_observation;
    var url = weather.icon_url.slice(4);

    weather.icon_url = "https" + url;

    $scope.weather = weather;

    console.log($scope.weather);

  })
  $http.get('https://api.wunderground.com/api/7c8eaaf84b5e5dd0/forecast10day/q/IN/New_Castle.json')
  .then(function(res) {

    $scope.tenDayForecast = res.data.forecast.simpleforecast.forecastday;

  })

}]);
