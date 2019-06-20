var app = angular.module('mainApp', ['ui.router'])

app.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider

  // // HOME STATES AND NESTED VIEWS ========================================
  .state('home', {
      url: '/',
      templateUrl: '../partials/home.html'
  })
  .state('calendar', {
      url: '/calendar',
      templateUrl: '../partials/calendar.html'
  })
  .state('series', {
      url: '/series',
      templateUrl: '../partials/series.html'
  })
  .state('admin', {
      url: '/admin',
      templateUrl: '../partials/admin.html'
  })
  .state('login', {
      url: '/login',
      templateUrl: '../partials/login.html'
  })
  .state('member', {
      url: '/member',
      templateUrl: '../partials/member.html'
  })
  .state('kartOwners', {
      url: '/kartowners',
      templateUrl: '../partials/kartOwners.html'
  })
  .state('rentalkarts', {
      url: '/rentalkarts',
      templateUrl: '../partials/rentalkarts.html'
  })
  .state('registration', {
      url: '/registration',
      templateUrl: '../partials/registration.html'
  })
  .state('welcome', {
      url: '/welcomePage',
      templateUrl: '../partials/welcomePage.html'
  })
})
