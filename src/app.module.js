(function() {
    'use strict';

    angular.module('app', [
        // Common (everybody has access to these)
        'app.core',

        // Features
        'app.topnav',
        'app.dashboard',
        'app.profile'
    ]);
})();
