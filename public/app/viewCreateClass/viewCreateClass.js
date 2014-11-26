'use strict';

angular.module('myAppRename.viewCreateClass', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/viewCreateClass', {
            templateUrl: 'app/viewCreateClass/viewCreateClass.html'
        });
    }])

    .controller('viewCreateClassCtrl', function() {
    });