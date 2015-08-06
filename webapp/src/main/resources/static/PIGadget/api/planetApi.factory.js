/*var app = angular.module('planetApi', []);

app.directive('myAccordion', function(){
*/

app.factory('planetApi', ['$http', function($http){
	
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
			$http(getData)
			.success(function(data){
				console.log("Success: " + angular.toJson(data));
				if(data['KEY']){
					console.log("Returning key: " + data['KEY']);
					return data['KEY'];
				}
				else if(data['ERROR']){
					console.error("Error thrown: " + data['ERROR']);
					return null;
				}
			})
			.error(function(data,status,headers,config){
				console.error("saveSetup failed with info: " + angular.toJson(data) + "\n" + status + "\n" 
					+ headers + "\n" + angular.toJson(config));
				return null;
			})
		},
		getSetup: function(key){
			var getData = {
				method: 'POST',
				url: '/persist/getSetup',
				data: key
				/*data: {
					id: key
				}*/
			};
			$http(getData)
			.success(function(data){
				if(data['setup']) {
					return data['setup'];
				}
				else(data['ERROR']) 
				{
					console.error("Error thrown: " + data['ERROR']);
				}
			})
			.error(function(data,status,headers,config){
				console.error("getSetup failed with info: " + data + " " + status + " " 
					+ headers + " " + config);
				return null;
			})
		}
	};
}]);

/*var getData = {method: 'GET',
url: '/priceAPI/mock',
params: {
	typeList: types
}};
console.log("Making call: " + getData);
$http(getData)
.success(function(data){
	$scope.marketPrices = data;
	console.log("Call successful with response: " + $scope.marketPrices);
	$scope.updateTotalImportExportCost();
})
.error(function(data, status, headers, config){
	console.error("populatePriceMapFromStatic failed with info: " + data + " " + status + " " 
			+ headers + " " + config); 
});
*/