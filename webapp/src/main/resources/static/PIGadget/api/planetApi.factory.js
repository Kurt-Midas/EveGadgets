/*var app = angular.module('planetApi', []);

app.directive('myAccordion', function(){
*/

app.factory('planetApi', ['$http', '$q', function($http, $q){
	
	return{
		saveSetup: function(setup){
			console.log("Saving setup with: " + angular.toJson(setup));
			var getData = {
				method: 'POST',
				url: '/persist/saveSetup',
				contentType : 'application/json;charset=UTF-8',
				data: setup
			};
			console.log("Making call with : " + angular.toJson(setup) + ", " + setup);
			return $http(getData);
		},
		getSetup: function(key){
			console.log("inside getSetup");
			var getData = {
				method: 'POST',
				url: '/persist/getSetup',
				data: key
				/*data: {
					id: key
				}*/
			};
			console.log("make call with: " + angular.toJson(getData));
			return $http(getData);
		}
	};
}]);
