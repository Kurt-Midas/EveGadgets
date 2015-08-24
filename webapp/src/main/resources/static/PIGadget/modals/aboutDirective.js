app.directive('egAboutModal', ['$modal', function ($modal) {
    return {
        restrict: 'E',

        template: '<a ng-click="openAbout()">About</a>',

        replace: true,
        
        controller: function($scope){
        	$scope.openAbout = function(){
        		console.log("opening about modal");
        		var modalInstance = $modal.open({
        			animation: true,
        			templateUrl: "/PIGadget/modals/aboutTemplate.html",
        			size: 'md'
        		});
        		
        	}
        }
    };

}]);
       
