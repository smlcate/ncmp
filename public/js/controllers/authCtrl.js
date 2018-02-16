app.controller('authCtrl',  ['$scope', '$http', function($scope, $http) {

  $scope.signUp = function() {

    console.log($scope.auth.signUp)
    

    $http.post('signUp', {auth:$scope.auth.signUp})
    .then(function(res) {
      console.log(res.data);
      sessionStorage.setItem('user',JSON.stringify(res.data));
      $('.loginDisplays').css('display','none');
      $('#accCreatedDisplay').css('display','flex');
    })

  }
  $scope.signIn = function() {

    console.log($scope.auth.signIn)
    

    $http.post('signIn', {auth:$scope.auth.signIn})
    .then(function(res) {
      console.log(res.data);
      sessionStorage.setItem('user',JSON.stringify(res.data));
    })

  }
  
  $scope.goTo = function(v) {
    $('.loginDisplays').css('display','none');
    $('#'+v).css('display','flex');
  }

}])
