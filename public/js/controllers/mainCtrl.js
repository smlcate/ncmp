app.controller('mainCtrl', ['$scope', '$http', function($scope, $http) {

  function init() {
    $http.get('getData')
    .then(function(data) {
      console.log(data);
    })
    .catch(function(err) {
      console.log(err);
    })
  }

  init();

}]);
