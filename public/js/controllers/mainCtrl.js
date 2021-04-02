app.controller('mainCtrl', ['$scope', '$http', '$window', '$compile', function($scope, $http, $window, $compile) {

  var monthNames =  ['January','February','March','April','May','June','July','August','September','October','November','December'];

  var monthDays = [31,28,31,30,31,30,31,31,30,31,30,31];

  var daysOfWeek = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];


  // Global $scope variables
  $scope.events = [];
  $scope.announcements;
  $scope.sponsors = [];
  $scope.miniCells = [];
  $scope.selectedBit;
  $scope.todaysEvent;

  $scope.date = new Date();
  $scope.headerInfo = {}

  $scope.weather;
  $scope.tenDayForecast;

  $scope.registrationForm;

  $scope.currentPoints;
  $scope.selectedPointsClass;
  $scope.classInfo;

  // console.log(sessionStorage);
  $scope.user;

  if (sessionStorage.user == "null") {
    // console.log('hit');
  } else if($scope.user == null && sessionStorage.user != null) {
    // console.log(sessionStorage.user);
    $scope.user = JSON.parse(sessionStorage.user);
    $('#signInUpHeaderInfoCell').css('display','none')
    $('#userHeaderInfoCell').css('display','flex')
  } else if ($scope.user == null && sessionStorage.user == null) {
    // console.log(sessionStorage.user);
    // $scope.user = JSON.parse(sessionStorage.user);
    $('#signInUpHeaderInfoCell').css('display','none')
    $('#userHeaderInfoCell').css('display','flex')
  }
  // console.log($scope.user);

  $('.headerNavAnc').on('click', function() {
      $('.headerNavAnc').css({'background':'#E1F5FE','color':'#154498'});
    $(this).css({'background':'#154498','color':'white'});
    // console.log('hit');
  })

  $scope.goTo = function(v) {

    $('.loginDisplays').css('display','none');
    $('#'+v).css('display','flex');
    window.location.href = '#!/login'
  }

  $scope.signOut = function() {

    sessionStorage.user = null;
    $scope.user = null;
    // console.log(sessionStorage);
    $('#signInUpHeaderInfoCell').css('display','flex')
    $('#userHeaderInfoCell').css('display','none')

  }


  function init() {
    $http.get('getData')
    .then(function(data) {
      // console.log(data);
      $scope.events = data.data;
      // console.log($scope.events);

      giveAnnouncements();
      getPoints();
      // runBanner($scope.announcements.banner);
      // $scope.announcements.banner[1] = $scope.announcements.news;
      // $scope.announcements.banner[2] = $scope.currentPoints
      // console.log($scope.announcements);
    })
    .then(function() {
    })
    .catch(function(err) {
      // console.log(err);
    })



    function makeDatePretty(d) {

      var month = monthNames[d.getMonth()];
      var date = d.getDate();
      var day = daysOfWeek[d.getDay()];

      // console.log(day + ', ' + month + ' ' + date)

      return day + ', ' + month + ' ' + date;

    }
    // console.log($scope.date);
    $scope.headerInfo.displayDate = makeDatePretty($scope.date);

  }

  init();

  function runBanner(b) {
    // console.log($scope.announcements.length);
    var html = '';
    var i = 0;
    function run() {

      // console.log(b.length);
      // console.log(i);
      var cell = b[i];
      // console.log(cell);
      if (i == 0) {
        html = '<div class="bannerDivs" id="eventsBannerDiv"><p>Upcoming Events</p>'
        for (var j = 0; j < 4; j++) {
          if (cell[j]) {
            // console.log(j);
            html += '<div class="bannerEventCells"><p>'+cell[j].display_date+' '+cell[j].name+'</p>'
            if (cell.openReg == true) {
              html += '<a href="" ng-click="goToRegistration('+cell[j]+')">Register</a>'
            }
            html += '</div>'
          }
        }
        html += '</div>'
        angular.element($('#headerNewsPrompter')).append($compile(html)($scope))
        setTimeout(function() {
          $('.bannerDivs').animate({
            marginLeft: '-=100vw'
          }, 2000);
          i++;
          return run();
        },5000)

      } else if(i == 1) {
        html = '<div class="bannerDivs" id="newsBannerDiv"><p>Recent News</p>';
        // console.log(cell);
        for (var j = 0; j < cell.length; j++) {
          // console.log(j);
          html += '<div class="bannerNewsCells"><p>'+cell[j].title+'</p>'
          if (cell.article != '') {
            html += '<a href="" ng-click="">Read More</a>'
          }
          html += '</div>'
        }
        html += '</div>'
        angular.element($('#headerNewsPrompter')).append($compile(html)($scope))
        setTimeout(function() {
          $('.bannerDivs').animate({
            marginLeft: '-=100vw'
          }, 2000);
          $('#welcomeBannerDiv').remove();
          i++;
          return run();
        },5000)
      } else {
        // $('#eventsBannerDiv').remove();
        var j = 0;
        // var k = 0;
        html = '<div class="bannerDivs" id="pointsBannerDiv"><p>KRA Points</p><div class="pointsBannerContainers" id="pointsBannerContainer"></div></div>'
        // console.log(html);
        angular.element($('#headerNewsPrompter')).append($compile(html)($scope))



        function runPoints() {
          // console.log(j);
          cl = cell[j];
          sub_html = '<div class="bannerPointsClassCells" id="bannerPointsClassCell'+j+'"><h3>'+cl.name+'</h3>';
          sub_html += '<p>1st '+cl.drivers[0].name+' - '+cl.drivers[0].results[14].position+'pts.</p>';
          sub_html += '<p>2nd '+cl.drivers[1].name+' - '+cl.drivers[1].results[14].position+'pts.</p>';
          sub_html += '<p>3rd '+cl.drivers[2].name+' - '+cl.drivers[2].results[14].position+'pts.</p></div>';
          // console.log(sub_html);
          // setTimeout(function() {
            if (j == 0) {
              angular.element($('#pointsBannerContainer')).append($compile(sub_html)($scope));
              setTimeout(function() {
                // console.log('hit 1');
                $('.bannerDivs').animate({
                  marginLeft: '-=100vw'
                }, 3000);
                $('#eventsBannerDiv').remove();
                j++;
                return runPoints();

              },5000)
            } if(j == 1) {
              // console.log('hit 2');
              angular.element($('#pointsBannerContainer')).append($compile(sub_html)($scope));
              setTimeout(function() {
                var margin = $('#pointsBannerContainer').css('width')
                // console.log(margin);
                $('.bannerPointsClassCells').animate({
                  marginLeft: '-=100vw'
                }, 6000);
                $('#newsBannerDiv').remove();
                j++;
                return runPoints();
              },5000)
            } else if(j == cell.length-1) {
              // $('.bannerPointsClassCells').animate({
              //   marginLeft: '-=100vw'
              // }, 2000);
              // $('#bannerPointsClassCell'+(j-2)).remove();
              // j++;
              // run()
            } else if( j >= 2) {
              // console.log('hit ' + (j+1));
              angular.element($('#pointsBannerContainer')).append($compile(sub_html)($scope));
              setTimeout(function() {
                var margin = $('#pointsBannerContainer').css('width')

                $('.bannerPointsClassCells').animate({
                  marginLeft: '-=100vw'
                }, 6000);
                $('#bannerPointsClassCell'+(j-2)).remove();
                j++;
                return runPoints();

              }, 5000)
            }

          // },5000)

          // console.log(cl);
        }
        return runPoints();
      }
    }
    return run()
    console.log(html);
  }

  function fillClassInfo() {

      var classes = [
        {
          name: '125cc Shifter',
          weight: ['ICC/Modified Moto 415 lbs, Stock Moto 390 lbs. Both engines will compete head to head with a weight break for the Stock Moto engine.'],
          tires: 'Bridgestone YLM or YLC 450/710x5',
          notes: 'Air Boxes Mandatory. Ages 15 and up.  ICC - SKUSA Engine Rules.   Stock Moto - SKUSA Engine Rules for S3 Class, and RS Intake Boot Legal Modified Bottom Ends Can Be Ran with Stock Cylinder, Head, Piston and Ignition Box',
          rules:['']
        },
        {
          name: 'Yamaha Junior Sportsman (Class #1 and #2, Runs Twice)',
          weight: ['240 lbs'],
          tires: 'YLC 450x5',
          notes: 'Air Boxes Mandatory. Ages 8-12. All Drivers Must Use an SFI Approved Ribvest.'
        },
        {
          name: 'Junior Novice Sportsman and Junior Novice',
          weight: ['Sportsman 250 lbs, Junior 305 lbs'],
          tires: 'Sportsman YLC: 450x5,   Junior YLC: 450x5 front, 600x5 rear, 710x5 rear (710x5 only after race #5)',
          notes: 'Sportsman: Yamaha KT100 WA55 Carb Comer K80 can also be used at 235 lbs 8-12 Years Old SFI Approved Ribvest Mandatory.  Junior Novice: Yamaha KT100 WB3A Carb 12-15 Years Old SFI Approved Ribvest Recommended. (These classes are for less experienced kids and kids that need time to adjust to a racing environment. They are participation classes and not points classes.)'
        },
        {
          name: 'Rookie Yamaha: Yamaha Rookie will run with the Novice classes. Rookie Yamaha will run for points and requires a 3 Hole YBX exhaust.',
          weight: ['230 lbs'],
          tires: 'YLC 450x5',
          notes: 'Yamaha KT100 WA55 Carb 3 Hole YBX Can 7-12 Years Old SFI Approved Ribvest Mandatory'
        },
        {
          name: 'Yamaha Junior Can (Class #1 and #2, Runs Twice)',
          weight: ['305 lbs'],
          tires: 'YLC: 450x5 front, 600x5 rear or 710x5 rear (710x5 Mandatory after Race #5)',
          notes: 'Air Boxes Mandatory. 12-15 years old.'
        },
        {
          name: 'Briggs LO206 CIK Senior',
          weight: ['365 lbs'],
          tires: 'YLC 450x5 Front, 710x5 Rear. *See rules below for max wheel width',
          notes: '15 and up. Factory Briggs Rules for the LO206 engine. CIK Bodywork and Sprint Style Seats Legal Only. NCMP track race gas only, must pass tech. Scroll down to bottom of page for complete rules.',
          rules: ['LO206 Engine Rules: Must run RLV 5507 Exhaust Header with 4104 Silencer. All engines must run Factory Briggs rules only. No disc clutches, shoe type only.','NCMP track 100 octane LO206 race gas only, must pass tech','Shoe Type Clutch Only, No Disc Clutches']
        },
        {
          name: 'Briggs LO206 Senior',
          weight: ['365 lbs'],
          tires: 'YLC 450x5 Front, 710x5 Rear *See rules below for max wheel width',
          notes: '15 and up. Factory Briggs Rules for the LO206 engine. NCMP track race gas only, must pass tech. Traditional 4 Cycle Bodywork and Seats Legal, CIK Bodywork and Sprint Seats also legal. Scroll down to bottom of page for complete rules.',
          rules: ['LO206 Engine Rules: Must run RLV 5507 Exhaust Header with 4104 Silencer. All engines must run Factory Briggs rules only. No disc clutches, shoe type only.','NCMP track 100 octane LO206 race gas only, must pass tech','Shoe Type Clutch Only, No Disc Clutches','Seat - Laydown and Sprint Style seats allowed','Bodywork - Bodywork can be European CIK bodywork or traditional 4 cycle bodywork','Front Wheel Width - 6 1/4" Wide Outside to Outside Max. Rear Wheel Width - 9" Rear Outside to Outside Max']

        },
        {
          name: 'Briggs LO206 CIK Masters',
          weight: ['370 lbs'],
          tires: 'YLC 450x5 Front, 710x5 Rear *See rules below for max wheel width.',
          notes: '40 years old and up. Factory Briggs Rules for the LO206 engine. NCMP track race gas only, must pass tech. CIK Bodywork and Sprint Style Seats Legal Only. Scroll down to bottom of page for complete rules.',
          rules: ['LO206 Engine Rules: Must run RLV 5507 Exhaust Header with 4104 Silencer. All engines must run Factory Briggs rules only. No disc clutches, shoe type only.','NCMP track 100 octane LO206 race gas only, must pass tech','Shoe Type Clutch Only, No Disc Clutches','Seat - Must use sprint style kart seat','Bodywork - Must use any CIK approved European style bodywork. Rear plastic bumper is optional','Front Wheel Width - 5 1/2" x 5" Max Overall Width, Outside to Outside.  Rear Wheel Width - 8 3/8" x 5" Max Overall Width, Outside to Outside']

        },
        {
          name: 'Briggs LO206 Junior CIK: This class will run on track with the Yamaha Novice and Rookie Classes.',
          weight: ['320 lbs'],
          tires: 'YLC 450x5 Front, 710x5 Rear *See rules below for max wheel width',
          notes: '12 to 15 years old. Factory Briggs Rules for the LO206 engine. Gold Carb Slide. CIK Bodywork and Sprint Style Seats Legal Only. NCMP track race gas only, must pass tech. Scroll down to bottom of page for complete rules.'
        },
        {
          name: 'Briggs LO206 Sportsman CIK: This class will run on track with the Yamaha Novice and Rookie Classes.',
          weight: ['250 lbs'],
          tires: 'YLC 450x5',
          notes: '8 to 12 years old. Factory Briggs Rules for the LO206 engine. Green Carb Slide. CIK Bodywork and Sprint Style Seats Legal Only. NCMP track race gas only, must pass tech. Scroll down to bottom of page for complete rules'
        },
        {
          name: 'Yamaha Can Senior',
          weight: ['335 lbs'],
          tires: 'YLC',
          notes: 'Air Boxes Mandatory 15 and up.'
        },
        {
          name: 'Yamaha Can Masters',
          weight: ['360 lbs'],
          tires: 'YLC',
          notes: 'Air Boxes Mandatory 30 years and up.'
        },
        {
          name: 'TaG Super Lite',
          weight: [
            'PRD, Easy Kart - 325 lbs.',
            'Leopard, Rotax, X30 - 335 lbs.',
            'All Other Engines - 345 lbs.'
          ],
          tires: 'YLC',
          notes: 'Air Boxes Mandatory 15 and up. WKA Engine Rules',
          rules: ['Add 20 lbs to the minimum weight if you are running front brakes in any single speed class (does not include shifter class, no additional weight needed)','The Motori 7 engine is NOT allowed in any KRA TaG Class.']
        },
        {
          name: 'TaG Senior',
          weight: [
            'PRD, Easy Kart - 350 lbs.',
            'Leopard, Rotax, X30 - 360 lbs.',
            'All Other Engines - 370 lbs.'
          ],
          tires: 'YLC',
          notes: 'Air Boxes Mandatory 15 and up. WKA Engine Rules',
          rules: ['Add 20 lbs to the minimum weight if you are running front brakes in any single speed class (does not include shifter class, no additional weight needed)','The Motori 7 engine is NOT allowed in any KRA TaG Class.']
        },
        {
          name: 'TaG Heavy',
          weight: [
            'PRD, Easy Kart, Leopard - 395 lbs.',
            'X30 - 405 lbs.',
            'All Other Engines - 415 lbs.'
          ],
          tires: 'YLC',
          notes: 'Air Boxes Mandatory 15 and up. WKA Engine Rules',
          rules: ['Add 20 lbs to the minimum weight if you are running front brakes in any single speed class (does not include shifter class, no additional weight needed)','The Motori 7 engine is NOT allowed in any KRA TaG Class.']
        },
        {
          name: 'TaG Junior',
          weight: ['320 lbs.'],
          tires: 'YLM',
          notes: 'Air Boxes Mandatory. 12-15 years old. WKA Engine Rules. Leopard 25mm Header. X30 29mm Header.',
          rules: ['Add 20 lbs to the minimum weight if you are running front brakes in any single speed class (does not include shifter class, no additional weight needed)','The Motori 7 engine is NOT allowed in any KRA TaG Class.']
        },
        {
          name: 'Unlimited (Will Run with Shifter)',
          weight: ['No minimum'],
          tires: 'Any Bridgestone Tire',
          notes: 'Air Boxes Mandatory. 15 and Up.',
          rules:['Any Bridgestone Tire, No minimum weight. Any single speed purpose built kart engine gas or alcohol (The two speed Rotax DD2 is allowed) is permitted. Carburetor or fuel injection is allowed. Any motor that is deemed possible to produce 40hp or more will be required to use front and rear brakes.','Twin or single engine formulas are permitted. In this day of spec classes in all forms of motorsports this class offers innovation and creativity to the racers. This class is truly UNLIMITED, have fun!']
        },
        {
          name: 'Kid Karts',
          weight: ['150 lbs'],
          tires: '450x5 YLC Tires Only. Max Rear Tire Circumference 33 in.',
          notes: 'Class will Qualify and Race. 5-7 years old. All Drivers Must Use an SFI Approved Ribvest. The Honda GXH50 will be allowed to run in the class as well.'
        }





      ]

      return classes;

    }

  $scope.classInfo = fillClassInfo();



  function buildResults(data) {

    // console.log(data);
    var d = JSON.parse(data.results);
    // var d = JSON.parse(d.data)
    for (var i = 0; i < d.length; i++) {
      for (var j = 0; j < d[i].drivers.length; j++) {
        for (var k = 0; k < d[i].drivers[j].results.length; k++) {
          if (d[i].drivers[j].results[k].position == 1) {
            d[i].drivers[j].results[k].style = "color:gold;font-size:130%;"
          } else if (d[i].drivers[j].results[k].position == 2) {
            d[i].drivers[j].results[k].style = "color:silver;font-size:120%;"
          } else if (d[i].drivers[j].results[k].position == 3) {
            d[i].drivers[j].results[k].style = "color:orange;font-size:110%;"
          } else if (d[i].drivers[j].results[k].position == 0) {
            d[i].drivers[j].results[k].style = "color:lightgrey;"
          } else if (d[i].drivers[j].results[k].position == 'DQ') {
            d[i].drivers[j].results[k].style = "color:red;"
          }
          if (d[i].drivers[j].results[k].position == 11) {
            d[i].drivers[j].results[k].position = d[i].drivers[j].results[k].position + 'th'
          } else if (d[i].drivers[j].results[k].position == 12) {
            d[i].drivers[j].results[k].position = d[i].drivers[j].results[k].position + 'th'
          } else if (d[i].drivers[j].results[k].position == 13) {
            d[i].drivers[j].results[k].position = d[i].drivers[j].results[k].position + 'th'
          } else if (d[i].drivers[j].results[k].position[d[i].drivers[j].results[k].position.length-1] == 1) {
            d[i].drivers[j].results[k].position = d[i].drivers[j].results[k].position + 'st'
          } else if (d[i].drivers[j].results[k].position[d[i].drivers[j].results[k].position.length-1] == 2) {
            d[i].drivers[j].results[k].position = d[i].drivers[j].results[k].position + 'nd'
          } else if (d[i].drivers[j].results[k].position[d[i].drivers[j].results[k].position.length-1] == 3) {
            d[i].drivers[j].results[k].position = d[i].drivers[j].results[k].position + 'rd'
          } else if(d[i].drivers[j].results[k].position == 0) {

          } else if(d[i].drivers[j].results[k].position == 'DQ') {

          } else {
            d[i].drivers[j].results[k].position = d[i].drivers[j].results[k].position + 'th'
          }
          if (k === d[i].drivers[j].results.length-1) {
            d[i].drivers[j].results[k].position = d[i].drivers[j].results[k].position.slice(0,-2);
          }
        }
      }
    }
    // console.log(d);
    return d;

  }

  function getPoints() {
    $http.get('getPoints')
    .then(function(data) {
      // console.log(data);
      if (data.data.length != 0) {

        $scope.currentPoints = buildResults(data.data[data.data.length-1]);
        $scope.announcements.banner[2] = $scope.currentPoints;
        // console.log($scope.announcements.banner);
        // runBanner($scope.announcements.banner)
      }
      // console.log($scope.currentPoints);
    })
    .catch(function(err) {
      console.log(err);
    })
  }


  $scope.selectPointsClass = function(cl) {
    $scope.selectedPointsClass = cl;
  }



  // Will pull from sponsors list
  function pullSponsors() {

    $http.get('getSponsors')
    .then(function(data) {
      // console.log(data.data);
      $scope.sponsors = data.data;
    })
    .catch(function(err) {
      // console.log(err);
    })

  }
  pullSponsors();


  function giveAnnouncements() {

    var date = new Date();

    var day = date.getDate();
    var month = date.getMonth() + 1

    var announcements = {
      news: [],
      events: [],
      banner: []
    };

    function makeDatePretty(d) {
      // console.log('hit 3');
      var month = monthNames[d.getMonth()];
      var date = d.getDate();
      var day = daysOfWeek[d.getDay()];

      // console.log(day + ', ' + month + ' ' + date)

      return day + ', ' + month + ' ' + date;

    }

    // console.log('GET NEWS');
    $http.get('getNews')
    .then(function(res) {
      // console.log(res.data);
      var news = [];
      for (var i = 0; i < res.data.length; i++) {
        // console.log(i);
        var n = res.data[i];
        // console.log(n);
        n.set_type = JSON.parse(n.set_type);
        var today = new Date().getTime();
        if (n.set_type.post_until === true) {
          news.push(n);
        } else {

          var post_until = new Date(n.set_type.post_until).getTime();
          // console.log(today);
          // console.log(n.set_type.post_until.getTime());
          // console.log(post_until);
          if (post_until) {
            // console.log('Hit 1');
            if (post_until >= today) {
              // console.log('Hit 2');
              if (n.set_type.type == 'postpone') {
                // console.log(makeDatePretty(n.set_type.postponedUntil));
                n.set_type.postponedUntil = makeDatePretty(n.set_type.postponedUntil);
              } else if(n.set_type.type == 'delay') {
                n.set_type.delayedUntil = makeTimePretty(n.set_type.delayedUntil)
              }
              news.push(n);

            }

          } else if(new Date(n.set_type.postponedUntil).getTime() >= today) {

            // console.log('Hit 3');
            if (n.set_type.type == 'postpone') {
              // console.log(makeDatePretty(n.set_type.postponedUntil));
              n.set_type.postponedUntil = makeDatePretty(n.set_type.postponedUntil);
            } else if(n.set_type.type == 'delay') {
              n.set_type.delayedUntil = makeTimePretty(n.set_type.delayedUntil)
            }
            news.push(n);


          }

        }
        if (i == res.data.length-1) {
          announcements.news = news;
          announcements.banner.push(news)
          // console.log(announcements);
          // console.log(news);
        }
      }
    })


    var stack = []; //contains a stack with the upcoming events

    // console.log($scope.events);

    for (var i = 0; i < $scope.events.length; i++) {

      if ($scope.events[i].date.slice(5,-17) > month) {

        stack.push($scope.events[i])

      } else if ($scope.events[i].date.slice(5,-17) == month) {

        if ($scope.events[i].date.slice(8,-14) >= day) {

          if ($scope.events[i].date.slice(8,-14) == day) {
            $scope.todaysEvent = $scope.events[i]
            $scope.selectedBit = $scope.events[i];
          } else {

            stack.push($scope.events[i])

          }

        }

      }

    }
    // console.log(stack);
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

    var keyedStack = lookAtKeys(stack);

    function sortByDate(arr) {

      var stack = arr;

      // console.log(arr);

      var toComp = [] //takes 2 elements to be compared
      var repeat = false;
      for (var i = 0; i < arr.length; i++) {

        toComp = [arr[i],arr[i+1]];
        // console.log('loop #' + i);
        // console.log(toComp)
        if (i === arr.length - 1) {
          if (repeat == true) {
            i = -1;
            repeat = false;
          } else {
            // console.log('hit');
            // console.log(stack);
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


        // console.log(stack);
      // return stack;
      }

    }

    // console.log(keyedStack);

    var newStack = sortByDate(keyedStack);

    // console.log(newStack);
    // var eventKeys = [];

    // var newStack = [];

    if (newStack) {
      // console.log('hit');
      // for (var i = 0; i < sortedStack.length; i++) {
      //   if (sortedStack[i].event_key) {
      //     if (eventKeys.length > 0) {
      //       var keep = true;
      //       for (var j = 0; j < eventKeys.length; j++) {
      //         if (eventKeys[j] == sortedStack[i].event_key) {
      //           keep = false;
      //           j = eventKeys.length;
      //         }
      //       }
      //     } else {
      //       eventKeys.push(sortedStack[i].event_key);
      //       newStack.push(sortedStack[i]);
      //     }
      //     // eventKeys.push(sortedStack[i].event_key)
      //   } else {
      //     newStack.push(sortedStack[i]);
      //   }
      // }

      // if (newStack.length > 10) {
      //   newStack = newStack.slice(0,newStack.length - 10)
      //   announcements.events = newStack;
      // } else {
      //   announcements.events = newStack;
      // }
      // console.log(newStack);
      // for (var i = 0; i < newStack.length; i++) {
      //
      // }
      announcements.events = newStack;
      // console.log(announcements.events);

      // console.log(announcements.events)

      function makeDatePretty(d) {

        var month = monthNames[d.slice(5,-17)-1];
        var date = d.slice(8,-14);
        var day = daysOfWeek[new Date(d).getDay()];

        return day + ', ' + month + ' ' + date;

      }



      for (var i = 0; i < announcements.events.length; i++) {
        // console.log(announcements.events[i]);
        announcements.events[i].displayDate = makeDatePretty(announcements.events[i].date);
        // $http.post('getEventRegistration',{seriesId:announcements.events[i].event_group_id})
        // .then(function(data) {
        //   console.log(announcements.events[i]);
        //   var ev = {
        //     name: announcements.events[i].name,
        //     color: announcements.events[i].color,
        //     id: announcements.events[i].id,
        //     event_group_id: announcements.events[i].event_group_id,
        //     date: announcements.events[i].date,
        //     image: announcements.events[i].image,
        //     imageUrl: announcements.events[i].imageUrl,
        //     start: announcements.events[i].start,
        //     end: announcements.events[i].end,
        //     display_end: announcements.events[i].display_end,
        //     display_start: announcements.events[i].display_start,
        //     display_date: announcements.events[i].display_date,
        //     displayDate: announcements.events[i].displayDate,
        //     description: announcements.events[i].description,
        //     layout: announcements.events[i].layout,
        //     event_key: announcements.events[i].event_key,
        //     registration: data.data
        //   }
        //   console.log(announcements.events);
        //   announcements.events[i] = ev;
        // })
        // .catch(function(err) {
        //   console.log(err);
        // })

      }



      announcements.events = announcements.events.map(function(e) {
        $http.post('getImage', {id:e.image})
        .then(function(res) {

          // console.log(res);

          e.imageUrl = res.data[0].dataURL;
          // console.log(e)

        })
        return e;
      })


      // console.log(announcements);

      function makeTimePretty(t) {
        var h = Number(t.slice(0,-6));
        var m = t.slice(3,-3);
        var append = 'am';
        if (h>12) {
          h = h-12;
          append = 'pm';
        } else if(h===12) {
          append = 'pm'
        }
        return h + ':' + m + append;
      }
      // for (var i = 0; i < announcements.events.length; i++) {
      //   announcements.events[i].display_start=makeTimePretty(announcements.events[i].start);
      //   announcements.events[i].display_end=makeTimePretty(announcements.events[i].end);
      // }
      announcements.banner.push(announcements.events);
      $scope.announcements = announcements;
      // console.log();
      var count = 0;
      function giveEventRegistration() {
        // console.log(count);
        // console.log();
        if (count != $scope.announcements.events.length) {
          $http.post('getEventRegistration',{seriesId:$scope.announcements.events[count].event_group_id})
          .then(function(data) {
            var ev = {
              name: $scope.announcements.events[count].name,
              color: $scope.announcements.events[count].color,
              id: $scope.announcements.events[count].id,
              event_group_id: $scope.announcements.events[count].event_group_id,
              date: $scope.announcements.events[count].date,
              image: $scope.announcements.events[count].image,
              imageUrl: $scope.announcements.events[count].imageUrl,
              start: $scope.announcements.events[count].start,
              end: $scope.announcements.events[count].end,
              display_end: $scope.announcements.events[count].display_end,
              display_start: $scope.announcements.events[count].display_start,
              display_date: $scope.announcements.events[count].display_date,
              displayDate: $scope.announcements.events[count].displayDate,
              description: $scope.announcements.events[count].description,
              layout: $scope.announcements.events[count].layout,
              event_key: $scope.announcements.events[count].event_key,
              registration: data.data,
              openReg:false
            }
            // console.log(ev);
            if (ev.registration.registry_data != null) {
              ev.registration.registry_data = JSON.parse(ev.registration.registry_data);
              var today = new Date();
              var days;
              if (ev.registration.registry_data.openReg.months) {
                days = 30 * ev.registration.registry_data.openReg.qty;
              } else if (ev.registration.registry_data.openReg.weeks) {
                days = 7 * ev.registration.registry_data.openReg.qty;
              } else if (ev.registration.registry_data.openReg.days) {
                days = ev.registration.registry_data.openReg.qty;
              }
              var openDate = new Date(ev.date);
              // console.log(today);
              // console.log(days);
              openDate.setDate(openDate.getDate() - days);
              // console.log(openDate);
              if (today.getMonth() >= openDate.getMonth() && today.getMonth()-openDate.getMonth() <= 1) {
                if (today.getMonth() > openDate.getMonth()) {
                  // console.log($scope.monthDays);
                  var monthLength = monthDays[openDate.getMonth()];
                  var difference = today.getDate() + (monthLength - openDate.getDate());
                  if (difference <= days) {
                    ev.openReg = true;
                  }
                } else if(today.getDate() >= openDate.getDate()) {
                  var difference = today.getDate() - openDate.getDate()
                  if (difference <= days) {
                    ev.openReg = true;
                  }
                }
              }
            }
            $scope.announcements.events[count] = ev;

            count++;
            giveEventRegistration();
          })
          .catch(function(err) {
            console.log(err);
          })
        }
        // console.log($scope.announcements.events);
      }
      giveEventRegistration();
      // for (var i = 0; i < $scope.announcements.events.length; i++) {
      //   console.log($scope.announcements.events[i]);
      //   // $scope.announcements.events[i].displayDate = makeDatePretty($scope.announcements.events[i].date);
      //   $http.post('getEventRegistration',{seriesId:$scope.announcements.events[i].event_group_id})
      //   .then(function(data) {
      //     console.log($scope.announcements.events[i]);
      //
      //     console.log(announcements.events);
      //     announcements.events[i] = ev;
      //   })
      //   .catch(function(err) {
      //     console.log(err);
      //   })
      //
      // }
      // console.log($scope.announcements);

      if ($scope.todaysEvent === undefined) {
        if (date.getDay() != 1) {
          $scope.todaysEvent = {
            name:'Open Practice',
            color:'lightgreen'
          }
        } else {
          $scope.todaysEvent = {
            name:'Track Closed',
            color:'lightpink'
          }
        }
      }


      if ($scope.todaysEvent.date) {

        $scope.todaysEvent.displayDate = makeDatePretty($scope.todaysEvent.date);
        // pairImage($scope.todaysEvent, 'single')

      } else {
        $scope.selectedBit = announcements.events[0]
      }
    }



    // var groupIds = [];
    //
    // var groups = [];
    //
    // for (var i = 0; i < announcements.events.length; i++) {
    //
    //   var push = true;
    //
    //   for (var j = 0; j < groupIds.length; j++) {
    //     if (groupIds[j] === announcements.events[i].event_group_id) {
    //       push = false;
    //     }
    //   }
    //   if (push) {
    //     console.log(i)
    //     // console.log(announcements.events[i].event_group_id)
    //     groupIds.push(announcements.events[i].event_group_id)
    //     $http.post('getEventGroups', {id:announcements.events[i].event_group_id})
    //     .then(function(res) {
    //       console.log(res);
    //     })
    //     .catch(function(err) {
    //       console.log(err);
    //     })
    //   }

    // }




  }

  $scope.thisBit = function(b) {
    // console.log(b);
    $scope.selectedBit = b;

  }

  $scope.goToRegistration = function(e) {
    // console.log(e);
    $scope.registrationForm = e.registration.registry_data;
    $scope.registrationForm.eventId = e.id;
    $scope.registrationForm.eventInfo = e;

    // console.log($scope.registrationForm);
    $scope.registrationForm.eventInfo.registration.registry_data.eventInfo = null;

    sessionStorage.registration = JSON.stringify($scope.registrationForm);

    function setReg() {
      if ($scope.registrationForm == null || $scope.registrationForm == '') {
        // console.log('hit');
        $scope.registrationForm = e.registration.registry_data;
        setReg()
      } else {
        // console.log($scope.registrationForm);
        $window.location.href = "/#!/registration";

      }
    }
    setReg();


    // $http.post('getEventRegistration', {seriesId:$scope.selectedBit.event_group_id})
    // .then(function(data) {
    //   console.log(data);
    //   $scope.registrationForm = JSON.parse(data.data.registry_data);
        //   console.log($scope.registrationForm);
    //
    // })
    // .catch(function(err) {
    //   console.log(err);
    // })
    // $http.post('getEntryList', {seriesId:$scope.selectedBit.event_id})
    // .then(function(data) {
    //   $scope.entryList = JSON.parse(data.data.registry_data);
    //
    // })
    // .catch(function(err) {
    //   console.log(err);
    // })
  }


  // $http.get('api.openweathermap.org/data/2.5/weather?q=NewCastle,IN')
  // .then(function(res) {
  //   console.log('Weather info');
  //   console.console.log(res);
  //   // var weather = res.data.current_observation;
  //   // var url = weather.icon_url.slice(4);
  //   //
  //   // weather.icon_url = "https" + url;
  //   //
  //   // $scope.weather = weather;
  //
  //   // console.log($scope.weather);
  //
  // })
  // $http.get('https://api.wunderground.com/api/7c8eaaf84b5e5dd0/forecast10day/q/IN/New_Castle.json')
  // .then(function(res) {
  //
  //   $scope.tenDayForecast = res.data.forecast.simpleforecast.forecastday;
  //
  // })

}]);
