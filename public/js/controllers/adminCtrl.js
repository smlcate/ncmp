app.controller('adminCtrl',  ['$scope', '$http', function($scope, $http) {

  var monthNames =  ['January','February','March','April','May','June','July','August','September','October','November','December'];

  var monthDays = [31,28,31,30,31,30,31,31,30,31,30,31];

  var daysOfWeek = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];



  $scope.photos = [];
  // $scope.photoPreviews = [];
  $scope.eventGroups = [];

  $scope.selectedSeries = {
    name:"New"
  };

  function build() {
    $('.adminControlGroups').css('display','none');
    $('#adminEventsControl').css('display', 'flex');
  }
  build()

  function sortByDate(arr) {

    console.log(arr)

    var stack = arr;

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

    return stack;

  }
  var sortedStack = sortByDate($scope.events);

  function makeDatePretty(d) {

    var month = monthNames[d.slice(5,-17)-1];
    var date = d.slice(8,-14);
    var day = daysOfWeek[new Date(d).getDay()];

    return day + ', ' + month + ' ' + date;

  }

  for (var i = 0; i < sortedStack.length; i++) {
    sortedStack[i].displayDate = makeDatePretty(sortedStack[i].date)
  }

  console.log(sortedStack);

  $scope.dropdown = function() {
    $('#seriesName').css('display','flex');
  }
  $scope.selectSeries = function(s) {

    $('#seriesName').css('display','none');
    if (s == 'new') {
      $scope.selectedSeries = {
        name:"New"
      }
    } else {
      $scope.selectedSeries = s;
    }
  }

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
