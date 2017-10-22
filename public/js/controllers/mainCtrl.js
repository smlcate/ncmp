app.controller('mainCtrl', ['$scope', '$http', function($scope, $http) {

  $scope.events = [];
  $scope.sponsors = [];

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

  function pullSponsors() {
    for (var i = 0; i < 10; i++) {
      var s = {
        img: '../images/topkartlogo.png',
        url: 'www.topkartusa.com'
      }
      $scope.sponsors.push(s);
    }

  }


}]);
