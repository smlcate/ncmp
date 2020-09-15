app.controller('registrationCtrl', ['$scope', '$http', '$compile', function($scope, $http, $compile) {

  $scope.regForm = {
    drivers: [],
    classes: [[]],
    options: [],
    tempMembers: [],
    passes:[],
    membership: null
  }
  $scope.driver = {
    name:'',
    age:''
  };
  $scope.temp = {
    name:'',
    city:'',
    state:'',
    contacts:{
      email_1:'',
      phone_1:''
    }
  }

  $scope.costs = {
    entries: 1,
    total: 0,
    totalTransponderRentals:0,
    tempMem: true
  };

  console.log($scope.registrationForm);

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
      // console.log(result);
      if (result.error) {
        // Inform the user if there was an error
        var errorElement = document.getElementById('card-errors');
        errorElement.textContent = result.error.message;
      } else {
        // console.log($scope.regForm);
        // Send the token to your server
      //   for (var j = 0; j < $scope.regForm.drivers.length; j++) {
      //     for (var i = 0; i < $scope.regForm.classes[j].length; i++) {
      //       var cl = {
      //         name:$scope.regForm.classes[j][i].name,
      //         transponder:'',
      //         number:$('#kartNumber'+$scope.regForm.classes[j][i].$$hashKey.slice(7)).val()
      //       }
      //       if (j > 0) {
      //
      //         cl.number = $('#'+(j+1)+'kartNumber'+$scope.regForm.classes[j][i].$$hashKey.slice(7)).val()
      //         cl.transponder = $('#'+(j+1)+'transponder'+$scope.regForm.classes[j][i].$$hashKey.slice(7)).val()
      //         // if ($('#'+j+'transponder'+$scope.regForm.classes[j][i].$$hashKey.slice(7)).val().length > 0) {
      //         //   cl.transponder = $('#'+j+'transponder'+$scope.regForm.classes[j][i].$$hashKey.slice(7)).val();
      //         // }
      //       } else if($('#transponder'+$scope.regForm.classes[j][i].$$hashKey.slice(7)).val().length > 0) {
      //         cl.transponder = $('#transponder'+$scope.regForm.classes[j][i].$$hashKey.slice(7)).val();
      //       }
      //       console.log(cl);
      //       $scope.regForm.classes[j][i] = cl;
      //     }
      //   }
      //   // for (var i = 0; i < $scope.registrationForm.options.length; i++) {
      //   //   if ($('#option'+$scope.registrationForm.options[i].$$hashKey.slice(7)).is(':checked')) {
      //   //     var opt = {
      //   //       name:$scope.registrationForm.options[i].name,
      //   //       quantity:null,
      //   //     }
      //   //     if ($scope.registrationForm.options[i].quantity_option === true) {
      //   //       opt.quantity = $('#optionQuantityLimit'+$scope.registrationForm.options[i].$$hashKey.slice(7)).val();
      //   //     }
      //   //     $scope.regForm.options.push(opt)
      //   //   }
      //   // }
      //   // $scope.regForm.drivers.push({
      //   //   name: $scope.driver.name,
      //   //   age: $scope.driver.age
      //   // })
      //
      //   $scope.regForm.membership = {
      //     name: $scope.temp.name,
      //     address: $scope.temp.address,
      //     city: $scope.temp.city,
      //     state: $scope.temp.state,
      //     zip_code: $scope.temp.zip_code
      //   };
      //
      //   console.log($scope.regForm);
        // console.log($scope.regForm);
        $http.post('buyRegistration', {token: result.token, member:$scope.membership, data:$scope.regForm, eventId:$scope.registrationForm.eventId, price: $scope.costs.total})
        .then(function(res) {

          console.log(res);
        })
        .catch(function(err) {
          console.log(err);
        })
      }
    });
  });

  $scope.newDriver = function() {
    // console.log($scope.regForm.drivers);
    // $('#driverInfoRegFormDiv').append($('#driverInfoRegFormCells'))
    $scope.regForm.drivers.push({
      name:'',
      age:'',
      rent_transponder:false,
      totalPrice:0,
      classes:[]
    })
    // console.log($scope.regForm.drivers);
    if ($scope.costs.tempMem == true ) {

      $scope.costs.total = $scope.costs.total + 5;
    }
    // $scope.costs.total +=

    // $scope.costs.entries++;
    $scope.regForm.classes[$scope.regForm.drivers.length-1] = [];
    var classes = ''


    for (var i = 0; i < $scope.registrationForm.classes.length; i++) {
      var splitName = $scope.registrationForm.classes[i].name.split(' ');
      // console.log(splitName);
      var parsedName = '';
      var hash = $scope.registrationForm.classes[i].$$hashKey;
      if (splitName.length > 1) {
        for (var j = 0; j < splitName.length; j++) {
          if (j === 0) {
            parsedName = splitName[j];
          } else {
            parsedName += '_'+splitName[j] ;
          }
        }
        // console.log(parsedName);
      };

      if ($scope.registrationForm.classes[i].$$hashKey[0] == 'o') {
        hash = $scope.registrationForm.classes[i].$$hashKey.slice(7)
      }

      classes = classes + ('<span class="classSelectSpans" id="'+$scope.regForm.drivers.length+'classSelectSpan'+hash+'" ng-click="selectClass('+$scope.regForm.drivers.length+','+hash+')"><p>'+$scope.registrationForm.classes[i].name+'</p></span>')
      // console.log(classes);

      if (i === $scope.registrationForm.classes.length-1) {

        var html = (
          '<div class="driverInfoRegFormCells" id="'+$scope.regForm.drivers.length+'DriverInfoRegFormCell"><span><p ng-if="temp.isMember==false" style="color:#154498;width:auto;padding-right:20px;">Temporary Member</p><h3>Driver '+$scope.regForm.drivers.length+'</h3></span><span class="driverNameInputSpans"><p>Name</p><input type="text" name="" value="" id="driverName'+$scope.regForm.drivers.length+'input" ng-model="regForm.drivers['+($scope.regForm.drivers.length-1)+'].name">      <p style="color:red;font-size:200%;width:20px;">*</p><div id="registryNoticeDivs"><p>You must have a working transponder and kart number to be scored. Transponders can be registered and rented at at the front counter, but doing it here will save you some time, and it is fine to use the same transponder for multiple classes.</p></div></span><div class="driverInfoContainers" id="'+$scope.regForm.drivers.length+'DriverInfoContainer"><div class="classSelectContainers" id="'+$scope.regForm.drivers.length+'classSelectContainer"><div class="classSelectContainerDivs"><span id="availableClassesHeader"><p>Available Classes</p><p style="color:red;font-size:200%;width:20px;">*</p></span><div class="selectedClasses" id="" ng-repeat="cl in registrationForm.classes['+($scope.regForm.drivers.length-1)+']"><span><p>{{cl.name}}</p></span></div><div class="classSelectDivs" id="classSelectDiv">'+classes+'</div></div><div class="selectedClassesInfoDivs" id="'+$scope.regForm.drivers.length+'selectedClassInfoDiv"><span><p>Rent Transponder</p><input type="checkbox" ng-model="regForm.drivers['+($scope.regForm.drivers.length-1)+'].rent_transponder" ng-change="changeTransponder('+($scope.regForm.drivers.length-1)+')"><p>+$'+$scope.registrationForm.trans_rental_price+'</p></span><h3>Selected Classes</h3></div></div>'
        )
        // console.log(html);
        angular.element($('#driverCardContainer')).append($compile(html)($scope))
      }
    }



    // $scope.selectedValue = function (value) {
    //     $scope.val = value;
    //     console.log($scope.val)
    // };
  }

  function init() {
    // console.log($scope.registrationForm);
    if (sessionStorage.user) {
      // console.log(sessionStorage.user);
      if (JSON.parse(JSON.parse(sessionStorage.user).membership )!= null || $scope.registrationForm.req_member == false) {
        // console.log(JSON.parse(sessionStorage.user));
        var membership = JSON.parse(JSON.parse(sessionStorage.user).membership);
        console.log(membership);
        console.log(membership.members);

        if ( membership.members.length === 1) {

          // if (membership.members[1].fname == null) {
          //   membership.members.splice(1,1)
          //   console.log(membership.members);
          // }

          console.log('single membership hit');

          // $scope.driver.name = membership.singleFName + ' ' +  membership.singleLName;
          var cl = {
            name: membership.members[0].fName + ' ' + membership.members[0].lName,
            totalPrice:0,
            classes:[]
          }
          console.log(membership.members[0].classes);
          for (var i = 0; i < membership.members[0].classes.length; i++) {
            // cl.classes = membership.members[0].classes;
            console.log(cl.classes);
            if (membership.members[0].classes.length > 1) {
              console.log('More than one class this round');
              console.log($scope.registrationForm);
              var c = {
                name:'',
                price: $scope.registrationForm.price_1,
                transponder:'',
                kart_number:''
              }



              for (var k = 0; k < $scope.registrationForm.classes.length; k++) {

                console.log($scope.registrationForm.classes[k].name);
                if ($scope.registrationForm.classes[k].name == membership.members[0].classes[i].name) {
                  // membership.members[0].classes.splice(i,1);
                    c.name = membership.members[0].classes[i].name;
                    c.transponder = membership.members[0].classes[i].transponder;
                    c.number = membership.members[0].classes[i].number
                  if (i > 0) {
                    console.log('More than 1 class');
                    cl.totalPrice += $scope.registrationForm.price_2;
                    c.price = $scope.registrationForm.price_2;
                    $scope.costs.total += $scope.registrationForm.price_2;

                  } else {
                    console.log('1 class');

                    cl.totalPrice += $scope.registrationForm.price_1;
                    c.price = $scope.registrationForm.price_1;
                    $scope.costs.total += $scope.registrationForm.price_1;

                  }
                    // for (var i = 0; i < cl.classes.length; i++) {
                      //   cl.classes[i]
                      // }
                      // console.log('match');
                  // console.log(membership.members[0]);
                  // console.log(membership.members[0].classes);
                  c.$$hashKey = $scope.registrationForm.classes[k].$$hashKey.slice(7)
                  cl.classes.push(c)
                  console.log(cl);
                  // cl.classes[cl.classes.length-1].price = $scope.registrationForm.price_1;
                  // if (cl.classes.length > 1) {
                  //   cl.classes[cl.classes.length-1].price = $scope.registrationForm.price_2;
                  // }

                  // for (var j = 0; j < $scope.registrationForm.classes.length; j++) {
                    // console.log(membership.members[0].classes[i].name);
                    // console.log($scope.registrationForm.classes[j].name);

                  // }
                  if (i == membership.members[0].classes.length-1) {
                    // console.log('hit');
                    $scope.regForm.drivers.push(cl);
                    console.log($scope.regForm.drivers);
                  }

                }
              }

            } else {
              console.log($scope.registrationForm);
              var c = {
                name:'',
                price: $scope.registrationForm.price_1,
                transponder:'',
                kart_number:''
              }

              for (var k = 0; k < $scope.registrationForm.classes.length; k++) {

                console.log(membership.members[0].classes[0]);
                if ($scope.registrationForm.classes[k].name == membership.members[0].classes[0].name) {
                  // membership.members[0].classes.splice(i,1);
                    c.name = membership.members[0].classes[0].name;
                    c.transponder = membership.members[0].classes[0].transponder;
                    c.number = membership.members[0].classes[0].number
                  if (i > 1) {
                    console.log('More than 1 class');
                    cl.totalPrice += $scope.registrationForm.price_2;
                    c.price = $scope.registrationForm.price_2;
                    $scope.costs.total += $scope.registrationForm.price_2;

                  } else {
                    console.log('1 class');

                    cl.totalPrice += $scope.registrationForm.price_1;
                    c.price = $scope.registrationForm.price_1;
                    $scope.costs.total += $scope.registrationForm.price_1;

                  }
                    // for (var i = 0; i < cl.classes.length; i++) {
                      //   cl.classes[i]
                      // }
                      // console.log('match');
                  // console.log(membership.members[0]);
                  // console.log(membership.members[0].classes);
                  c.$$hashKey = $scope.registrationForm.classes[k].$$hashKey.slice(7)
                  cl.classes.push(c)
                  // cl.classes[cl.classes.length-1].price = $scope.registrationForm.price_1;
                  // if (cl.classes.length > 1) {
                  //   cl.classes[cl.classes.length-1].price = $scope.registrationForm.price_2;
                  // }

                  // for (var j = 0; j < $scope.registrationForm.classes.length; j++) {
                    // console.log(membership.members[0].classes[i].name);
                    // console.log($scope.registrationForm.classes[j].name);

                  // }
                  if (i == membership.members[0].classes.length-1) {
                    // console.log('hit');
                    $scope.regForm.drivers.push(cl);
                    console.log($scope.regForm.drivers);
                  }

                }
              }


              // for (var j = 0; j < $scope.registrationForm.classes.length; j++) {
              //   // console.log(membership.members[0].classes[i].name);
              //   // console.log($scope.registrationForm.classes[j].name);
              //   for (var l = 0; l < cl.classes.length; l++) {
              //     if (cl.classes[l].name != $scope.registrationForm.classes[j].name) {
              //
              //     }
              //   }
              //   if (membership.members[0].classes[i].name == $scope.registrationForm.classes[j].name) {
              //     console.log('member classes');
              //     console.log(membership.members[0].classes);
              //     console.log(membership.members[0]);
              //     cl.classes.push(membership.members[0].classes[i])
              //     console.log(membership.members[0].classes[i]);
              //     cl.classes[cl.classes.length-1].$$hashKey = $scope.registrationForm.classes[j].$$hashKey.slice(7)
              //     cl.classes[cl.classes.length-1].price = $scope.registrationForm.price_1;
              //     if (cl.classes.length > 1) {
              //       cl.classes[cl.classes.length-1].price = $scope.registrationForm.price_2;
              //     }
              //   }
              //
              // }
              // console.log(cl);
              // if (i > 1) {
              //   cl.totalPrice += $scope.registrationForm.price_2;
              //   $scope.costs.total += $scope.registrationForm.price_2;
              //
              // } else {
              //
              //   cl.totalPrice += $scope.registrationForm.price_1;
              //   $scope.costs.total += $scope.registrationForm.price_1;
              //
              // }
              // if (i == membership.members[0].classes.length-1) {
              //   // console.log('hit');
              //   $scope.regForm.drivers.push(cl);
              //   console.log($scope.regForm.drivers);
              // }
            }

          }


          $scope.regForm.classes[$scope.regForm.drivers.length-1] = [];
          var classes = ''


          for (var i = 0; i < $scope.registrationForm.classes.length; i++) {
            var splitName = $scope.registrationForm.classes[i].name.split(' ');
            // console.log(splitName);
            var parsedName = '';
            if (splitName.length > 1) {
              for (var j = 0; j < splitName.length; j++) {
                if (j === 0) {
                  parsedName = splitName[j];
                } else {
                  parsedName += '_'+splitName[j] ;
                }
              }
              // console.log(parsedName);
            }

            classes = classes + ('<span class="classSelectSpans" id="'+$scope.regForm.drivers.length+'classSelectSpan'+$scope.registrationForm.classes[i].$$hashKey.slice(7)+'" ng-click="selectClass('+$scope.regForm.drivers.length+','+$scope.registrationForm.classes[i].$$hashKey.slice(7)+')"><p>'+$scope.registrationForm.classes[i].name+'</p></span>')
            // console.log(classes);
            // console.log($scope.regForm.drivers);

            if (i == $scope.registrationForm.classes.length-1) {

              // console.log('HIIITTTTTT');

              var html = (
                '<div class="driverInfoRegFormCells" id="'+$scope.regForm.drivers.length+'DriverInfoRegFormCell"><span><p ng-if="temp.isMember==false" style="color:#154498;width:auto;padding-right:20px;">Temporary Member</p><h3>Driver '+$scope.regForm.drivers.length+'</h3></span><span class="driverNameInputSpans"><p>Name</p><input type="text" name="" value="" id="driverName'+$scope.regForm.drivers.length+'input" ng-model="regForm.drivers['+($scope.regForm.drivers.length-1)+'].name">      <p style="color:red;font-size:200%;width:20px;">*</p><div id="registryNoticeDivs"><p>You must have a working transponder and kart number to be scored. Transponders can be registered and rented at at the front counter, but doing it here will save you some time, and it is fine to use the same transponder for multiple classes.</p></div></span><div class="driverInfoContainers" id="'+$scope.regForm.drivers.length+'DriverInfoContainer"><div class="classSelectContainers" id="'+$scope.regForm.drivers.length+'classSelectContainer"><div class="classSelectContainerDivs"><span id="availableClassesHeader"><p>Available Classes</p><p style="color:red;font-size:200%;width:20px;">*</p></span><div class="selectedClasses" id="" ng-repeat="cl in registrationForm.classes['+($scope.regForm.drivers.length-1)+']"><span><p>{{cl.name}}</p></span></div><div class="classSelectDivs" id="classSelectDiv">'+classes+'</div></div><div class="selectedClassesInfoDivs" id="'+$scope.regForm.drivers.length+'selectedClassInfoDiv"><span><p>Rent Transponder</p><input type="checkbox" ng-model="regForm.drivers['+($scope.regForm.drivers.length-1)+'].rent_transponder" ng-change="changeTransponder('+($scope.regForm.drivers.length-1)+')"><p>+$'+$scope.registrationForm.trans_rental_price+'</p></span><h3>Selected Classes</h3></div></div>'
              )
              // console.log(html);
              angular.element($('#driverCardContainer')).append($compile(html)($scope))
            };



          }

          for (var i = 0; i < cl.classes.length; i++) {
            console.log(cl.classes[i].$$hashKey);
            var selectedClass = '<span class="selectedClassSpans" id="'+1+'selectedClassSpan'+(i+1)+'"><button ng-click="deleteClass('+1+','+(i+1)+','+cl.classes[i].$$hashKey+')">X</button><p>'+cl.classes[i].name+'</p>   <input type="text" name="" value="" placeholder="Transponder" id="'+(cl.classes[i].$$hashKey)+'transponder{{driver.classes[j].class.$$hashKey.slice(7)}}" ng-model="regForm.drivers[0].classes['+i+'].transponder"><input type="number" class="numberInputs" name="" value="" placeholder="##" id="'+(cl.classes[i].$$hashKey)+'kartNumber{{driver.classes[j].class.$$hashKey.slice(7)}}" ng-model="regForm.drivers[0].classes['+i+'].number"><p>+ $'+cl.classes[i].price+'</p></span>';
            angular.element($('#'+1+'selectedClassInfoDiv')).append($compile(selectedClass)($scope))

            $('#1classSelectSpan' + cl.classes[i].$$hashKey).css('background','lightgreen');
            $('#1classSelectSpan' + cl.classes[i].$$hashKey).css('pointer-events','none');

          };

          // for (var i = 0; i < cl.classes.length; i++) {
          //   for (var j = 0; j < membership.classes.length; j++) {
          //     console.log(cl.classes[i].name);
          //     console.log(membership.classes[j].name);
          //   }
          // }

        } else if(membership.members.length > 1) {

          console.log(membership);

          // var selectedClass = '';

          for (var j = 0; j < membership.members.length; j++) {
            var classes = '';
            for (var i = 0; i < $scope.registrationForm.classes.length; i++) {
              // console.log(membership.classes.length);
              classes = classes + ('<span class="classSelectSpans" id="'+(j+1)+'classSelectSpan'+$scope.registrationForm.classes[i].$$hashKey.slice(7)+'" ng-click="selectClass('+($scope.regForm.drivers.length+1)+','+$scope.registrationForm.classes[i].$$hashKey.slice(7)+')"><p>'+$scope.registrationForm.classes[i].name+'</p></span>')
            }

            var selectedClasses = ''

            // console.log('hit')
            driver = membership.members[j];
            driver.name = driver.fName + ' ' + driver.lName;
            driver.totalPrice = 0;
            $scope.regForm.drivers.push(driver)
            // console.log(driver);
            for (var k = 0; k < driver.classes.length; k++) {
              console.log($scope.regForm.drivers[j].classes);
              function checkClass() {
                if (driver.classes[k] == null || driver.classes[k].name == '') {
                  $scope.regForm.drivers[j].classes.splice(k,1)
                  // k--;
                  checkClass();
                }

              }
              checkClass();

              console.log($scope.regForm.drivers[j].classes);

              for (var l = 0; l < membership.classes.length; l++) {
                if (membership.classes[l].name == $scope.regForm.drivers[j].classes[k].name) {
                  if (membership.classes[l].$$hashKey[0] == 'o') {

                    $scope.regForm.drivers[j].classes[k].$$hashKey = membership.classes[l].$$hashKey.slice(7)
                  } else {
                    $scope.regForm.drivers[j].classes[k].$$hashKey = membership.classes[l].$$hashKey
                  }
                }
              }
              console.log('#'+(j+1)+'classSelectSpan'+$scope.regForm.drivers[j].classes[k].$$hashKey);


              if (k > 0) {
                $scope.costs.total += $scope.registrationForm.price_2
                $scope.regForm.drivers[j].totalPrice += $scope.registrationForm.price_2
                $scope.regForm.drivers[j].classes[k].price = $scope.registrationForm.price_2
              } else {
                $scope.costs.total += $scope.registrationForm.price_1
                $scope.regForm.drivers[j].totalPrice += $scope.registrationForm.price_1
                $scope.regForm.drivers[j].classes[k].price = $scope.registrationForm.price_1
                console.log($scope.regForm.drivers[j]);
              }



              console.log($scope.regForm.drivers);
              // console.log(i);
              // $scope.regForm.drivers[j].classes.push(membership.members[j].classes[k])
              console.log(j, k);
              selectedClasses += '<span id="'+(j+1)+'selectedClassSpan'+(k+1)+'" class="selectedClassSpans"><button ng-click="deleteClass('+(j+1)+','+(k+1)+','+driver.classes[k].$$hashKey+')">X</button><p>'+driver.classes[k].name+'</p>   <input type="text" name="" value="" placeholder="Transponder" id="'+i+'transponder{{driver.classes[k].class.$$hashKey.slice(7)}}" ng-model="regForm.drivers['+j+'].classes['+k+'].transponder"><input type="number" class="numberInputs" name="" value="" placeholder="##" id="'+i+'kartNumber{{driver.classes[k].class.$$hashKey.slice(7)}}" ng-model="regForm.drivers['+j+'].classes['+k+'].number"><p>+'+ '$'+$scope.regForm.drivers[j].classes[k].price+'</p></span>';


            }

            console.log($scope.regForm.drivers);

            var html = (
              '<div class="driverInfoRegFormCells" id="'+$scope.regForm.drivers.length+'DriverInfoRegFormCell"><span><p ng-if="temp.isMember==false" style="color:#154498;width:auto;padding-right:20px;">Temporary Member</p><h3>Driver '+$scope.regForm.drivers.length+'</h3></span><span class="driverNameInputSpans"><p>Name</p><input type="text" name="" value="" id="driverName'+$scope.regForm.drivers.length+'input" ng-model="regForm.drivers['+($scope.regForm.drivers.length-1)+'].name">      <p style="color:red;font-size:200%;width:20px;">*</p><div id="registryNoticeDivs"><p>You must have a working transponder and kart number to be scored. Transponders can be registered and rented at at the front counter, but doing it here will save you some time, and it is fine to use the same transponder for multiple classes.</p></div></span><div class="driverInfoContainers" id="'+$scope.regForm.drivers.length+'DriverInfoContainer"><div class="classSelectContainers" id="'+$scope.regForm.drivers.length+'classSelectContainer"><div class="classSelectContainerDivs"><span id="availableClassesHeader"><p>Available Classes</p><p style="color:red;font-size:200%;width:20px;">*</p></span><div class="selectedClasses" id="" ng-repeat="cl in registrationForm.classes['+($scope.regForm.drivers.length-1)+']"><span><p>{{cl.name}}</p></span></div><div class="classSelectDivs" id="classSelectDiv">'+classes+'</div></div><div class="selectedClassesInfoDivs" id="'+$scope.regForm.drivers.length+'selectedClassInfoDiv"><span><p>Rent Transponder</p><input type="checkbox" ng-model="regForm.drivers['+($scope.regForm.drivers.length-1)+'].rent_transponder" ng-change="changeTransponder('+($scope.regForm.drivers.length-1)+')"><p>+$'+$scope.registrationForm.trans_rental_price+'</p></span><h3>Selected Classes</h3></div></div>'
            )

            angular.element($('#driverCardContainer')).append($compile(html)($scope))

            // console.log(i+1);
            // if (i != 0) {
            // } else {
            //   $scope.regForm.classes[i+1]=[];
            console.log($scope.regForm.drivers[j]);

            // }
            angular.element($('#'+(j+1)+'selectedClassInfoDiv')).append($compile(selectedClasses)($scope))


          }
        }
        for (var m = 0; m < $scope.regForm.drivers.length; m++) {
          console.log(m);

          for (var n = 0; n < $scope.regForm.drivers[m].classes.length; n++) {
            $('#'+(m+1)+'classSelectSpan'+$scope.regForm.drivers[m].classes[n].$$hashKey).css('background','lightgreen');
            $('#'+(m+1)+'classSelectSpan' + $scope.regForm.drivers[m].classes[n].$$hashKey).css('pointer-events','none');
          }
        }
        $scope.regForm.membership = membership;
        $scope.regForm.membership.isMember = true;
        $scope.costs.tempMem = false;
        console.log($scope.regForm);
      } else {
        // console.log('no membership');
        // $scope.regForm.drivers.push({
        //   name: '',
        //   age: ''
        // })
        $('#registrationForm').css('display','none');
        $scope.regForm.membership = $scope.temp;
        $scope.regForm.membership.isMember = false;
        // $scope.costs.total = $scope.costs.total + 5;
        // $scope.costs = {
        //   entries: 1,
        //   tempMem: true
        // }
      }

    } else {
      window.location.href = '#!/login'
    }
  }

  init();

  $scope.changeTransponder = function(d) {
    console.log(d);
    if ($scope.regForm.drivers[d].rent_transponder) {
      $scope.costs.total += $scope.registrationForm.trans_rental_price;
      $scope.costs.totalTransponderRentals ++;
    } else {
      $scope.costs.total -= $scope.registrationForm.trans_rental_price;
      $scope.costs.totalTransponderRentals --;

    }
  }

  $scope.selectOption = function(opt) {
    // console.log(opt);
    // console.log('hit');
    var previous = Number(opt.quantity.toString());
    var o = {
      name:opt.name,
      price:opt.price,
      quantity:null,
      previous_quantity:0
    }
    if (opt.quantity_option == true) {
      if (opt.previous_quantity == 0 || opt.previous_quantity == null) {

        // console.log('ADDING');

        o.quantity = opt.quantity;
        o.previous_quantity = previous;
        $scope.costs.total += (opt.price * opt.quantity || 1);
        $scope.regForm.options.push(o);
        // console.log($scope.regForm.options);



      } else if (opt.previous_quantity < opt.quantity) {

        o.quantity = opt.quantity;
        o.previous_quantity = previous;
        $scope.costs.total += (opt.price * opt.quantity || 1);

        for (var i = 0; i < $scope.regForm.options.length; i++) {
          // console.log($scope.regForm.options[i].name);
          // console.log(opt.name);
          if ($scope.regForm.options[i].name == opt.name) {
            // console.log('hit adding');
            $scope.regForm.options[i] = o;
          }
        }

      } else if(opt.previous_quantity > opt.quantity) {
        // console.log('SUBTRACTING');

        var difference = opt.previous_quantity - opt.quantity;

        $scope.costs.total -= (opt.price * difference);

        o.quantity = opt.quantity;
        o.previous_quantity = opt.quantity;

        for (var i = 0; i < $scope.regForm.options.length; i++) {
          if ($scope.regForm.options[i].name == opt.name) {
            $scope.regForm.options[i] = o;
          }
        }
      }

    } else if (opt.selected == true) {

      $scope.costs.total += opt.price;

      $scope.regForm.options.push(o);

    } else {


      var newOptionList = [];
      for (var i = 0; i < $scope.regForm.options.length; i++) {
        // console.log($scope.regForm.options[i].name);
        // console.log(opt.name);
        if ($scope.regForm.options[i].name != opt.name) {
          // console.log(opt.name);
          newOptionList.push($scope.regForm.options[i])
        } else {
          if (opt.quantity_option === true) {
            // console.log($scope.regForm.options);
            // console.log($scope.costs.total - (opt.price * opt.quantity || 1));
            $scope.costs.total = $scope.costs.total - (opt.price * $scope.regForm.options[i].quantity || 1)
          } else {
            $scope.costs.total = $scope.costs.total - opt.price
          }
        }
      }
      $scope.regForm.options = newOptionList;
    }
  }

  $scope.selectPass = function(p) {

    var pass = p;

    if (pass.total_price != null) {
      $scope.costs.total -= pass.total_price;
      $scope.costs.total += pass.price * pass.amnt_ordered;
      if ((pass.price * pass.amnt_ordered) > pass.total_price) {
        pass.total_price += (pass.price * pass.amnt_ordered) - pass.total_price;
      } else {
        pass.total_price -= pass.total_price - (pass.price * pass.amnt_ordered);
      }
    } else {
      // $scope.costs.total -= pass.total_price;
      $scope.costs.total += pass.price * pass.amnt_ordered;
      pass.total_price = pass.price * pass.amnt_ordered;
    }

    for (var i = 0; i < $scope.regForm.passes.length; i++) {
      if (pass.name == $scope.regForm.passes[i].name) {
        $scope.regForm.passes.splice(i,1)
      }
    }

    $scope.regForm.passes.push(pass);

  }

  $scope.selectClass = function(e, i) {
    // console.log(cl);
    // console.log(e);
    // console.log(i);
    // console.log($scope.regForm.drivers[e-1].classes);
    // $('.classSelectSpans').css('background','white');
    // console.log($scope.registrationForm);
    // console.log($scope.regForm.drivers);
    var cl;
    for (var j = 0; j < $scope.registrationForm.classes.length; j++) {

      for (var k = 0; k < $scope.regForm.drivers[e-1].classes.length; k++) {
        if ($scope.registrationForm.classes[j].$$hashKey.slice(7) != $scope.regForm.drivers[e-1].classes[k].$$hashKey.slice(7)) {

        }
      }
      if ($scope.registrationForm.classes[j].$$hashKey[0] == 'o') {
        $scope.registrationForm.classes[j].$$hashKey = $scope.registrationForm.classes[j].$$hashKey.slice(7);
      }
      // console.log($scope.registrationForm.classes[j]);
      if (i == $scope.registrationForm.classes[j].$$hashKey) {
        cl = $scope.registrationForm.classes[j];
        // cl.name = $scope.registrationForm.classes[j].name;
        cl.transponder = '';
        cl.number = '';
        cl.price = $scope.registrationForm.price_1;
        console.log(cl);

        $scope.regForm.drivers[e-1].classes.push(cl);

        if ($scope.regForm.drivers[e-1].classes.length > 1) {
          cl.price = $scope.registrationForm.price_2;
        }
        $scope.costs.total += cl.price;
        $scope.regForm.drivers[e-1].totalPrice += cl.price;
        // console.log($scope.regForm.drivers);

        // $scope.regForm.classes[e][$scope.regForm.classes[e-1].length-1] = cl;
        var selectedClass = '<span class="selectedClassSpans" id="'+e+'selectedClassSpan'+$scope.regForm.drivers[e-1].classes.length+'"><button ng-click="deleteClass('+e+','+$scope.regForm.drivers[e-1].classes.length+','+$scope.registrationForm.classes[j].$$hashKey+')">X</button><p>'+cl.name+'</p>   <input type="text" name="" value="" placeholder="Transponder" id="'+i+'transponder'+e+'" ng-model="regForm.drivers['+(e-1)+'].classes['+($scope.regForm.drivers[e-1].classes.length-1)+'].transponder"><input type="number" class="numberInputs" name="" value="" placeholder="##" id="'+i+'kartNumber'+e+'" ng-model="regForm.drivers['+(e-1)+'].classes['+($scope.regForm.drivers[e-1].classes.length-1)+'].number"><p>+ $'+cl.price+'</p></span>';
        angular.element($('#'+e+'selectedClassInfoDiv')).append($compile(selectedClass)($scope))
        // console.log('#'+e+'selectedClassInfoDiv');
        console.log($scope.regForm.drivers[e-1].classes);
        console.log(selectedClass);
      }
    }

    // console.log(selectedClass);
    if (e) {
      // if ($scope.regForm.classes[e-1].length == 0) {
      //
      //   // $scope.costs.entries++;
      //
      // }
      // var html = (
      //     '<div class="selectedClasses" id="" ng-repeat="cl in regForm.classes[0]"><span><p>{{cl.name}}</p><!-- <p>Transponder ##</p> --><input type="text" name="" value="" placeholder="Transponder" id="'+$scope.regForm.drivers.length+'transponder'+cl.$$hashKey.slice(7)+'"><input type="number" class="numberInputs" name="" value="" placeholder="##" id="'+$scope.regForm.drivers.length+'kartNumber'+cl.$$hashKey.slice(7)+'"></span></div>'
      // )
      // angular.element($('#'+e+'selectedClassInfoDiv')).append( $compile(selectedClass)($scope) )
      //
      $('#'+e+'classSelectSpan' + i).css('background','lightgreen');

      $('#'+e+'classSelectSpan' + i).css('pointer-events','none');
      // console.log($scope.regForm.drivers);
      // $scope.regForm.drivers[e-1] = {
      //   name: $('#driverName'+e+'input').val(),
      //   age: $('#driverAge'+e+'input').val()
      // }
      // angular.element($('#'+i+'classSelectContainer')).append($compile(selectedClass)($scope))
    } else {
      $('#classSelectSpan' + cl.$$hashKey.slice(7)).css('background','lightgreen');
      // angular.element($('#'+i+'classSelectContainer')).append($compile(selectedClass)($scope))
      $scope.regForm.classes[i].push(cl);
      console.log($scope.regForm.classes[i]);
      // $scope.regForm.drivers[] = {
      //   name: $scope.driver.name,
      //   age: $scope.driver.age
      // }
    }
    // if ($scope.regForm.classes.length === 0) {
    //   // $('#classSelectDiv').css('overflow','hidden')
    // }
  }

  $scope.deleteClass = function(e,i, h) {
    console.log(e, i, h);

    $('#'+e+'selectedClassInfoDiv .selectedClassSpans').remove()

    var list = $scope.regForm.drivers[e-1].classes;
    $scope.regForm.drivers[e-1].classes = [];
    for (var j = 0; j < list.length; j++) {
      if (j == i-1) {
        console.log(j, i);
        $scope.costs.total -= list[j].price;
        $scope.regForm.drivers[e-1].totalPrice -= list[j].price;
        // $('#'+e+'selectedClassSpan'+i).remove();
        $('#'+e+'classSelectSpan' + h).css('background','white');
        $('#'+e+'classSelectSpan' + h).css('pointer-events','auto');

      } else {
        // list.push($scope.regForm.drivers[e-1].classes[j])
        console.log(j);

        $scope.costs.total -= list[j].price;
        $scope.regForm.drivers[e-1].totalPrice -= list[j].price;
        $scope.selectClass(e, list[j].$$hashKey)
        // if (list.length == 1) {
        //   list[j].price == $scope.registrationForm.price_1;
        // }
      }
      if (list.length == j-1) {
        console.log('hit');
      }
    }
    // $scope.regForm.drivers[e-1].classes = list;
    console.log($scope.regForm.drivers[e-1].classes);

    // for (var k = 0; k < list.length; k++) {
    //   $scope.selectClass(e,$scope.regForm.drivers[e-1].classes[k].$$hashKey)
    // }
    // console.log($scope.registrationForm);
    // var list = [];
    // console.log($scope.regForm.drivers[e-1].classes.splice(i-1,1))
   // $scope.regForm.drivers[e-1].classes.splice(i-1,1);
   // for (var j = 0; j < $scope.regForm.drivers[e-1].classes.length; j++) {
   //   console.log($scope.regForm.drivers[e-1].classes[j]);
   //   var hash = '';
   //   var cl = $scope.regForm.drivers[e-1].classes[j];
   //   if($scope.regForm.drivers[e-1].classes[j].$$hashKey[0] == "$" || $scope.regForm.drivers[e-1].classes[j].$$hashKey[0] == "o") {
   //     hash = $scope.regForm.drivers[e-1].classes[j].$$hashKey.slice(7)
   //   } else {
   //     hash = $scope.regForm.drivers[e-1].classes[j].$$hashKey
   //   }
     // console.log($scope.regForm.drivers[e-1].classes[j].$$hashKey);
     // console.log(hash, h);
     // if (hash == h) {
     //   $scope.costs.total -= $scope.regForm.drivers[e-1].classes[j].price;
       // $scope.regForm.drivers[e-1].classes = $scope.regForm.drivers[e-1].classes.splice(j,1);
       //
       // console.log($scope.regForm.drivers[e-1].classes);
       // console.log(list.splice(j,1));
       // if (list[0].price != $scope.registrationForm.price_1) {
       //   console.log('hit');
       //   $scope.costs.total += ($scope.registrationForm.price_1 - $scope.registrationForm.price_2);
       //   list[0].price = $scope.registrationForm.price_1;
       //   console.log(list[0]);
       // }
       // $('#'+e+'selectedClassSpan'+i).remove();
       // $('#'+e+'classSelectSpan' + h).css('background','white');
       // $('#'+e+'classSelectSpan' + h).css('pointer-events','auto');
       //
       // $('#'+e+'selectedClassInfoDiv .selectedClassSpans').remove()
       // console.log('#'+e+'selectedClassInfoDiv.selectedClassSpans');
       // console.log(list.splice(j,1));
       // var count = list.length;
       // console.log(count);
       // for (var k = 0; k < count; k++) {
       //   console.log(list);
       //   $scope.costs.total -= list[k].price;
       //   if (k == count - 1) {
       //     list[k].price = $scope.registrationForm.price_1;
       //     $scope.selectClass(e, h);
       //   } else {
       //     $scope.selectClass(e, h);
       //   }
       //   console.log(list);
       // }
       // j = list.length;

     // } else {
     //   list.push(cl)
     // }
     // console.log($scope.regForm.drivers[e-1].classes);
     // console.log(list);
     // if (j == list.length - 1) {
     //   var count = list.length;
     //   console.log(count);
     //   for (var k = 0; k < count; k++) {
     //     console.log(list);
     //     $scope.costs.total -= list[k].price;
     //     if (k == count - 1) {
     //       list[k].price = $scope.registrationForm.price_1;
     //       $scope.regForm.drivers[e-1].classes = list;
     //       console.log($scope.regForm.drivers[e-1].classes);
     //       $scope.selectClass(e,hash);
     //     } else {
     //       $scope.regForm.drivers[e-1].classes = list;
     //       console.log($scope.regForm.drivers[e-1].classes);
     //
     //       $scope.selectClass(e,hash);
     //     }
     //     console.log(list);
     //   }
     // }

   // }

  }

  // $('.classSelectDivs').on('click', $scope.selectClass($(this).val()))

  $scope.checkTempMembership = function() {
    if ($scope.temp.name != "" && $scope.temp.contacts.email_1 != "") {
      $('#registrationForm').css('display','flex');
      $('#registrationForm').css('flex-direction','column');
      $('#memberOptRegFormDiv').css('display','none');
      $scope.newDriver()
    }
    if($scope.temp.name == "") {
      $('#tempMemberNameInput').css('border-color','red');
    }
    if($scope.temp.contacts.email_1 == "") {
      $('#tempMemberEmail1Input').css('border-color','red');
    }
    // console.log($scope.temp);
  }


}]);
