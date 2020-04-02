app.controller('seriesCtrl', ['$scope', '$http', function($scope, $http) {

  $scope.openRegistrations = [];
  $scope.entry_lists = [];


  $('.seriesNavAncs').on('click', function() {
      $('.seriesNavAncs').css({'background':'#154498','color':'white'});
    $(this).css({'background':'white','color':'#154498'});
    // console.log('hit');
  })
  $('#seriesNavMainAnc').css({'background':'white','color':'#154498'});

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

    function buildPreRegistration() {
      console.log($scope.announcements.events[0]);
      // for (var i = 0; i < $scope.announcements.events.length; i++) {
      //
      // }

      $http.post('getEventRegistration',{seriesId:$scope.announcements.events[0].event_group_id})
      .then(function(res) {
        console.log(res.data);
        var reg = res.data;
        $scope.openRegistrations.push(reg);
      })
      .catch(function(err) {
        console.log(err);
      })
      $http.get('getEventEntryLists')
      .then(function(data) {
        var lists = [];
        for (var i = 0; i < data.data.length; i++) {
          // console.log(JSON.parse(data.data[i].entries))
          var l = {
            original:data.data[i],
            entries: JSON.parse(data.data[i].entries)
          }
          lists.push(l);
          for (var j = 0; j < $scope.events.length; j++) {
            if (l.original.event_id === $scope.events[j].id) {
              l.ev = $scope.events[j]
            }
          }
        }
        // console.log(lists);
        $scope.entry_lists = lists;
        console.log($scope.entry_lists);
      })
      .catch(function(err) {
        console.log(err);
      })
      // $scope.openRegistrations.push($scope.announcements.events[0]);

    }
    buildPreRegistration();

    function buildPage() {

      $('.seriesPageInfoContainers').css('display','none');
      $('#seriesAboutPageInfoContainer').css('display','flex');

      $scope.classInfo = fillClassInfo().map(function(e) {
        e.displayName = e.name.split(':')[0];
        e.displayName = e.displayName.split('(')[0];
        return e;
      },[]);

      $scope.selectedClass = $scope.classInfo[0];
    }
    buildPage();

    $scope.thisClass = function(c) {
      $scope.selectedClass = c;
    }

    $scope.selectSeriesInfo = function (p) {
      $('.seriesPageInfoContainers').css('display','none');
      $('#series'+p+'PageInfoContainer').css('display', 'flex');
    }

    $scope.selectRegistrationList = function(list,index) {
      $('.registryClassCell').css('background','white');
      $('.registryClassCell h1').css('color','#154498');
      // console.log(index);

      $('#'+index+'registryClassCell').css('background','#154498');
      $('#'+index+'registryClassCell h1').css('color','#E1F5FE');
      // $('#'+index+'registryClassCell ').css('color','#154498');

      // console.log(list);
      $scope.selectedRegistrationList = list;
    }
    $scope.selectRegistrationOption = function(list) {
      var l = list;
      for (var i = 0; i < l.length; i++) {
        for (var j = 0; j < $scope.selectedRegistration.entries.members.length; j++) {
          if (l[i].member_id == $scope.selectedRegistration.entries.members[j].id) {
            l[i].membership = $scope.selectedRegistration.entries.members[j];
          }
        }
      }
      $scope.selectedRegistrationOption = l;
    }

  // $scope.selectSeriesInfo = function(option) {
  //
  //   if (option === 'news') {
  //     $('#seriesNewsContainer').css('display','flex');
  //     $('#seriesPointsContainer').css('display','none');
  //     $('#seriesScheduleContainer').css('display','none');
  //   } else if (option === 'points') {
  //     $('#seriesNewsContainer').css('display','none');
  //     $('#seriesPointsContainer').css('display','flex');
  //     $('#seriesScheduleContainer').css('display','none');
  //   } else if (option === 'schedule') {
  //     $('#seriesNewsContainer').css('display','none');
  //     $('#seriesPointsContainer').css('display','none');
  //     $('#seriesScheduleContainer').css('display','flex');
  //   }
  //
  // }

}]);
