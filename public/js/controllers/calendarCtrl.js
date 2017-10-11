app.controller('calendarCtrl', ['$scope', '$http', function($scope, $http) {

  var monthNames =  ['January','February','March','April','May','June','July','August','September','October','November','December'];

  var monthDays = [31,28,31,30,31,30,31,31,30,31,30,31];

  var daysOfWeek = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  var date = new Date();


  $scope.date = {
    month: date.getMonth(),
    month_text: monthNames[date.getMonth()],
    date: date.getDate(),
    day: date.getDay()+1,
    year: date.getFullYear()
  }

  $scope.selectedMonth = $scope.date.month;
  $scope.selectedYear = $scope.date.year;
  $scope.selectedDate = $scope.date.date;
  $scope.selectedDay = $scope.date.day;
  $scope.selectedMonth_text = monthNames[$scope.selectedMonth];

  function buildCalendar() {

    var curMonthDays = monthDays[$scope.selectedMonth];
    var prevMonthDays;

    if ($scope.selectedMonth === 0) {
      prevMonthDays = monthDays[12];
    } else {
      prevMonthDays = monthDays[$scope.selectedMonth-1];
    }

    var monthStartDay;
    var firstN;

    var activeMonth = false;

    monthStartDay = new Date(monthNames[$scope.selectedMonth] + " 1," + $scope.selectedYear).getDay();

    if (monthStartDay == 0) {
      firstN = 1;
      activeMonth = true;
    } else if(monthStartDay == 1) {
      firstN = prevMonthDays;
    } else {
      firstN = prevMonthDays - (monthStartDay-1);
    }


    var month_events = [];

    var calendarDay = firstN;

    var dayOfWeek = 0;

    for (var i = 0; i < 35; i++) {

      var events = [];

      if ($scope.selectedMonth < 10) {

        var thisDate = $scope.selectedYear + '-0' + ($scope.selectedMonth + 1) + '-' + calendarDay + 'T04:00:00.000Z';

      } else {

        var thisDate = $scope.selectedYear + '-' + ($scope.selectedMonth + 1) + '-' + calendarDay + 'T04:00:00.000Z';

      }

      var cellBody = {
        date: calendarDay,
        day: dayOfWeek,
        month: $scope.selectedMonth+1,
        curMonth: false,
        events: []
      }

      if(dayOfWeek == 1) {
        // dayOfWeek = 1;
        cellBody.events.push(
          {
            name:'Track Closed',
            color: 'lightpink'
          }
        )
      } else if (dayOfWeek === 6) {
        dayOfWeek = -1;
        cellBody.events.push(
          {
            name:'Open Practice',
            color: 'lightgreen'
          }
        )
      } else {
        cellBody.events.push(
          {
            name:'Open Practice',
            color: 'lightgreen'
          }
        )
      }

      dayOfWeek ++;


      if (calendarDay == prevMonthDays && i < 6) {

        month_events.push(cellBody);

        activeMonth = true;

        calendarDay = 1;

      } else if(calendarDay === curMonthDays && i > 6) {

        cellBody.date = calendarDay;
        cellBody.day = dayOfWeek;
        cellBody.curMonth = true;

        month_events.push(cellBody)

        activeMonth = false;

        calendarDay = 1;


      } else if(calendarDay < curMonthDays && i > 6 && activeMonth === false) {

        cellBody.date = calendarDay;
        cellBody.day = dayOfWeek;
        cellBody.curMonth = false;

        calendarDay ++;

        month_events.push(cellBody);

      } else {

        cellBody.date = calendarDay;
        cellBody.day = dayOfWeek;
        cellBody.curMonth = activeMonth;

        calendarDay ++;


        month_events.push(cellBody);
      }

    }

    $scope.month_events = month_events;

    for (var i = 0; i < $scope.events.length; i++) {

      console.log(i)

      var date = $scope.events[i].date.slice(5,-17);
      var dateNumber = $scope.events[i].date.slice(8,-14);

      if (date[0] === 0) {
        date.slice(1)
      }
      if (date[0] === 0) {
        dateNumber.slice(1)
        console.log(dateNumber);
      }

      if ($scope.selectedMonth === date - 1) {

        month_events[dateNumber -1 + (monthStartDay)].events.push($scope.events[i]);
        month_events[dateNumber -1 + (monthStartDay)].events[0] = null;

      }

    }

    console.log($scope.month_events)

  }

  buildCalendar()

}]);
