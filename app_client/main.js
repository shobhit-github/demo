(function () {

  angular.module('meanApp', [
      'ngRoute',
      'ngCookies',
      'pascalprecht.translate',// angular-translate
      'tmh.dynamicLocale'// angular-dynamic-locale
  ])

  .constant('LOCALES', {
      'locales': {
          'hi_IN': 'हिंदी',
          'en_US': 'English'
      },
      'preferredLocale': 'en_US'
  });



  function config ($routeProvider, $locationProvider, $translateProvider, tmhDynamicLocaleProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'home/home.view.html',
        controller: 'homeCtrl',
        controllerAs: 'vm'
      })
      .when('/register', {
        templateUrl: '/auth/register/register.view.html',
        controller: 'registerCtrl',
        controllerAs: 'vm'
      })
      .when('/login', {
        templateUrl: '/auth/login/login.view.html',
        controller: 'loginCtrl',
        controllerAs: 'vm'
      })
      .when('/profile', {
        templateUrl: '/profile/profile.view.html',
        controller: 'profileCtrl',
        controllerAs: 'vm'
      })
      .otherwise({redirectTo: '/'});

    // use the HTML5 History API
    $locationProvider.html5Mode(true);

    // transaltion functionality
      $translateProvider.useMissingTranslationHandlerLog();
      $translateProvider.useStaticFilesLoader({
          prefix: '/lang/',// path to translations files
          suffix: '.json'// suffix, currently- extension of the translations
      });
      $translateProvider.preferredLanguage('en_US');// is applied on first load
      $translateProvider.useLocalStorage();// saves selected language to localStorage
      tmhDynamicLocaleProvider.localeLocationPattern('https://cdnjs.cloudflare.com/ajax/libs/angular-i18n/1.6.7/angular-locale_{{locale}}.min.js');

  }

  function run($rootScope, $location, authentication) {
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
      if ($location.path() === '/profile' && !authentication.isLoggedIn()) {
        $location.path('/');
      }
    });
  }
  
  angular
    .module('meanApp')
    .config(['$routeProvider', '$locationProvider', '$translateProvider', 'tmhDynamicLocaleProvider', config])
    .run(['$rootScope', '$location', 'authentication', run]);

})();