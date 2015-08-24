app.directive('egPlanetHelpModal', ['$modal', function ($modal) {
    return {
        restrict: 'E',

//        templateUrl: '/PIGadget/modals/aboutTemplate.html',
        
        template: '<a ng-click="openHelp()">Help</a>',

        replace: true,
        
        controller: function($scope){
        	$scope.openHelp = function(){
        		console.log("opening help modal");
        		var modalInstance = $modal.open({
        			animation: true,
        			templateUrl: "/PIGadget/modals/planetHelpTemplate.html",
        			size: 'sm'
//        			controller: 'AboutModalInstanceController'
        		});
        		
        	}
        }
    };

}]);
       
//app.controller('AboutModalInstanceController', function($scope, $modalInstance){
//});