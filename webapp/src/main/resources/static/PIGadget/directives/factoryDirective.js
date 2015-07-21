app.directive('egFactoryManager', function () {
    return {
        restrict: 'E',

        templateUrl: '/PIGadget/directives/factoryTemplate.html',

        replace: true,
        
        scope:{
        	factory: '=',
        	factoryList: '=',
        	p: "=",
        	typeList: "=",
        	deleteThisFactory: "&"
        },
        controller: function($scope){
        	$scope.removeThis = function(){
        		$scope.deleteThisFactory({e: $scope.factory, c: $scope.factoryList});
        	};
        }
    };

});