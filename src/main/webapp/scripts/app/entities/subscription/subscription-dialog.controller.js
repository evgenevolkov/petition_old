'use strict';

angular.module('petitionApp').controller('SubscriptionDialogController',
    ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'Subscription', 'User', 'Petition',
        function($scope, $stateParams, $uibModalInstance, entity, Subscription, User, Petition) {

        $scope.subscription = entity;
        $scope.users = User.query();
        $scope.petitions = Petition.query();
        $scope.load = function(id) {
            Subscription.get({id : id}, function(result) {
                $scope.subscription = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('petitionApp:subscriptionUpdate', result);
            $uibModalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            if ($scope.subscription.id != null) {
                Subscription.update($scope.subscription, onSaveSuccess, onSaveError);
            } else {
                Subscription.save($scope.subscription, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.datePickerForSubscriptionDateTime = {};

        $scope.datePickerForSubscriptionDateTime.status = {
            opened: false
        };

        $scope.datePickerForSubscriptionDateTimeOpen = function($event) {
            $scope.datePickerForSubscriptionDateTime.status.opened = true;
        };
}]);
