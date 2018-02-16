app.controller('membersCtrl', ['$scope', '$http', function($scope, $http) {

  $scope.member = {
    single: true,
    family: false,
    primay: {
      fName:'',
      lName:'',
      mName:'',
      bDate:'',
    },
    drivers: [{
      classes:[{
        name:'Nothing'
      }]  
    }]
  }
  
  $scope.memberForm = {
    classes:[],
    members: []
  }
  
  
  $http.post('getEventRegistration', {seriesId:1})
  .then(function(data) {
    console.log(data);
    console.log($scope.member);
    $scope.memberForm.classes = JSON.parse(data.data.registry_data).classes
    // $scope.member.drivers[0].classes[0].class = JSON.parse(data.data.registry_data).classes[0]
  })
  $http.get('getUsers')
  .then(function(data) {
    console.log(data);
  })

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
        $http.post('buyMembership', {token: result.token, member:$scope.member, user:$scope.user})
        .then(function(res) {
          if (res.data.res === 'success') {
            $scope.user = res.data.user;
            sessionStorage.user = res.data.user;
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
    // console.log($scope.member.drivers);
    
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
  
  $scope.member = {
    single: true,
    family: false
  }
  
  function init() {
    $('#singleMembershipFormDisplay').css('display','flex')
    $('#familyMembershipFormDisplay').css('display','none')
  }
  init()

  $scope.selectFormType = function(t) {

    if (t === 'single') {
      $scope.member.family = false;
      $('#singleMembershipFormDisplay').css('display','flex')
      $('#familyMembershipFormDisplay').css('display','none')
    } else if(t === 'family') {
      $scope.member.single = false;
      $('#singleMembershipFormDisplay').css('display','none')
      $('#familyMembershipFormDisplay').css('display','flex')
    }

  }
  
  $scope.addClass = function(b,c) {
    
    console.log($scope.member.drivers);
    $('#'+b+'memClassSelect'+c).css('display','flex')
    // var c = $scope.class;
    // $scope.selectedClasses.push(c)
    
  }


}]);
