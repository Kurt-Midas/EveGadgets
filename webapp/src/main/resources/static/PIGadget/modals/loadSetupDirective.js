app.directive('egLoadSetupModal', ['$modal', 'planetApi', function ($modal, planetApi) {
    return {
        restrict: 'E',

        templateUrl: '/PIGadget/modals/loadSetupModal.html',

        replace: true,
        
        scope:{
        	populateSetupFromJson: "&"
        },
        controller: function($scope){
        	$scope.saveSetupJson = '';
        	
        	$scope.loadSetup = function(textblock){
        		console.log("directive, populating setup with : " + textblock);
        		$scope.populateSetupFromJson({recoveryString: textblock});
        	}
        	
        	$scope.open = function(){
        		console.log("opening load modal");
        		var modalInstance = $modal.open({
        			animation: true,
        			templateUrl: "/PIGadget/modals/loadSetupModalTemplate.html",
        			size: 'md',
        			controller: 'LoadSetupModalInstanceController'
        		});
        		
        		modalInstance.result.then(function(textblock){
        			console.log("load modal exited with reply: " + textblock);
        			if(textblock != null){
        				//probably should have some kind of verification around here
        				$scope.loadSetup(textblock);
        			}
        		})
        	}
        }
    };

}]);
       
app.controller('LoadSetupModalInstanceController', function($scope, $modalInstance){
	$scope.textblock = '';
	
	$scope.submitTextBlock = function(){
		console.log("Submitted Text Block to Load Method: " + $scope.textblock);
		$modalInstance.close($scope.textblock);
	}
});     	
/*        	$scope.open = function(){
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
});*/