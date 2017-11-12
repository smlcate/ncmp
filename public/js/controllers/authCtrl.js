app.controller('authCtrl',  ['$scope', '$http', function($scope, $http) {

  $scope.signUp = function() {

    console.log($scope.auth)

    $http.post('signUp', {auth:$scope.auth})
    .then(function(res) {
      console.log(res.data);
    })

  }

}])
