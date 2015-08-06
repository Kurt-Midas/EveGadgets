app.directive('egSaveSetupModal', ['$modal', 'planetApi', function ($modal, planetApi) {
    return {
        restrict: 'E',

        templateUrl: '/PIGadget/modals/saveSetupModalTemplate.html',

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
        			templateUrl: 'saveSetupModal.html',
        			size: 'lg',
        			controller: 'SaveSetupModalInstanceController'
        		});
        		
        		modalInstance.result.then(function(choice){
        			if(choice == "getText"){
        				console.log("caught request for text block");
        				$modal.open({
        					animation: true,
        					template: "<div class='modal-body'>{{display}}: getText stuff here'</div>",
        					size: 'lg',
        					controller: 'SaveSetupResultController',
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
        					template: "<div class='modal-body'>{{display}}: getUrl stuff here'</div>",
        					size: 'lg',
        					controller: 'SaveSetupResultController',
        					resolve: {
        						display: function(){
//        							return "INCOMPLETE IMPLEMENTATION AT SAVE_SETUP_MODAL_DIRECTIVE.JS";
        							return planetApi.saveSetup($scope.getTextBlock());
        						}
        					}
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

app.controller('SaveSetupResultController', function($scope, $modalInstance, display){
	$scope.display = display;
});