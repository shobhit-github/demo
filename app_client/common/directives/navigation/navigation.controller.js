(function () {

    angular
        .module('meanApp')
        .controller('navigationCtrl', navigationCtrl);

    navigationCtrl.$inject = ['$location', 'authentication', 'LocaleService'];

    function navigationCtrl($location, authentication, LocaleService) {
        var vm = this;

        vm.isLoggedIn = authentication.isLoggedIn();
        vm.currentUser = authentication.currentUser();


        vm.currentLocaleDisplayName = LocaleService.getLocaleDisplayName();
        vm.localesDisplayNames = LocaleService.getLocalesDisplayNames();



        vm.changeLanguage = function (locale) {
            LocaleService.setLocaleByDisplayName(locale);
        };

    }

})();