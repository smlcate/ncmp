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
  $scope.prevMonth_text = monthNames[$scope.selectedMonth-1];
  $scope.nextMonth_text = monthNames[$scope.selectedMonth+1];

  $('.calendarViews').css('display','none');
  $('#calendarExpandedView').css('display','flex');

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
        backgroundColor: '',
        events: []
      }

      if (cellBody.date === $scope.date.date && cellBody.month === $scope.date.month+1) {

        console.log('GOOTTTAAA BEEEEEE')

        cellBody.backgroundColor = 'lightgreen';

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
        cellBody.backgroundColor = 'lightgrey';

        month_events.push(cellBody)

        activeMonth = false;

        calendarDay = 1;


      } else if(calendarDay < curMonthDays && i > 6 && activeMonth === false) {

        cellBody.date = calendarDay;
        cellBody.day = dayOfWeek;
        cellBody.curMonth = false;
        cellBody.backgroundColor = 'lightgrey';

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

  function getEvents() {

    $http.get('getData')
    .then(function(res) {
      $scope.events = res.data;

      console.log(res.data)

      var today = new Date();

      var current = {
        year: today.getYear()+1900,
        day: today.getDate(),
        month: today.getMonth()+1
      }

      var eventful = false;

      for (var i = 0; i < res.data.length; i++) {

        var date = res.data[i].date.slice(0,-14);
        var time = res.data[i].date.slice(11,-1);

        var y = Number(date.slice(0,-6));
        var d = Number(date.slice(8))
        var m = Number(date.slice(5,-3))

        var e = res.data[i]

        if (e.start_time) {

          var sn1 = Number(e.start_time.slice(0,-6));

          var ss = e.start_time.slice(2);

          sn1 = sn1 - 5;

          var ns = sn1 + ss;

          var en1 = Number(e.end_time.slice(0,-6));

          var es = e.end_time.slice(2);

          if (Number(e.end_time.slice(0,-6)) >= 0 && Number(e.end_time.slice(0,-6)) <= 4) {

            en1 = 24 + en1 - 5

          } else {

            en1 = en1 - 5;

          }

          var ne = en1 + es;

          e.start_time = ns;
          e.end_time = ne;

        }


        if (y == current.year && d == current.day && m == current.month) {

          eventful = true;

          $scope.currentDaysEvents.push(e);

        }

        if (y == current.year && m >= current.month) {

          if (m > current.month) {

            $scope.eventsAfterToday.push(e);

          } else if(d >= current.day) {

            $scope.eventsAfterToday.push(e);

          }
        } else if (y > current.year) {

          $scope.eventsAfterToday.push(e);

        }

      }

      // if (eventful === false && $scope.currentDaysEvents.length === 0) {
      //   if (today.getDay() === 1) {
      //     $scope.currentDaysEvents.push({
      //       name: 'Track Closed',
      //       color: 'lightpink',
      //       rentalKarts: false,
      //       start_time: '10:00:00',
      //       end_time: '19:00:00'
      //     })
      //   } else {
      //     $scope.currentDaysEvents.push({
      //       name: 'Open Practice',
      //       color: 'lightgreen',
      //       rentalKarts: true,
      //       start_time: '10:00:00',
      //       end_time: '19:00:00'
      //     })
      //   }
      // }

      buildCalendar();

    })
  }

  function buildMiniCalendar() {

    var d = new Date();



    // console.log(d)

    var date = {
      month: 0,
      day: 0,
      year: d.getYear()-100+2000
    }

    for (var i = 0; i < 12; i++) {

      var monthStartDay = new Date(monthNames[date.month] + " 1," + date.year).getDay();
      // console.log(monthStartDay);

      date.month++;

      var cell = {
        month: i,
        month_name: monthNames[i],
        mcells: []
      }

      var precount = 0;

      for (var j = 0; j < 35; j++) {

        if (date.day === 35) {
          date.day = 0;
        }

        date.day++;

        var day = j - precount + 1;
        var month = i + 1;

        if (JSON.stringify(day).length === 1) {
          day = '0'+ day.toString();
        }
        if (i.length === 1) {
          month = '0'+ month.toString();
        }

        var mcell = {
          color: 'white',
          date: 'null'
        }

        if (day >= 1) {

          mcell.date = date.year + '-' + month + '-' + day

        }

        if (j%7 === 1) {
          mcell.color = 'lightpink';
        }

        if (day > monthDays[i]) {
          mcell.date = null;
        }

        if (j < monthStartDay || j > monthDays[i] + precount-1) {
          mcell.color = 'lightgrey';
          mcell.date = null;
        }
        if (j < monthStartDay) {
          precount ++;
        }

        for (var k = 0; k < $scope.events.length; k++) {
          // console.log(mcell.date)
          // console.log($scope.events[k].date.slice(0,-14))
          if (mcell.date === $scope.events[k].date.slice(0,-14)) {
            mcell.color = $scope.events[k].color
          }
        }

        // console.log(mcell);

        cell.mcells.push(mcell)

      }

      $scope.miniCells.push(cell)

      // console.log(cell);

    }

  }

  buildMiniCalendar();

  $scope.changeCalendarView = function(v) {

    console.log(v)

    $('.calendarViews').css('display','none');
    $('#calendar'+v+'View').css('display','flex');

  }

  $scope.nextMonth = function() {

    if ($scope.selectedMonth == 11) {

      $scope.selectedMonth = 0;
      $scope.selectedYear ++;

      $scope.prevMonth_text = monthNames[11];
      $scope.nextMonth_text = monthNames[1];


    } else {

      $scope.selectedMonth ++;

      $scope.prevMonth_text = monthNames[$scope.selectedMonth-1];
      $scope.nextMonth_text = monthNames[$scope.selectedMonth+1];


    }

    $scope.selectedMonth_text = monthNames[$scope.selectedMonth];

    getEvents();

  }

  $scope.prevMonth = function() {

    if ($scope.selectedMonth == 0) {

      $scope.selectedMonth = 11;
      $scope.selectedYear --;

      $scope.prevMonth_text = monthNames[10];
      $scope.nextMonth_text = monthNames[0];


    } else {

      $scope.selectedMonth --;

      $scope.prevMonth_text = monthNames[$scope.selectedMonth-1];
      $scope.nextMonth_text = monthNames[$scope.selectedMonth+1];

    }

    $scope.selectedMonth_text = monthNames[$scope.selectedMonth];
    getEvents();

  }


}]);
