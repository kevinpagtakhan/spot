angular.module('app', ['ui.router'])
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', router])
  .directive('navigationBar', navigationBar)
  .directive('footer', footer)

function router($stateProvider, $urlRouterProvider) {

  $stateProvider
    // .state('home', {
    //   url: '/',
    //   templateUrl: 'templates/home.html'
    // })
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginController as lc'
    })
    .state('logout', {
      url: '/logout',
      templateUrl: 'templates/logout.html',
      controller: 'LogoutController as lc'
    })
    .state('home', {
      url: '/',
      templateUrl: 'templates/register.html',
      controller: 'RegisterController as rc'
    })
    .state('profile', {
      url: '/profile',
      templateUrl: 'templates/profile/profile.html',
      controller: 'ProfileController as pc'
    })
    .state('profileEdit', {
      url: '/profile/edit',
      templateUrl: 'templates/profile/profileEdit.html',
      controller: 'ProfileEditController as pec'
    })
    .state('profileShow', {
      url: '/profile/:id',
      templateUrl: 'templates/profile/profileShow.html',
      controller: 'ProfileShowController as psc'
    })
    .state('spaces', {
      url: '/spaces',
      templateUrl: 'templates/spaces/spaces.html',
      controller: 'SpacesController as sc'
    })
    .state('spacesNew', {
      url: '/spaces/new',
      templateUrl: 'templates/spaces/spacesNew.html',
      controller: 'SpacesNewController as snc'
    })
    .state('spacesShow', {
      url: '/spaces/:id',
      templateUrl: 'templates/spaces/spacesShow.html',
      controller: 'SpacesShowController as ssc'
    })
    .state('search', {
      url: '/search',
      templateUrl: 'templates/search/search.html',
      controller: 'SearchController as sc'
    })
    .state('reservations', {
      url: '/reservations',
      templateUrl: 'templates/reservations/reservations.html',
      controller: 'ReservationsController as rc'
    })
    .state('reservationsShow', {
      url: '/reservations/:id',
      templateUrl: 'templates/reservations/reservationsShow.html',
      controller: 'ReservationsShowController as rsc'
    })

  $urlRouterProvider.otherwise('/');
}

function navigationBar(){
  return{
    restrict: 'E',
    templateUrl: 'partials/nav.html'
  }
}

function footer(){
  return{
    restrict: 'E',
    templateUrl: 'partials/footer.html'
  }
}
