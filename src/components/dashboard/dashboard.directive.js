(function () {

    'use strict';

    angular.module('app.dashboard')
        .directive('ptrnDashboard', directiveFunction)
        .controller('DashboardController', ControllerFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'components/dashboard/dashboard.html',
            scope: {
            },
            controller: 'DashboardController',
            controllerAs: 'vm'
        };

        return directive;
    }


    // ----- ControllerFunction -----
    ControllerFunction.$inject = ['accountService', 'logger', '_'];

    /* @ngInject */
    function ControllerFunction(accountService, logger, _) {
        var vm = this;

        vm.account = null;
        vm.chartdata = null;

        activate();

        function activate() {
            return getAccount().then(function () {
                logger.log('Activated Dashboard View');
            });
        }

        function getAccount() {
            return accountService.getAccount().then(function (data) {

                // Convert assets to chart data
                var chartdata = _.map(data.assets, function (asset) {
                    return {
                        key: asset.asset_class,
                        value: asset.percent_allocation * 100
                    };
                });

                vm.account = data;
                vm.chartdata = chartdata;
                return vm.account;
            });
        }
    }

})();
