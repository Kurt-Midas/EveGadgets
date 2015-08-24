var app = angular.module('scrapGadget', []);

app.controller('scrapGadgetController', function($scope, $http, $filter){
	$scope.textScrape = '';
	$scope.recipeList = [];
	$scope.details = {};
	$scope.prices = {};
	$scope.reprocessPercentage = 52;
	
	$scope.globalRecovered = []; 
	$scope.totalReprocessedProfit = 0;	
//	{item.price, item.recipe{component.quantity, component.recovered, component.price}}
	
	$scope.executeInProgress = false;
	
	$scope.execute = function(){
		$scope.executeInProgress = true;
		/*
		 * 1. Call $http to get response
		 * 2. Verify
		 * 3. Call a function which iterates over items and returns items 
		 * 		with expected reprocessing output and cumulative cost of those items and total
		 */
		var mockCall = 
		{"items":[{"name":"Medium Hull Repairer I","quantity":5},
		          {"name":"Proton M","quantity":1000},
		          {"name":"Medium 'Integrative' Hull Repair Unit","quantity":5}]};
		var getData = {
			method: 'POST',
			url: '/reprocess/',
			contentType : 'application/json;charset=UTF-8',
			data: mockCall
		};
//		console.log("Making call with : " + angular.toJson(getData));
		$http(getData)
		.success(function(data){
			$scope.recipeList = data.RecipeList;
			if(!$scope.recipeList){
				console.error("Recipes not found!");
			}
			$scope.details = data.ItemDetails;
			if(!$scope.details){
				console.error("Details not found!");
			}
			$scope.prices = data.PriceMap;
			if(!$scope.prices){
				console.error("Prices not found!");
			}
			console.log("Everything exists. Unfinished, do more stuff here");
			constructGlobalRecovered();
			constructRecovered();	
		});
		
		
		
		$scope.executeInProgress = false;
	}//execute function
	
	//constructGlobalRecovered
	//constructRecovered
	/*
	 * iterate over items. Iterate over components. 
	 * For each component: 1. Add to global. 
	 * 2. Calculate amount at that percentage. (goes in item.recoveredQuantity) 
	 * 3. Calculate price (goes in item.recoveredPrice)
	 * 4. Add price to item price (r.recoveredPrice)
	 * At end, iterate over global
	 */
	
	function constructGlobalRecovered(){
		console.log("inside constructGlobalRecovered");
		var localGlobal = [];
		angular.forEach($scope.recipeList, function(item){
			
			angular.forEach(item.recipe, function(component){
				var index = findIndexOfId(localGlobal, component.id);
				if(index != -1){
					localGlobal[index].quantity	+= component.quantity;
				} else{
					localGlobal.push({id: component.id, quantity: component.quantity});
				}
			});
		});
		var total = 0;
		angular.forEach(localGlobal, function(item){
			var id_l = item.id;
			var quantity_l = item.quantity;
			var recovered_l = Math.floor(item.quantity * $scope.reprocessPercentage/100);
			var price_l = recovered_l * $scope.prices[id_l];
			item = {id: id_l, quantity: quantity_l, recovered: recovered_l, price: price_l};
			total += price_l;
		})
		$scope.globalRecovered = localGlobal;
		$scope.totalReprocessedProfit = total;
		console.log("globalRecovered has elements: " + $scope.globalRecovered.length);
		console.log("totalReprocessedProfit: " + $scope.totalReprocessedProfit);
	}

	
	function constructRecovered(){
		console.log("inside constructRecovered");
		angular.forEach($scope.recipeList, function(item){
			item.price = 0;
			angular.forEach(item.recipe, function(component){
				component.recovered = Math.floor(component.quantity * $scope.reprocessPercentage/100);
				component.price = component.recovered * $scope.prices[component.id];
				item.price += component.price;
			});
			item.jitaPercent = item.price / $scope.prices[item.id];
			console.log("constructed recovered: " + angular.toJson(item));
		});
		
	}

	
	function findIndexOfId(array, comparedId){
		for(var i = 0; i < array.length; i++){
			if(array[i].id == comparedId){
				return i;
			}
		}
		return -1;
	}
	
});