var app = angular.module('util', []);

app.directive('myAccordion', function(){
	return{
		restrict: 'AE',
		replace: true,
		templateUrl: '/templates/accordionStructure.html',
		transclude: true,
		scope: {
			title: '@'
		},
		controller: function($scope, $element, $attrs){
			$scope.showChild = '';
			
			$scope.toggle = function(){
				console.log("Toggling in Directive, " + $scope.showChild);
				if($scope.showChild){
					$scope.showChild = false;
				}
				else{
					$scope.showChild = true;
				}
			};
		}
	};
});

app.directive('focusMe', function($timeout) {
	  return {
	    scope: { trigger: '=focusMe' },
	    link: function(scope, element) {
	      scope.$watch('trigger', function(value) {
	        if(value === true) { 
	          //console.log('trigger',value);
	          //$timeout(function() {
	            element[0].focus();
	            scope.trigger = false;
	          //});
	        }
	      });
	    }
	  };
	});
