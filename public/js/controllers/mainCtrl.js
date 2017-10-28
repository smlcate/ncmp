app.controller('mainCtrl', ['$scope', '$http', function($scope, $http) {

  //Global $scope variables
  $scope.events = [];
  $scope.eventsAfterToday = [];
  $scope.sponsors = [];
  $scope.miniCells = [];

  function init() {
    $http.get('getData')
    .then(function(data) {
      console.log(data);
      $scope.events = data.data;
    })
    .catch(function(err) {
      console.log(err);
    })
  }

  init();

  // Will pull from sponsors list
  function pullSponsors() {
    for (var i = 0; i < 10; i++) {
      console.log(i);
      var s = {
        img: '../images/topkartlogo.png',
        url: 'www.topkartusa.com'
      }
      $scope.sponsors.push(s);
    }

  }
  pullSponsors();




}]);
