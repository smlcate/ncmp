app.controller('membersCtrl', ['$scope', '$http', '$compile', function($scope, $http, $compile) {

  // $scope.member = {
  //   single: true,
  //   family: false,
  //   primay: {
  //     fName:'',
  //     lName:'',
  //     mName:'',
  //     bDate:'',
  //   },
  //   drivers: []
  // }
  //

  console.log($scope.user);
  $scope.memberForm = {
    single: true,
    family: false,
    class_choices: [],
    members: [{
      fName:"",
      lName:"",
      mName:"",
      bDay:"",
      image:"",
      classes:[{
        name:"",
        number:"",
        chassis:""
      }],
      about:"",
      social: {
        twitter:"",
        instagram:""
      }
    }]
  }

  $scope.selectFile = function(input,m,single) {
    // console.log(input.target.files)
    if (input.target.files && input.target.files[0]) {
      // console.log(input.files);
      var reader = new FileReader();

      reader.onload = function (e) {
        // console.log(e.target.result);
        $scope.memberForm.members[m].image = e.target.result;
        if (single) {
          $('#memberImagePreviewSingle').attr('src', e.target.result);
          $('#memberImagePreview'+m).attr('src', e.target.result);
        } else {
          $('#memberImagePreview'+m).attr('src', e.target.result);
        }
      };
      // console.log(input.target.files[0]);
      reader.readAsDataURL(input.target.files[0]);
    }
  }

  $scope.deleteMemClass = function(d,c) {
    $scope.memberForm.members[d].classes.splice(c,1)
    console.log(c);
    if (c > 0) {
      console.log('hit');
      console.log('#'+d+'memberClassSelectInputDiv'+c);
      $('#'+d+'memberClassSelectInputDiv'+c).remove();
      if ($scope.memberForm.single == true) {
        console.log('hit2');
        console.log('#singleMemberClassSelectInputDiv'+c);
        $('#singleMemberClassSelectInputDiv'+c).remove();
      }
    }
  }

  $scope.addMember = function() {
    $scope.memberForm.members.push({
      fName:"",
      lName:"",
      mName:"",
      bDay:"",
      image:"",
      classes:[{
        name:"",
        number:"",
        chassis:""
      }],
      about:"",
      social: {
        twitter:"",
        instagram:""
      }
    });
    // var html = '<div class="memberInfoDivs"><div class="memberInfoDivContainers"><div class="memberInfoTopInputs"><div class="memberPictureInputDivs">      <input type="file" alt="no image selected" onchange="angular.element(this).scope().selectFile(event,'+($scope.memberForm.members.length-1)+')" /><img class="memberImagePreviews" id="memberImagePreview'+($scope.memberForm.members.length-1)+'" src="#" alt="Select Image" /></div><div class="memberInfoIdInputDivs"> <input class="memberNameInputs" type="text" name="" placeholder="First Name" value="" ng-model="memberForm.members['+($scope.memberForm.members.length-1)+'].fName"><input class="memberNameInputs" type="text" name="" placeholder="Last Name" value="" ng-model="memberForm.members['+($scope.memberForm.members.length-1)+'].lName"><span id="initAndBdaySpan"><input type="text" name="" id="memberMidInitInput"  placeholder="Mid Init" value=""ng-model="memberForm.members['+($scope.memberForm.members.length-1)+'].mName"><input type="date" name="" placeholder="Birthday" value="" ng-model="memberForm.members['+($scope.memberForm.members.length-1)+'].bDay"></span></div></div><div class="memberInfoBottomInputs" id="memberInfoBottomInput'+($scope.memberForm.members.length-1)+'"><div class="memberClassSelectInputDivs" id="memberClassSelectInputDiv'+($scope.memberForm.members.length-1)+'"><select class="memberClassSelectInput"><option class="memberClassOptions" value="{{cl.name}}" ng-repeat="cl in memberForm.class_choices" ng-model="memberForm.members['+($scope.memberForm.members.length-1)+'].classes[0].name">{{cl.name}}</option></select><input type="number" class="memberKartNumberInputs" placeholder="##" name="" value="" ng-model="memberForm.members['+($scope.memberForm.members.length-1)+'].classes[0].number"><input type="text" name="" placeholder="chassis" value="" ng-model="memberForm.members['+($scope.memberForm.members.length-1)+'].classes[0].chassis"></div></div><button type="button" name="" ng-click="addMemberClass('+($scope.memberForm.members.length-1)+')">+</button></div><div class="memberInfoDivContainers" id="memberInfoDivRightContainer"><h3>About</h3><textarea type="textarea" class="memberInfoAboutInputs" name="" value="" ng-model="memberForm.members['+($scope.memberForm.members.length-1)+'].about"></textarea><span class="memberInfoSocialSpans"><p>@</p><input type="text" placeholder="twitter" name="" value="" ng-model="memberForm.members['+($scope.memberForm.members.length-1)+'].social.twitter"></span><span class="memberInfoSocialSpans"><p>@</p><input type="text" placeholder="instagram" name="" value="" ng-model="memberForm.members['+($scope.memberForm.members.length-1)+'].social.instagram"></span></div></div>'


    var html = '<div class="famMemDriverCell"><div class="memberInfoLeftDivContainers"><h2>Driver '+$scope.memberForm.members.length+'</h2><div class="memberInfoTopInputs"><span class="memberInfoIdInputDivs"><div class="memberPictureInputDivs"><img class="memberImagePreviews" alt="No Image Selected" id="memberImagePreview'+($scope.memberForm.members.length-1)+'" src="../images/placeholder-profile-pic.png" alt="Select Image" /><input type="file" alt="no image selected" onchange="angular.element(this).scope().selectFile(event,'+($scope.memberForm.members.length-1)+')" /></div><div class="memberInfoIdInputNameDivs"><span><input class="memberNameInputs" type="text" name="" placeholder="First Name" value="" ng-model="memberForm.members['+($scope.memberForm.members.length-1)+'].fName"><p style="color:red;width:10px;">*</p></span><span><input class="memberNameInputs" type="text" name="" placeholder="Last Name" value="" ng-model="memberForm.members['+($scope.memberForm.members.length-1)+'].lName"><p style="color:red;width:10px;">*</p></span><span class="initAndBdaySpans"><input class="initInputs" type="text" name="" id=""  placeholder="M" value=""ng-model="memberForm.members['+($scope.memberForm.members.length-1)+'].mName"><span><p>Birthday</p><input type="date" name="" placeholder="Birthday" value="" ng-model="memberForm.members['+($scope.memberForm.members.length-1)+'].bDay"></span></span></div></span><div class="memberInfoBottomInputs" id="memberInfoBottomInput'+($scope.memberForm.members.length-1)+'"><h3>Class Info</h3><div class="memberClassSelectInputDivs" id="'+($scope.memberForm.members.length-1)+'memberClassSelectInputDiv'+($scope.memberForm.members.length-1)+'"><button type="button" ng-if="memberForm.members['+($scope.memberForm.members.length-1)+'].classes['+($scope.memberForm.members.length-1)+'].name.length > 0" name="button" ng-click="deleteMemClass('+($scope.memberForm.members.length-1)+',0)">X</button><select class="memberClassSelectInput" ng-model="memberForm.members['+($scope.memberForm.members.length-1)+'].classes['+($scope.memberForm.members.length-1)+'].name"><option class="memberClassOptions" value="{{cl.name}}" ng-repeat="cl in memberForm.class_choices" >{{cl.name}}</option></select><input type="number" class="memberKartNumberInputs" id="memberKartNumberInput" placeholder="##" name="" value="" ng-model="memberForm.members['+($scope.memberForm.members.length-1)+'].classes['+($scope.memberForm.members.length-1)+'].number"><input type="text" placeholder="Transponder" name="" value="" ng-model="memberForm.members['+($scope.memberForm.members.length-1)+'].classes['+($scope.memberForm.members.length-1)+'].transponder"><input type="text" name="" placeholder="chassis" value="" ng-model="memberForm.members['+($scope.memberForm.members.length-1)+'].classes['+($scope.memberForm.members.length-1)+'].chassis"></div></div><button type="button" class="addMemberClassButtons" name="" ng-if="memberForm.members['+($scope.memberForm.members.length-1)+'].classes[0] && memberForm.members['+($scope.memberForm.members.length-1)+'].classes[0].name.length != 0" ng-click="addMemberClass('+($scope.memberForm.members.length-1)+',0)">+</button></div></div><div class="memberInfoRightDivContainers"><div class="memberInfoDivContainers" id="memberInfoDivRightContainer"><h3>About</h3><textarea type="textarea" id="" class="memberInfoAboutInputs" name="" value="" ng-model="memberForm.members['+($scope.memberForm.members.length-1)+'].about"></textarea></div></div></div>'

    angular.element($('#familyMemberInfoDiv')).append($compile(html)($scope))

  }

  $scope.addMemberClass = function(d, c) {
    console.log($scope.memberForm);
    // var m = $scope.memberForm.members.length-1;
    var cl = {
      name:"",
      number:"",
      chassis:""
    }

    var identifier = "";
    console.log($scope.memberForm.family);
    if ($scope.memberForm.family != true && $scope.memberForm.family != undefined) {
      identifier = "singleMemberClassSelectInputDiv"+(c+1);
    } else {
      identifier = d+"memberClassSelectInputDiv"+(c+1);
    }
    console.log(identifier);
    $scope.memberForm.members[d].classes.push(cl);
    var html = '<div class="memberClassSelectInputDivs" id="'+identifier+'"><button type="button" name="button" ng-click="deleteMemClass('+d+','+(c+1)+')">X</button><select class="memberClassSelectInput"ng-model="memberForm.members['+d+'].classes['+(c+1)+'].name"><option class="memberClassOptions" value="{{cl.name}}" ng-repeat="cl in memberForm.class_choices">{{cl.name}}</option></select><input type="number" id="memberKartNumberInput" class="memberKartNumberInputs" placeholder="##" name="" value="" ng-model="memberForm.members['+d+'].classes['+(c+1)+'].number"><input type="text" placeholder="Transponder" name="" value="" ng-model="memberForm.members['+d+'].classes['+(c+1)+'].transponder"><input type="text" name="" placeholder="chassis" value="" ng-model="memberForm.members['+d+'].classes['+(c+1)+'].chassis"></div>';
    console.log(html);
    if ($scope.memberForm.family == true) {

      angular.element($('#memberInfoBottomInput'+d)).append($compile(html)($scope))
    } else {
      angular.element($('#singleMemberInfoBottomInput')).append($compile(html)($scope))
      // angular.element($('#memberInfoBottomInput'+d)).append($compile(html)($scope))
    }
  }

  $http.post('getEventRegistration', {seriesId:1})
  .then(function(data) {
    console.log(data);
    console.log($scope.member);
    $scope.memberForm.classes = JSON.parse(data.data.registry_data).classes
    // $scope.member.drivers[0].classes[0].class = JSON.parse(data.data.registry_data).classes[0]
  })
  // $http.get('getUsers')
  // .then(function(data) {
  //   var mems = data.data.map( function(e) {
  //     return JSON.parse(e.membership)
  //   },[]);
  //   console.log(mems);
  //   for (var i = 0; i < mems.length; i++) {
  //     for (var j = 0; j < mems[i].drivers.length; j++) {
  //       console.log(mems[i].drivers[j]);
  //       for (var k = 0; k < mems[i].drivers[j].classes.length; k++) {
  //         console.log(mems[i].drivers[j].classes[k]);
  //         var numList = {
  //           cl: mems[i].drivers[j].classes[k].class,
  //           numbers: [mems[i].drivers[j].classes[k].kart_number]
  //         }
  //
  //         if ($scope.memberForm.kart_numbers.length == 0) {
  //           console.log('push: ', numList);
  //           $scope.memberForm.kart_numbers.push(numList)
  //         } else {
  //           for (var l = 0; l < $scope.memberForm.kart_numbers.length; l++) {
  //             console.log($scope.memberForm.kart_numbers[l]);
  //             if ($scope.memberForm.kart_numbers[l].cl.name == numList.cl.name) {
  //               $scope.memberForm.kart_numbers[l].numbers.push(mems[i].drivers[j].classes[k].kart_number)
  //             } else if($scope.memberForm.kart_numbers[l].cl.name != numList.cl.name && l == $scope.memberForm.kart_numbers.length - 1) {
  //               $scope.memberForm.kart_numbers.push(numList)
  //             }
  //           }
  //         }
  //
  //         // console.log(k,numList);
  //         // for (var l = 0; l < $scope.memberForm.kart_numbers.length; l++) {
  //         //   console.log(l,$scope.memberForm.kart_numbers[l].cl.name,numList.cl.name);
  //         //   if ($scope.memberForm.kart_numbers[l].cl.name == numList.cl.name) {
  //         //     console.log(numList);
  //         //     $scope.memberForm.kart_numbers[l].numbers.push(mems[i].drivers[j].classes[k].kart_number)
  //         //   } else if(l = $scope.memberForm.kart_numbers.length -1) {
  //         //     console.log(numList);
  //         //     $scope.memberForm.kart_numbers.push(numList)
  //         //   }
  //         // }
  //         // if ($scope.memberForm.kart_numbers.length == 0) {
  //         //   $scope.memberForm.kart_numbers.push(numList)
  //         // }
  //       }
  //     }
  //   }
  //   console.log($scope.memberForm);
  // })



  // var stripe = require('stripe')(process.env.STRIPE_API_KEY)

  // console.log(stripe);

  // var elements = stripe.elements();

  // console.log(elements);
  // Custom styling can be passed to options when creating an Element.
  // (Note that this demo uses a wider set of styles than the guide below.)
  // var style = {
  //   base: {
  //     color: '#32325d',
  //     lineHeight: '18px',
  //     fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
  //     fontSmoothing: 'antialiased',
  //     fontSize: '16px',
  //     '::placeholder': {
  //       color: '#aab7c4'
  //     }
  //   },
  //   invalid: {
  //     color: '#fa755a',
  //     iconColor: '#fa755a'
  //   }
  // };

  // Create an instance of the card Element
  // var card = elements.create('card', {style: style});

  // Add an instance of the card Element into the `card-element` <div>
  // card.mount('#card-element');

  // Handle real-time validation errors from the card Element.
  // card.addEventListener('change', function(event) {
  //   var displayError = document.getElementById('card-errors');
  //   if (event.error) {
  //     displayError.textContent = event.error.message;
  //   } else {
  //     displayError.textContent = '';
  //   }
  // });

  // Handle form submission
  // var form = document.getElementById('payment-form');

  // Create an instance of Elements
  var stripe = Stripe('pk_test_QQdpmZ8GvlAlmmeACv5k5Bn8');
  var elements = stripe.elements();

  // Custom styling can be passed to options when creating an Element.
  // (Note that this demo uses a wider set of styles than the guide below.)
  var style = {
    base: {
      color: '#32325d',
      // lineHeight: '0px',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '25px',
      '::placeholder': {
        color: '#aab7c4'
      },
      // alignItems: 'center'
    },
    invalid: {
      color: '#fa755a',
      iconColor: 'blue'
    }
  };

  // Create an instance of the card Element
  var card = elements.create('card', {style: style});

  // Add an instance of the card Element into the `card-element` <div>
  card.mount('#card-element');

  // Handle real-time validation errors from the card Element.
  card.addEventListener('change', function(event) {
    var displayError = document.getElementById('card-errors');
    if (event.error) {
      displayError.textContent = event.error.message;
    } else {
      displayError.textContent = '';
    }
  });

  // Handle form submission
  var form = document.getElementById('payment-form');
  form.addEventListener('submit', function(event) {
    event.preventDefault();

    stripe.createToken(card).then(function(result) {
      console.log(result);
      if (result.error) {
        // Inform the user if there was an error
        var errorElement = document.getElementById('card-errors');
        errorElement.textContent = result.error.message;
      } else {
        // Send the token to your server
        console.log($scope.user);
        $http.post('buyMembership', {token: result.token, member:JSON.stringify($scope.memberForm), user:$scope.user})
        .then(function(res, user) {
          console.log(res);
          if (res.data.res === 'success') {
            $scope.user = res.data.user;
            sessionStorage.user = JSON.stringify(res.data.user[0]);
          }
          console.log(res);
        })
        .catch(function(err) {
          console.log(err);
        })
      }
    });
  });

  $scope.selectClass = function(cl) {
    console.log(cl);
    // if ($scope.member.drivers[d].classes) {
    //   $scope.member.drivers[d].classes.push(cl)
    // } else {
    //   $scope.member.drivers[d].classes = [cl]
    // }
    console.log($scope.member.drivers);

  }


  $scope.pay = function() {

    // var stripe = Stripe('pk_test_QQdpmZ8GvlAlmmeACv5k5Bn8');
    // var elements = stripe.elements();
    //
    // var card = elements.create('card');
    // card.mount('#card-element');
    //
    // var promise = stripe.createToken(card);
    // promise.then(function(result) {
    //   // result.token is the card token.
    // });
    // var token = stripe.tokens.create({card:$scope.payment});



    // $http.post('buyMembership', {card:$scope.payment})
    // .then(function(res) {
    //   console.log(res);
    // })
    // .catch(function(err) {
    //   console.log(err);
    // })

  };

  $scope.selectedClasses = [];

  // $scope.member = {
  //   single: true,
  //   family: false
  // }

  function init() {
    $('#singleMembershipFormDisplay').css('display','flex')
    $('#familyMembershipFormDisplay').css('display','none')

    $http.get('getMainEventRegistration')
    .then(function(data) {

      for (var i = 0; i < data.data.length; i++) {
        reg_data = JSON.parse(data.data[i].registry_data)
        console.log(data.data[i].registry_data);
        if (reg_data.main_registration == true) {
          $scope.memberForm.class_choices = reg_data.classes;
          console.log($scope.memberForm.class_choices);
        }
      }
      // console.log(data);
    })
  }
  init()

  $scope.selectMemForm = function(t) {
    console.log(t);
    if (t == 'single') {
      $scope.memberForm.family = false;
      $scope.memberForm.single = true;



      $('#singleMembershipFormDisplay').css('display','flex')
      $('#familyMemberInfoDiv').css('display','none')
      $('#memberFormSingleSelectAnchor').css('font-size','30px')
      $('#memberFormFamilySelectAnchor').css('font-size','18px')

    }
    if(t == 'family') {
      $scope.memberForm.single = false;
      $scope.memberForm.family = true;

      $scope.memberForm.members.push({
        fName:"",
        lName:"",
        mName:"",
        bDay:"",
        image:"",
        classes:[{
          name:"",
          number:"",
          chassis:""
        }],
        about:"",
        social: {
          twitter:"",
          instagram:""
        }
      })

      $('#singleMembershipFormDisplay').css('display','none')
      $('#familyMemberInfoDiv').css('display','flex')
      $('#memberFormFamilySelectAnchor').css('font-size','30px')
      $('#memberFormSingleSelectAnchor').css('font-size','18px')


    }

  }

  $scope.checkNumber = function(b, c) {
    console.log(b);
    console.log(c)
    for (var i = 0; i < $scope.memberForm.kart_numbers.length; i++) {
      console.log($scope.memberForm.kart_numbers[i].cl.name);
      console.log($scope.member.drivers[b].classes[c].class.name);
      if ($scope.memberForm.kart_numbers[i].cl.name == $scope.member.drivers[b].classes[c].class.name) {
        for (var j = 0; j < $scope.memberForm.kart_numbers[i].numbers.length; j++) {
          console.log($scope.member.drivers[b].classes[c].kart_number);
          if ($scope.memberForm.kart_numbers[i].numbers[j] == $scope.member.drivers[b].classes[c].kart_number) {
            console.log('Exists Already');
            $('#'+b+'numberInput'+c+'alert').css('display','flex')
          } else {
            $('#'+b+'numberInput'+c+'alert').css('display','none')
          }
        }
      } else {
        // $('#'+b+'numberInput'+c+'alert').css('display','none')
      }
    }
  }

  $scope.addClass = function(b) {
    var c = 0
    if ($scope.member.drivers[b].classes) {
      c = $scope.member.drivers[b].classes.length
      // var info = {
      //   cl:'',
      //
      // }
    } else {
      $scope.member.drivers[b].classes = []
      // var c = 0
    }
    console.log($scope.member.drivers);
    var html = '<span><p>Select Class</p><select class="memClassSelectSpans" name=""  ng-model="member.drivers['+b+'].classes['+c+'].class" ng-options="cl.name for cl in memberForm.classes" ></select></span><span><p>Kart Number</p><input type="number" name="" value="" id="'+b+'numberInput'+c+'" ng-model="member.drivers['+b+'].classes['+c+'].kart_number" ng-change="checkNumber('+b+','+c+')" id="'+b+'numberInput'+c+'"><img src="../../images/glyphicons_free/glyphicons/png/glyphicons-505-alert.png" class="numberInputAlerts" id="'+b+'numberInput'+c+'alert"></span><span><p>Chassis Brand</p><input type="text" name="" value="" ng-model="member.drivers['+b+'].classes['+c+'].chassis"></span><span><p>Transponder ##</p><input type="text" name="" value="" ng-model="member.drivers['+b+'].classes['+c+'].transponder"></span>'

    angular.element($('#'+b+'memClass')).append($compile(html)($scope))


    // var c = $scope.class;
    // $scope.selectedClasses.push(c)

  }

  $scope.test = function() {
    console.log($scope.member.drivers);
  }


}]);
