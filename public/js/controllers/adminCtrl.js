app.controller('adminCtrl',  ['$scope', '$http', function($scope, $http) {

  var monthNames =  ['January','February','March','April','May','June','July','August','September','October','November','December'];

  var monthDays = [31,28,31,30,31,30,31,31,30,31,30,31];

  var daysOfWeek = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];



  $scope.photos = [];
  // $scope.photoPreviews = [];
  $scope.eventGroups = [];

  $scope.eventPreviews = [];

  $scope.adminEvents = [];


  $scope.selectedSeries = 'new';

  $('.eventGroupCell').css('border','none');
  $('#newEventGroupCell').css('border-bottom','2px solid #154498');

  function build(g) {
    $('.adminControlGroups').css('display','none');
    $('#admin' + g + 'Control').css('display', 'flex');
    $('#adminEventsImageSelectPanelCell').css('display','none');
  }
  build()

  function sortByDate(arr) {

    var stack = arr;

    // console.log(arr);

    var toComp = [] //takes 2 elements to be compared
    var repeat = false;
    for (var i = 0; i < arr.length; i++) {

      toComp = [arr[i],arr[i+1]];
      console.log('loop #' + i);
      console.log(toComp)
      if (i === arr.length - 1) {
        if (repeat == true) {
          i = -1;
          repeat = false;
        } else {
          // console.log('hit');
          return stack;
        }
      } else if (toComp[1].date.slice(5,-17) < toComp[0].date.slice(5,-17)) {
        // toComp.push(arr[i],arr[i+1]);
        stack[i] = toComp[1]
        stack[i+1] = toComp[0]
        toComp = [];
        repeat = true;
        // i=0;
      } else if(toComp[1].date.slice(5,-17) === toComp[0].date.slice(5,-17)) {
        // toComp.push(arr[i],arr[i+1]);
        if (toComp[1].date.slice(8,-14) < toComp[0].date.slice(8,-14)) {
          stack[i] = toComp[1]
          stack[i+1] = toComp[0]
          repeat = true;
          // i=0;
        }
        toComp = [];
      }



    // return stack;
    }

  }
  function lookAtKeys(arr) {
    var eventKeys = [];

    var newStack = [];

    for (var i = 0; i < arr.length; i++) {
      // console.log('hit')
      if (arr[i].event_key) {
        // console.log('hit2');
        if (eventKeys.length > 0) {
          // console.log('hit3');
          var keep = true;
          for (var j = 0; j < eventKeys.length; j++) {
            // console.log('hit4');
            if (eventKeys[j] == arr[i].event_key) {
              // console.log('hit5');
              keep = false;
              j = eventKeys.length;
            } else if(eventKeys[j] != arr[i].event_key && j+1 == eventKeys.length) {
              eventKeys.push(arr[i].event_key);
              newStack.push(arr[i]);
            }
          }
        } else {
          // console.log('hit6');
          eventKeys.push(arr[i].event_key);
          newStack.push(arr[i]);
        }
        // eventKeys.push(arr[i].event_key)
      } else {
        // console.log('hit7');
        newStack.push(arr[i]);
      }
    }

    return newStack;

  }
  function makeDatePretty(d) {

    var month = monthNames[d.slice(5,-17)-1];
    var date = d.slice(8,-14);
    var day = daysOfWeek[new Date(d).getDay()];

    return day + ', ' + month + ' ' + date;

  }
  function buildEvents(arr) {

    comparedStack = lookAtKeys(arr);
    console.log(comparedStack);
    var sortedStack = sortByDate(comparedStack);
    console.log(sortedStack)
    for (var i = 0; i < sortedStack.length; i++) {
      if (sortedStack[i].display_date) {

      } else {

        sortedStack[i].display_date = makeDatePretty(sortedStack[i].date)

      }
    }
    $scope.events = sortedStack;
  }
  if ($scope.events.length > 0) {

    buildEvents($scope.events);

  }

  $scope.dropdown = function() {
    $('#seriesName').css('display','flex');
  }
  $scope.selectSeries = function(s) {

    // $('#seriesName').css('display','none');
    if (s == 'new') {
      $scope.selectedSeries = 'new'
      $('.eventGroupCell').css('border','none');
      $('#newEventGroupCell').css('border-bottom','2px solid #154498');

    } else {
      $scope.selectedSeries = s;
      $('.eventGroupCell').css('border','none');
      $('#' + s.name + 'EventGroupCell').css('border-bottom','2px solid #154498');

    }
  }

  $scope.addDate = function(c) {

    var eventKey = Math.floor((Math.random() * 100)) + c.info.name[1] + c.info.name[0];

    function AdjTime(t) {
      if (t.getUTCHours()-5 < 0) {
        n = 24-(5-t.getUTCHours());
        return n+':'+t.getUTCMinutes()+'0';
      } else  {
        return t.getUTCHours()-5+':'+t.getUTCMinutes()+'0';
      }
    }

    var eventInfo = {
      name: c.info.name,
      date: c.info.date,
      displayDate: '',
      color: c.info.color,
      description: c.info.description,
      events: [],
    }
    for (var i = 0; i < c.daysLength; i++) {
      var m = eventInfo.date.getUTCMonth()+1;
      var d = eventInfo.date.getUTCDate();
      var y = eventInfo.date.getUTCFullYear();
      var nd = Number(d + i);
      var event = {
        date: m + '/' + nd + '/' + y,
        color: eventInfo.color,
        start: AdjTime(c.startTime),
        end: AdjTime(c.endTime),
        event_key: eventKey,
        image: eventInfo.image
      }
      eventInfo.events.push(event);
    }
    var d = eventInfo.date.toDateString()

    var day = d.slice(0,-12),
        month = d.slice(4,-8),
        date = d.slice(8,-5),
        edate = Number(d.slice(8,-5))+c.daysLength-1

    eventInfo.displayDate = day + ' ' + month + ', ' + date;

    if (c.daysLength > 1) {
      eventInfo.displayDate = day + ' ' + month + ', ' + date + '-' + edate;
    }


    $scope.eventPreviews.push(eventInfo)


  }
  $scope.submitEvents = function() {

    if ($scope.selectedSeries === 'new') {
      $http.post('addEventGroup', $scope.eventPreviews)
      .then(function(res) {
        var groupId = res.data[0].id;
        for (var i = 0; i < $scope.eventPreviews.length; i++) {
          for (var j = 0; j < $scope.eventPreviews[i].events.length; j++) {
            $scope.eventPreviews[i].events[j].event_group_id = groupId;
            $scope.eventPreviews[i].events[j].description = $scope.eventPreviews[i].description;
            $scope.eventPreviews[i].events[j].name = $scope.eventPreviews[i].name;
            $scope.eventPreviews[i].events[j].display_date = $scope.eventPreviews[i].displayDate;
            // console.log($scope.eventPreviews[i].events[j].date);
          }

          $scope.eventPreviews[i].event_group_id = groupId;
          if (i+1 === $scope.eventPreviews.length) {

            $http.post('addEvents', $scope.eventPreviews)
            .then(function(res) {
              // console.log(res);
            })
            .catch(function(err) {
              console.log(err);
            })

          }
        }
      })
      .catch(function(err) {
        console.log(err);
      })
    }



  }

  $scope.openPhotoSelect = function() {
    $('#adminEventsImageSelectPanelCell').css('display','flex');
  }
  $scope.selectPreviewImg = function(p) {
    $scope.selectedPhoto = p;
    $scope.controller.image = p.id;
    $('#adminEventsImageSelectPanelCell').css('display','none');
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
          // console.log(res.data);
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

    // console.log(reader);

  }



  $scope.thisPhoto = function(p) {
    // console.log(p);
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
