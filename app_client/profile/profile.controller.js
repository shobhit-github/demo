(function () {

    angular
        .module('meanApp')
        .controller('profileCtrl', profileCtrl);

    profileCtrl.$inject = ['$location', 'meanData'];

    function profileCtrl($location, meanData) {
        var vm = this;

        vm.user = {};
        vm.roleList = ['Administrator', 'Distributor', 'Retailer', 'Customer'];
        vm.permissionList = ['Permission 1', 'Permission 2', 'Permission 3', 'Permission 4'];


        vm.checkPermission = function (value) {
            vm.access = ( this.user.permissions.indexOf(value) > -1 ) ? 'Y' : 'N';
        };

        vm.$watch(
            function() { return $filter('translate')('HELLO_WORLD'); },
            function(newval) { vm.pageTitle = newval; }
        );

        meanData.getProfile()
            .success(function (data) {
                vm.user = data;
            })
            .error(function (e) {
                console.log(e);
            });
    }

})();