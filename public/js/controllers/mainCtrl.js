app.controller('mainCtrl', ['$scope', '$http', function($scope, $http) {

  $scope.events = [];

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

  


}]);
