app.controller('adminCtrl',  ['$scope', '$http', function($scope, $http) {

  $scope.photos = [];
  // $scope.photoPreviews = [];
  $scope.groupEvents = [];

  $scope.sendInput = function() {

    var files = $('#input')[0].files;

    // console.log(file);

    var reader = new FileReader();

    var urls = [];

    var i = 0;

    function readUrl(file) {

      reader.onload = function(){

        // take dataURL and push onto preview
        var dataURL = reader.result;


        // console.log(dataURL);

        // urls.push(dataURL);



        $http.post('uploadImage', {data:dataURL})
        .then(function(res) {
          console.log(res.data);
        })
        .catch(function(err) {
          console.log(err);
        })

        if (urls.length < files.length) {
          i++;
          readUrl(files[i])
        }

      };

      reader.readAsDataURL(file);

    }

    readUrl(files[i])

    console.log(reader);

  }

  $scope.thisPhoto = function(p) {
    console.log(p);
  }

  $scope.changeAdminDisplay = function(d) {
    $('.adminControlGroups').css('display','none');
    $('#admin'+d+'Control').css('display','flex');
  }

  $http.get('getAllEventGroups')
  .then(function(res) {
    $scope.eventGroups = res.data;
  })
  .catch(function(err) {
    console.log(err);
  })

  $http.get('getImages')
  .then(function(res) {

    for (var i = 0; i < res.data.length; i++) {

      var photo = res.data[i];

      photo.dataURL = res.data[i].dataURL;

      $scope.photos.push(photo);

    }
  })


}])
