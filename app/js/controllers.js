'use strict';
angular
    .module('app', ['angularFileUpload'])
    .controller('AppController', ['$scope', 'FileUploader', function ($scope, FileUploader) {
        var uploader = $scope.uploader = new FileUploader({
            url: 'http://localhost:3000/upload'
        });
    }]);