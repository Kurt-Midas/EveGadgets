app.directive('egConfirmReset', ['$modal', function ($modal, planetApi) {
    return {
        restrict: 'E',

        template: '<a ng-click="open()">Reset All Planets</a>',

        replace: true,
        
        scope:{
        	reset: "&"
        },
        controller: function($scope){
        	$scope.resetPlanets = function(){
        		console.log("directive, resetting");
        		$scope.reset();
        	}
        	
        	$scope.open = function(){
        		var modalInstance = $modal.open({
        			animation: true,
        			templateUrl: "/PIGadget/modals/confirmResetModalTemplate.html",
        			size: 'sm',
        			controller: 'confirmResetModalController'
        		});
        		
        		modalInstance.result.then(function(confirm){
        			console.log("confirming if this isn't blank: " + confirm);
        			if(confirm){
	    				$scope.resetPlanets();
	    			}
	    		})
        		
        	}
        	
        	
        }
    };

}]);
       
app.controller('confirmResetModalController', function($scope, $modalInstance){
	
	$scope.decide = function(decision){
		console.log("returning: " + decision);
		$modalInstance.close(decision);
	}
});    