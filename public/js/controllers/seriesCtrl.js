app.controller('seriesCtrl', ['$scope', '$http', function($scope, $http) {


  function buildPage() {
    $('#seriesPointsContainer').css('display','none');
    $('#seriesScheduleContainer').css('display','none');
  }
  buildPage();

  $scope.selectSeriesInfo = function(option) {

    if (option === 'news') {
      $('#seriesNewsContainer').css('display','flex');
      $('#seriesPointsContainer').css('display','none');
      $('#seriesScheduleContainer').css('display','none');
    } else if (option === 'points') {
      $('#seriesNewsContainer').css('display','none');
      $('#seriesPointsContainer').css('display','flex');
      $('#seriesScheduleContainer').css('display','none');
    } else if (option === 'schedule') {
      $('#seriesNewsContainer').css('display','none');
      $('#seriesPointsContainer').css('display','none');
      $('#seriesScheduleContainer').css('display','flex');
    }

  }

}]);
