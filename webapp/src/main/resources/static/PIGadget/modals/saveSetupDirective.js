app.directive('egSaveSetupModal', ['$modal', 'planetApi', function ($modal, planetApi) {
    return {
        restrict: 'E',

        template: '<a ng-click="open()">Save Setup</a>',

        replace: true,
        
        scope:{
        	/*factory: '=',
        	factoryList: '=',
        	p: "=",
        	typeList: "=",
        	deleteThisFactory: "&"*/
        	generateSaveSetupJson: "&"
        },
        controller: function($scope){
        	$scope.saveSetupJson = '';
        	
        	$scope.getTextBlock = function(){
        		console.log("directive, generating json");
        		return $scope.generateSaveSetupJson();
        	}
        	
        	$scope.getUrl = function(){
        		$scope.saveSetupJson = $scope.generateSaveSetupJson();
        		console.log($scope.saveSetupJson);
        		var url = planetApi.saveSetup($scope.saveSetupJson());
        		console.log(url);
        		return url;
        	}
        	
        	$scope.open = function(){
        		console.log("Trying to open choice modal");
        		$scope.saveSetupJson = '';
        		var modalInstance = $modal.open({
        			animation: true,
        			templateUrl: "/PIGadget/modals/saveSetupModalTemplate.html",
        			size: 'lg',
        			controller: 'SaveSetupModalInstanceController'
        		});
        		
        		modalInstance.result.then(function(choice){
        			if(choice == "getText"){
        				console.log("caught request for text block");
        				$modal.open({
        					animation: true,
        					templateUrl: "/PIGadget/modals/saveSetupAsJsonResultModal.html",
        					size: 'lg',
        					controller: 'SaveSetupJsonController',
        					resolve: {
        						display: function(){
        							return $scope.getTextBlock();
        						}
        					}
        				});
        			}
        			else if(choice == "getUrl"){
        				console.log("caught request for url");
        				$modal.open({
        					animation: true,
        					templateUrl: "/PIGadget/modals/saveSetupAsUrlResultModal.html",
        					size: 'lg',
        					controller: 'SaveSetupUrlController',
        					resolve: {
        						display: function(){
        							return $scope.getTextBlock();
        						}
        					}        					
//        						display: function(){
//        							return "INCOMPLETE IMPLEMENTATION AT SAVE_SETUP_MODAL_DIRECTIVE.JS";
//        							var urlDisplay = planetApi.saveSetup($scope.getTextBlock());
//        							console.log("urlDisplay is : " + urlDisplay);
//        							return urlDisplay;
        							
        							
//        						}
        				});
        			}
        		});
        	}
        	
        	
        	
        }
    };

}]);

app.controller('SaveSetupModalInstanceController', function($scope, $modalInstance){
	$scope.getText = function(){
		console.log("Requested Text Block");
		$modalInstance.close("getText");
	}
	$scope.getUrl = function(){
		console.log("Requested URL");
		$modalInstance.close("getUrl");
	}
});

app.controller('SaveSetupJsonController', function($scope, $modalInstance, display){
	$scope.display = display;
});

app.controller('SaveSetupUrlController', function($scope, $modalInstance, planetApi, display){
	$scope.display = '';
	$scope.url = "http://EveGadgets.com/#/pi";
//	$scope.url = "http://localhost:8081/#/pi";
	
	planetApi.saveSetup(display)
	.then(function(response){
		var data = response.data;
		console.log("call succeeded? " + data + ": " + angular.toJson(data) + ", Key: " + data['KEY']);
		$scope.display = data['KEY'];
	}, function(reason){
		console.error("call failed? " + reason);
	});

});