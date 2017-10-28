app.controller('adminCtrl',  ['$scope', '$http', function($scope, $http) {

  $scope.photos = [];

  $scope.sendInput = function() {

    var file = $('#input')[0].files[0];

    // console.log(file);

    var reader = new FileReader();

    reader.onload = function(){

      // take dataURL and push onto preview
      var dataURL = reader.result;
      var output = document.getElementById('output'); //select preview location
      output.src = dataURL;

      console.log(dataURL);

      $http.post('uploadImage', {data:dataURL})
      .then(function(res) {
        console.log(res.data);
      })

    };
    reader.readAsDataURL(file);


    console.log(reader);

  }

  $scope.changeAdminDisplay = function(d) {
    $('.adminControlGroups').css('display','none');
    $('#admin'+d+'Control').css('display','flex');
  }

  $http.get('getImages')
  .then(function(res) {
    for (var i = 0; i < res.data.length; i++) {
      var photo = {
        dataURL: res.data[i].dataURL
      }
      $scope.photos.push(photo);
    }
  })


}])
