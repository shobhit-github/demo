(function () {

    angular
        .module('meanApp')
        .controller('registerCtrl', registerCtrl);

    registerCtrl.$inject = ['$location', 'authentication'];

    function registerCtrl($location, authentication) {
        var vm = this;

        vm.validationError = [];
        vm.roleList = ['Administrator', 'Distributor', 'Retailer', 'Customer'];
        vm.permissionList = ['Permission 1', 'Permission 2', 'Permission 3', 'Permission 4'];
        vm.credentials = { name: null, email: null, password: null, role: null, permissions: [] };


        var validateEmail = function (mail)
        {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
                return (true)
            }
            return (false)
        };

        vm.reSettingPermissionList = function (perList) {
            var newPer = [];
            perList.forEach(function (value, index) {
                if (value) { newPer.push(index) }
            });

            vm.credentials.permissions = newPer;
            return false;
        };



        vm.permissionChange = function (value) {
            if (!vm.credentials.permissions[value]) {
                 delete vm.credentials.permissions[value];
            }
        };


        vm.validate = function () {

            vm.validationError['name'] = (!vm.credentials['name']) ? { type: 'required' } : false;
            vm.validationError['email'] =  (!vm.credentials['email']) ? { type: 'required' } : ( !validateEmail(vm.credentials['email']) ) ? { type: 'email'} : false;
            vm.validationError['password'] = (!vm.credentials['password']) ? { type: 'required' } : false;
            vm.validationError['permissions'] = (!vm.credentials['permissions'].length) ? { type: 'required' } : vm.reSettingPermissionList(vm.credentials['permissions']);
            vm.validationError['role'] = (!vm.credentials['role']) ? { type: 'required' } : false;

            return (vm.validationError['name'] || vm.validationError['email'] || vm.validationError['password'] || vm.validationError['permissions']);
        };
        
        vm.onSubmit = function () {

            if ( vm.validate() ) {
                return false;
            }

            authentication
                .register(vm.credentials)
                .error(function (err) {
                    alert(err);
                })
                .then(function () {
                    $location.path('login');
                });
        };


    }

})();