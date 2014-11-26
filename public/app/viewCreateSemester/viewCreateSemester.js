'use strict';

angular.module('myAppRename.viewCreateSemester', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/viewCreateSemester', {
            templateUrl: 'app/viewCreateSemester/viewCreateSemester.html'
        });
    }])

    .controller('viewCreateSemesterCtrl', function() {
    });