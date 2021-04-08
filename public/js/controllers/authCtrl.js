app.controller('authCtrl',  ['$scope', '$http','$window', function($scope, $http, $window) {

  $scope.signIn = {
    error:''
  }

  $scope.signUp = function() {

    console.log($scope.auth.signUp)

    $http.get('getUsers')
    .then(function(res) {
      var emails = res.data;
      var pass = true;
      console.log(emails);
      for(var i = 0;i < emails.length;i++) {
        if (emails[i].email === $scope.auth.signUp.email) {
          pass = false;
          $('#emailErrorMessage').css('display','flex')
        }
      }
      if ($scope.auth.signUp.checkPassword !== $scope.auth.signUp.password) {
        pass = false;
        $('#passwordErrorMessage').css('display','flex')
      }

      if (pass === true) {

        $http.post('signUp', {auth:$scope.auth.signUp})
        .then(function(res) {
          console.log(res.data);

          sessionStorage.setItem('user',JSON.stringify(res.data));

          $scope.user = res.data;
          console.log($scope.user);
          // $('.loginDisplays').css('display','none');
          // $('#accCreatedDisplay').css('display','flex');
          $('#signInUpHeaderInfoCell').css('display','none')
          $('#userHeaderInfoCell').css('display','flex')
          window.location.href = '#!/welcomePage';
          $window.location.reload();

        })

      }

    })

  }
  $scope.signIn = function() {

    console.log($scope.auth.signIn)


    $http.post('signIn', {auth:$scope.auth.signIn})
    .then(function(res) {
      console.log(res.data);
      if (res.data.success == false) {

        $scope.signIn.error = res.data.message;

      } else {

        $scope.signIn.error = '';

        sessionStorage.setItem('user',JSON.stringify(res.data));
        $('#userHeaderInfoCell').css('display','flex')
        $scope.user = res.data;
        console.log($scope.user);

        $('#signInUpHeaderInfoCell').css('display','none')

        window.location.href = '#!/home';
        $window.location.reload();


      }

    })

  }





}])
