(function () {

    angular
        .module('meanApp')
        .controller('profileCtrl', profileCtrl);

    profileCtrl.$inject = ['$location', 'meanData', '$rootScope', '$filter'];

    function profileCtrl($location, meanData, $rootScope, $filter) {
        var vm = this;

        vm.user = {};
        vm.permissionList = []; vm.roleList = [];
        vm.roleLocalList = ['ADMINISTRATOR', 'DISTRIBUTOR', 'RETAILER', 'CUSTOMER'];


        vm.checkPermission = function (value) {
            vm.access = ( this.user.permissions.indexOf(value) > -1 ) ? 'Y' : 'N';
        };

        vm.roleLocalList.forEach(
            function (value, index) {
                vm.permissionList.push($filter('translate')('PERMISSION') + (index+1));
                vm.roleList.push($filter('translate')(value));
            }
        );

        $rootScope.$on('$translateChangeSuccess', function () {
            vm.permissionList = []; vm.roleList = [];
            vm.roleLocalList.forEach(
                function (value, index) {
                    vm.permissionList.push($filter('translate')('PERMISSION') + (index+1));
                    vm.roleList.push($filter('translate')(value));
                }
            )
        });

        meanData.getProfile()
            .success(function (data) {
                vm.user = data;
            })
            .error(function (e) {
                console.log(e);
            });
    }

})();