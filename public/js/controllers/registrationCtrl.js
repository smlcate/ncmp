app.controller('registrationCtrl', ['$scope', '$http', '$compile', function($scope, $http, $compile) {

  $scope.regForm = {
    drivers: [],
    classes: [[]],
    options: [],
    tempMembers: [],
    membership: null
  }
  $scope.driver = {
    name:'',
    age:''
  };
  $scope.temp = {
    name:'',
    address:'',
    city:'',
    state:'',
    zip_code:'',
  }
  
  $scope.costs = {
    entries: 1,
    total: $scope.registrationForm.price,
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
        // Send the token to your server
        for (var j = 0; j < $scope.regForm.drivers.length; j++) {
          for (var i = 0; i < $scope.regForm.classes[j].length; i++) {
            var cl = {
              name:$scope.regForm.classes[j][i].name,
              transponder:'',
              number:$('#kartNumber'+$scope.regForm.classes[j][i].$$hashKey.slice(7)).val()
            }
            if (j > 0) {
              
              cl.number = $('#'+(j+1)+'kartNumber'+$scope.regForm.classes[j][i].$$hashKey.slice(7)).val()
              cl.transponder = $('#'+(j+1)+'transponder'+$scope.regForm.classes[j][i].$$hashKey.slice(7)).val()
              // if ($('#'+j+'transponder'+$scope.regForm.classes[j][i].$$hashKey.slice(7)).val().length > 0) {
              //   cl.transponder = $('#'+j+'transponder'+$scope.regForm.classes[j][i].$$hashKey.slice(7)).val();
              // }
            } else if($('#transponder'+$scope.regForm.classes[j][i].$$hashKey.slice(7)).val().length > 0) {
              cl.transponder = $('#transponder'+$scope.regForm.classes[j][i].$$hashKey.slice(7)).val();
            }
            console.log(cl);
            $scope.regForm.classes[j][i] = cl;
          }
        }
        // for (var i = 0; i < $scope.registrationForm.options.length; i++) {
        //   if ($('#option'+$scope.registrationForm.options[i].$$hashKey.slice(7)).is(':checked')) {
        //     var opt = {
        //       name:$scope.registrationForm.options[i].name,
        //       quantity:null,
        //     }
        //     if ($scope.registrationForm.options[i].quantity_option === true) {
        //       opt.quantity = $('#optionQuantityLimit'+$scope.registrationForm.options[i].$$hashKey.slice(7)).val();
        //     }
        //     $scope.regForm.options.push(opt)
        //   }
        // }
        // $scope.regForm.drivers.push({
        //   name: $scope.driver.name,
        //   age: $scope.driver.age
        // })
        
        $scope.regForm.membership = {
          name: $scope.temp.name,
          address: $scope.temp.address,
          city: $scope.temp.city,
          state: $scope.temp.state,
          zip_code: $scope.temp.zip_code
        };
        
        console.log($scope.regForm);
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
    // $('#driverInfoRegFormDiv').append($('#driverInfoRegFormCells'))
    $scope.regForm.drivers.push({
      name:'',
      age:'' 
    })
    
    if ($scope.costs.tempMem == true) {
      
      $scope.costs.total = $scope.costs.total + 5;
    }
    // $scope.costs.total = $scope.costs.total + $scope.registrationForm.price

    // $scope.costs.entries++;
    $scope.regForm.classes[$scope.regForm.drivers.length-1] = [];
    var classes = ''
    
    for (var i = 0; i < $scope.registrationForm.classes.length; i++) {
      classes = classes + ('<span class="classSelectSpans" id="'+$scope.regForm.drivers.length+'classSelectSpan'+$scope.registrationForm.classes[i].$$hashKey.slice(7)+'" ng-repeat="cl in registrationForm.classes" ng-click="selectClass(cl,'+$scope.regForm.drivers.length+')"><p>'+$scope.registrationForm.classes[i].name+'</p></span>')
    }
    var html = (
      '<div class="driverInfoRegFormCells"><span><p>Driver Name</p><input type="text" name="" value="" id="driverName'+$scope.regForm.drivers.length+'input"><p>Age</p><input type="number" class="numberInputs" name="" value="" id="driverAge'+$scope.regForm.drivers.length+'input"></span><div id="'+$scope.regForm.drivers.length+'classSelectContainer"><p>Select Class</p><div class="selectedClasses" id=""ng-repeat="cl in regForm.classes['+($scope.regForm.drivers.length-1)+']"><span><p>{{cl.name}}</p>   <input type="text" name="" value="" placeholder="Transponder" id="'+$scope.regForm.drivers.length+'transponder{{cl.$$hashKey.slice(7)}}"><input type="number" class="numberInputs" name="" value="" placeholder="##" id="'+$scope.regForm.drivers.length+'kartNumber{{cl.$$hashKey.slice(7)}}"></span></div><div class="classSelectDivs" id="classSelectDiv"><span><p>No Class Selected</p></span>'+classes+'</div></div>'
    )
    
    angular.element($('#driverInfoRegFormDiv')).append($compile(html)($scope))

    // $scope.selectedValue = function (value) {
    //     $scope.val = value;
    //     console.log($scope.val)
    // };
  }
  
  function init() {
    console.log($scope.registrationForm);
    if (sessionStorage.user) {
      // console.log(sessionStorage.user);
      if (JSON.parse(JSON.parse(sessionStorage.user).membership )!= null) {
        console.log(JSON.parse(sessionStorage.user));
        var membership = JSON.parse(JSON.parse(sessionStorage.user).membership);
        if (membership.single === true) {
          $scope.driver.name = membership.singleFName + ' ' +  membership.singleLName;
          
          $scope.regForm.drivers.push({
            name: $scope.driver.name,
            age: $scope.driver.age
          })
        } else if(membership.family === true) {
          
        }
        $scope.regForm.membership = membership;
        $scope.regForm.membership.isMember = true;
        $scope.costs.tempMem = false;
        console.log($scope.regForm);
      } else {
        $scope.regForm.drivers.push({
          name: '',
          age: ''
        })
        $scope.regForm.membership = $scope.temp;
        $scope.regForm.membership.isMember = false;
        $scope.costs.total = $scope.costs.total + 5;
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
  
  $scope.selectOption = function(opt) {
    console.log(opt);
    console.log('hit');
    if (opt.selected == true) {
      var o = {
        name:opt.name,
        price:opt.price,
        quantity:null,
      }
      if (opt.quantity_option === true) {
        o.quantity = opt.quantity;
        $scope.costs.total = $scope.costs.total + (opt.price * opt.quantity)
      } else {
        $scope.costs.total = $scope.costs.total + opt.price
      }
      $scope.regForm.options.push(o)
    } else {
      
      
      var newOptionList = [];
      for (var i = 0; i < $scope.regForm.options.length; i++) {
        console.log($scope.regForm.options[i].name);
        // console.log(opt.name);
        if ($scope.regForm.options[i].name != opt.name) {
          console.log(opt.name);
          newOptionList.push($scope.regForm.options[i])
        } else {
          if (opt.quantity_option === true) {
            console.log($scope.costs.total - (opt.price * opt.quantity));
            $scope.costs.total = $scope.costs.total - (opt.price * $scope.regForm.options[i].quantity)
          } else {
            $scope.costs.total = $scope.costs.total - opt.price
          }
        }
      }
      $scope.regForm.options = newOptionList;
    }
  }
  
  $scope.selectClass = function(cl, e) {
    console.log(cl, e);
    // $('.classSelectSpans').css('background','white');
    
    $scope.costs.entries++;
    $scope.costs.total = $scope.costs.total + $scope.registrationForm.price
    
    if (e) {
      // var html = (
      //     '<div class="selectedClasses" id="" ng-repeat="cl in regForm.classes[0]"><span><p>{{cl.name}}</p><!-- <p>Transponder ##</p> --><input type="text" name="" value="" placeholder="Transponder" id="'+$scope.regForm.drivers.length+'transponder'+cl.$$hashKey.slice(7)+'"><input type="number" class="numberInputs" name="" value="" placeholder="##" id="'+$scope.regForm.drivers.length+'kartNumber'+cl.$$hashKey.slice(7)+'"></span></div>'
      // )
      // angular.element($('#'+e+'classSelectContainer')).append( $compile(html)($scope) )
      // 
      $('#'+$scope.regForm.drivers.length+'classSelectSpan' + cl.$$hashKey.slice(7)).css('background','lightgreen');
      $scope.regForm.classes[e-1].push(cl);
      $scope.regForm.drivers[e-1] = {
        name: $('#driverName'+e+'input').val(),
        age: $('#driverAge'+e+'input').val()
      }  
    } else {
      $('#classSelectSpan' + cl.$$hashKey.slice(7)).css('background','lightgreen');
      $('#classSelectContainer').append($('#classSelectDiv'));
      $scope.regForm.classes[0].push(cl);
      $scope.regForm.drivers[0] = {
        name: $scope.driver.name,
        age: $scope.driver.age
      }
    }
    // if ($scope.regForm.classes.length === 0) {
    //   // $('#classSelectDiv').css('overflow','hidden')
    // }
  }

  // $('.classSelectDivs').on('click', $scope.selectClass($(this).val()))


}]);
