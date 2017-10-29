app.controller('mainCtrl', ['$scope', '$http', function($scope, $http) {

  //Global $scope variables
  $scope.events = [];
  $scope.announcements;
  $scope.sponsors = [];
  $scope.miniCells = [];
  $scope.announcements;

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

    for (var i = 0; i < $scope.events.length; i++) {

      if ($scope.events[i].date.slice(5,-17) > month) {

        stack.push($scope.events[i])

      } else if ($scope.events[i].date.slice(5,-17) == month) {

        if ($scope.events[i].date.slice(8,-14) >= day) {

          stack.push($scope.events[i])

        }

      }

    }

    function sortByDate(arr) {

      console.log(arr)

      var toComp = [] //takes 2 elements to be compared
      var repeat = false;
      for (var i = 0; i < arr.length; i++) {
        if (i === arr.length - 1) {
          if (repeat == true) {
            i = 0;
            repeat = false;
          } else {
            return stack;
          }
        } else if (arr[i].date.slice(5,-17) > arr[i+1].date.slice(5,-17)) {
          toComp.push(arr[i],arr[i+1]);
          stack[i] = toComp[1]
          stack[i+1] = toComp[0]
          toComp = [];
          repeat = true;
        } else if(arr[i].date.slice(5,-17) === arr[i+1].date.slice(5,-17)) {
          toComp.push(arr[i],arr[i+1]);
          if (toComp[0].date.slice(8,-14) > toComp[1].date.slice(8,-14)) {
            stack[i] = toComp[1]
            stack[i+1] = toComp[0]
            repeat = true;
          }
          toComp = [];
        }
      }

    }

    var sortedStack = sortByDate(stack);

    var eventKeys = [];

    var newStack = [];

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

    console.log(announcements);

    $scope.announcements = announcements;

  }





}]);
