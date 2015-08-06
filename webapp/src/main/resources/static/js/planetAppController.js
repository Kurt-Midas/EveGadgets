var app = angular.module('planetApp', ['ui.bootstrap', 
                                       'ngRoute', 
                                       'util']);

app.config(function($routeProvider, $httpProvider) {
	$routeProvider.
		when('/', {
			templateUrl: 'PIGadget/PIApp.html',
			controller: 'planetAppController',
		}).
		when('/:planetKey', {
			templateUrl: 'PIGadget/PIApp.html',
			controller: 'planetAppController',
			/*
			working with resolve and $q is a good idea eventually
			but not before I get a setup method
			with a defined resolution order 
			*/
		}).
//		when('/FAQ', {
//			templateUrl: 'PIFaq.html',
//			controller: 'FAQController'
//		}).
//		when('/contact', {
//			templateUrl: 'Contact.html',
//			controller: 'ContractCtrl'
//		}).
		otherwise({
			redirectTo: '/'
		});
	
//	$httpProvider.defaults.headers.common['Access-Control-Allow-Headers']
//		= '*';
});

//directives
app.directive('variableHeight', function(){
	return {
		link: function(scope, element){
//			console.log(element[0].offsetHeight);
		}
	};
});

app.controller('ContactCtrl', function(){
});

app.controller('planetAppController', function($scope, $http, $rootScope, $routeParams){

	$scope.planets = [];

	$scope.testnumber=0;
	
	$scope.activePlanet = -1;
	
	$scope.totalCost = 0;
	$scope.totalTaxCost = 0;
	$scope.minRuntime = 100000;
	$scope.totalImportCost = 0;
	$scope.totalExportCost = 0;
	$scope.totalImportMarketFees = 0;
	$scope.totalExportMarketFees = 0;
	$scope.totalProfitPerHour = 0;
	
	$scope.totalImportExport = {};
	
	$scope.utilizationMessage = 
		'A production chain which depends on imports needs to be able to "catch up" if production cycles are missed. '
		+ 'Checking this enables boxes which can set factories or the planet itself to be active only every X cycles.';
	$scope.clickMeMessage = 
		'Click the planet name to edit it';
	$scope.priceMessage = 'Click a price to edit';
	$scope.importsNotProfits = 1;
	$scope.brokerFees = 1;
	$scope.localTaxes = 1.5;
	
	
	$scope.buildings=({
		Extractor_Control_Unit:{CPU:400,Power:2600,Cost:45000},
		Extractor_Head:{CPU:110,Power:550,Cost:0},
		Basic_Industry:{CPU:200,Power:800,Cost:75000},
		Advanced_Industry:{CPU:500,Power:700,Cost:250000},
		High_Tech_Industry:{CPU:1100,Power:400,Cost:525000},
		Storage_Facility:{CPU:500,Power:700,Cost:250000},
		Launchpad:{CPU:3600,Power:700,Cost:900000},
		Link:{CPU:0.1539,Power:0.1575,Cost:0}});
//	console.log($scope.buildings);
	
	$scope.costByTier=[4,400,7200,60000,1300000];
	$scope.volumeByTier=[0.01, 0.38, 1.5, 6, 100];
	$scope.cclevel=[{CPU:1675, Power:6000, Cost:0},
	                     {CPU:7057, Power:9000, Cost:580000},
	                     {CPU:12136, Power:12000, Cost:1510000},
	                     {CPU:17215, Power:15000, Cost:2710000},
	                     {CPU:21315, Power:17000, Cost:4210000},
	                     {CPU:25415, Power:19000, Cost:6310000}];
	
	$scope.baseCostByTier=({0:4},{1:400},{2:7200},{3:60000},{4:1300000});
	
	$scope.planetShorthand={11:"Temp",12:"Ice",13:"Gas",2014:"Ocean",
			2015:"Lava", 2016:"Barren",2017:"Storm",2063:"Plasma"};
	$scope.factoryPlanetsCanBe=[11,2016];
	
	$http.get("planetary").success(function(value){
		$scope.data = value;
//		console.log($scope.data.schematicMap)
//		console.log($scope.data);
		populateDatalists();
		if($routeParams.planetKey){
			console.log("params.planetKey identified: " + $routeParams.planetKey);
			var setup = planetApi.getPlanet($routeParams.planetKey);
			console.log("got setup string: " + setup);
			$scope.populateSetupFromJson(setup);
		}
	});
	
	$scope.basicTypeList = [];
	$scope.advancedTypeList = [];
	$scope.hightechTypeList = [];
	
	function populateDatalists(){
//		console.log("Creating datamaps");
		angular.forEach($scope.data.schematicMap, function(sch){
			if(sch.marketGroup == 1334){
				$scope.basicTypeList.push(sch.name);
			}
			else if(sch.marketGroup == 1335 || sch.marketGroup == 1336){
				$scope.advancedTypeList.push(sch.name);
			}
			else if(sch.marketGroup == 1337){
				$scope.hightechTypeList.push(sch.name);
			}
			else{
				console.error("Unknown marketGroup at <"+sch.name+", " + sch.marketGroup + ">");
			}
		});
	}
	 
	function getIDfromName(n){
		var name = $scope.data.nameMap[n];
//		console.log(name);
		return name;
	}

	$scope.ResetPlanets = function(){
		$scope.planets=[];
		$scope.minRuntime = 100000;
		$scope.totalCost = 0;
		$scope.totalImportExport = {};
//		console.log("Resetting planets");
		$scope.activePlanet = -1;
		$scope.totalImportCost = 0;
		$scope.totalExportCost = 0;
		$scope.totalTaxCost = 0;
		$scope.totalImportMarketFees = 0;
		$scope.totalExportMarketFees = 0;
		$scope.totalProfitPerHour = 0;
	}
	
	$scope.updateMinRunHours = function(){
		$scope.minRuntime = 100000;
		angular.forEach($scope.planets, function(p){
			if(p.runtime){
				if($scope.minRuntime > p.runtime * p.avgActiveCycles){
					$scope.minRuntime = p.runtime * p.avgActiveCycles;
					$scope.bottleneckPlanet=p.text;
				}
			}	
		})
		if($scope.minRuntime == 100000) {$scope.minRuntime = 0;}
	}
	
	$scope.updateTotalImportExport = function(){
		$scope.totalImportExport = {};
		angular.forEach($scope.planets, function(p){
			angular.forEach(p.importExport, function(io){
				if($scope.totalImportExport[io.typeID] == undefined){
					$scope.totalImportExport[io.typeID] = ({typeID:io.typeID,quantity:io.quantity,planets:p.planetID});
				}
				else{
					$scope.totalImportExport[io.typeID].quantity
						+= io.quantity;
//					if($scope.totalImportExport[io.typeID].planets){
						$scope.totalImportExport[io.typeID].planets += ", ";
//					}
					$scope.totalImportExport[io.typeID].planets	+= p.planetID;
				}
			})
		})
	}
	
	$scope.updateTotalSetupCost = function(){
		$scope.totalCost = 0;
		angular.forEach($scope.planets, function(p){
			$scope.totalCost += p.cost;
		})
	}
	
	$scope.updateTotalTaxCost = function(){
		$scope.totalTaxCost = 0;
		angular.forEach($scope.planets, function(p){
			$scope.totalTaxCost += p.importTaxes + p.exportTaxes;
		})
	}
	
	$scope.updateTotalImportExportCost = function(){
		$scope.totalImportCost = 0;
		$scope.totalExportCost = 0;
		angular.forEach($scope.totalImportExport, function(item){
			if(item.quantity > 0){
				if($scope.marketPrices[item.typeID]){
					$scope.totalExportCost += 
						($scope.marketPrices[item.typeID].price
						* item.quantity);
				}
			}
			else{
				if($scope.marketPrices[item.typeID]){
					$scope.totalImportCost += 
						($scope.marketPrices[item.typeID].price
						* item.quantity * -1);
				}
			}
		})
		$scope.totalImportMarketFees = $scope.totalImportCost 
			* ($scope.localTaxes + $scope.brokerFees) / 100;
		$scope.totalExportMarketFees = $scope.totalExportCost 
			* ($scope.localTaxes + $scope.brokerFees) / 100;
		$scope.totalProfitPerHour = $scope.totalExportCost
									- $scope.totalExportMarketFees
									- $scope.totalImportCost
									- $scope.totalImportMarketFees
									- $scope.totalTaxCost;
		angular.forEach($scope.planets, function(p){
//			console.log(p.text);
			p.totalProfit = 0;
			p.signed = 1;
			p.marketFees = 0;
			angular.forEach(p.importExport, function(item){
//				console.log(item.typeID);
				var itemCost = item.quantity * $scope.marketPrices[item.typeID].price;
				p.totalProfit += itemCost;
				var marketFees = itemCost * ($scope.brokerFees + $scope.localTaxes) / 100;
				if(marketFees > 0){
					p.marketFees += marketFees;
				} else{
					p.marketFees -= marketFees;
				}
			});
			p.totalProfit -= (p.importTaxes + p.exportTaxes);
			if(p.totalProfit < 0){
				p.signed *= -1;
			}
		});
	}
	
	function standardContains(collection, item){
		for(var i = 0; i < collection.length; i++){
			if(item == collection[i]){
				return i;
			}
		}
		return -1;
	}
	
	$scope.removePlanet = function(p){
		var index = $scope.planets.indexOf(p);
		$scope.planets.splice(index, 1);
		for(var i = 0; i < $scope.planets.length; i++){
			$scope.planets[i].planetID = i;
		}
		if($scope.activePlanet >= index && index > 0){
			$scope.activePlanet -= 1;
		}
		
		$scope.updateMinRunHours();
		$scope.updateTotalImportExport();
		$scope.updateTotalSetupCost();
		$scope.updateTotalTaxCost();
	}
	$scope.removeElementFrom = function (e, c){
		var index = c.indexOf(e);
		c.splice(index, 1);
	}
	$scope.IsBigger = function(first, second){
		//console.log(first);
		//console.log(second);
		if(first > second){return true;}
		return false;
	}
	
	$scope.changeActivePlanet = function(num){
		$scope.activePlanet = num;		
	}
	
	$scope.getPlanetName = function(pt){
//		console.log(pt);
		var planetName = $scope.planetShorthand[pt];
//		console.log(planetName);
		return planetName;
	}

	$scope.addPlanet = function(){
		$scope.planets.push(new Planet($scope.planets.length));
//		console.log($scope.planets);
		$scope.changeActivePlanet($scope.planets.length-1);
	}
	
	

	
	function Planet(len){
		this.planetID = len;
		this.allowedPlanets = [];
		this.basics = [];
		this.advanced = [];
		this.hightech = [];
		this.extractors = [];
		this.storagefacilities = 0;
		this.launchpads = 0;
		this.CPU = 0;
		this.Powergrid = 0;
		this.useCCStorage=false;
		this.restrictPads=false;
		this.taxRate = 10;
		this.level = 0;
		this.AvgLinkLength = 200;
		this.avgActiveCycles = 1;
		this.editText = 0;
		this.text = "Planet " + (this.planetID +1);
		this.importVolume=0;
		this.exportVolume=0;
		this.importTaxes=0;
		this.exportTaxes=0;
		this.importExport = {};
		this.cost = 0;
		this.totalStorage = 0;
		this.runtime = 0;
		this.resourceDatalist = [];
		this.totalProfit = 0;
		
		this.updateCPU = function(){
			this.CPU = 0;
			this.CPU += this.storagefacilities * $scope.buildings.Storage_Facility.CPU;
			this.CPU += this.launchpads * $scope.buildings.Launchpad.CPU;
			
			var numFacilities = this.storagefacilities + this.launchpads + this.extractors.length;
			for(var i = 0; i < this.basics.length; i++){
				this.CPU += this.basics[i].number * $scope.buildings.Basic_Industry.CPU;
				numFacilities += this.basics[i].number;
			}
			for(var i = 0; i < this.advanced.length; i++){
				this.CPU += this.advanced[i].number * $scope.buildings.Advanced_Industry.CPU;
				numFacilities += this.advanced[i].number;
			}
			for(var i = 0; i < this.hightech.length; i++){
				this.CPU += this.hightech[i].number * $scope.buildings.High_Tech_Industry.CPU;
				numFacilities += this.hightech[i].number;
			}
			for(var i = 0; i < this.extractors.length; i++){
				this.CPU += $scope.buildings.Extractor_Control_Unit.CPU
				this.CPU += $scope.buildings.Extractor_Head.CPU * this.extractors[i].headcount;
			}
			if(this.useCCStorage) { numFacilities+= 1; }
			if(numFacilities >= 1) { numFacilities -= 1; }
			this.CPU += numFacilities * $scope.buildings.Link.CPU * this.AvgLinkLength;
			//return this.CPU;
		}
		
		this.updateGrid = function() {
			this.Powergrid = 0;
			this.Powergrid += this.storagefacilities * $scope.buildings.Storage_Facility.Power;
			this.Powergrid += this.launchpads * $scope.buildings.Launchpad.Power;
			var numFacilities = this.storagefacilities + this.launchpads + this.extractors.length;
			for(var i = 0; i < this.basics.length; i++){
				this.Powergrid += this.basics[i].number * $scope.buildings.Basic_Industry.Power;
				numFacilities += this.basics[i].number;
			}
			for(var i = 0; i < this.advanced.length; i++){
				this.Powergrid += this.advanced[i].number * $scope.buildings.Advanced_Industry.Power;
				numFacilities += this.advanced[i].number;
			}
			for(var i = 0; i < this.hightech.length; i++){
				this.Powergrid += this.hightech[i].number * $scope.buildings.High_Tech_Industry.Power;
				numFacilities += this.hightech[i].number;
			}
			for(var i = 0; i < this.extractors.length; i++){
				this.Powergrid += $scope.buildings.Extractor_Control_Unit.Power;
				this.Powergrid += $scope.buildings.Extractor_Head.Power * this.extractors[i].headcount;
			}
			if(this.useCCStorage) { numFacilities+= 1; }
			if(numFacilities >= 1) { numFacilities -= 1; }
			this.Powergrid += numFacilities * $scope.buildings.Link.Power * this.AvgLinkLength;
			//return this.Powergrid;
		}
		
		this.updateCost = function(){
			totalCost=0;
			for(var i=0; i<this.basics.length; i++){
				totalCost += this.basics[i].number 
					* $scope.buildings.Basic_Industry.Cost;
			}
			for(var i=0; i<this.advanced.length; i++){
				totalCost += this.advanced[i].number 
					* $scope.buildings.Advanced_Industry.Cost;
			}
			for(var i=0; i<this.hightech.length; i++){
				totalCost += this.hightech[i].number 
					* $scope.buildings.High_Tech_Industry.Cost;
			}
			totalCost += this.extractors.length * $scope.buildings.Extractor_Control_Unit.Cost;
			totalCost += this.storagefacilities * $scope.buildings.Storage_Facility.Cost;
			totalCost += this.launchpads * $scope.buildings.Launchpad.Cost;
			totalCost += $scope.cclevel[this.level].Cost;
			this.cost = totalCost;
			$scope.updateTotalSetupCost();
			//return totalCost;
		}
		
		this.updateStorage = function(){
			var storage = this.launchpads * 10000;
//			console.log(this.restrictPads);
			if(!this.restrictPads){
				storage += this.storagefacilities * 12000;
				if(this.useCCStorage){ storage += 500; }
			}
			this.totalStorage = storage;
			this.updateRuntime();
		}
		
		this.updateRuntime = function(){
			if(this.importVolume > this.exportVolume){
				if(this.importVolume != 0){
					this.runtime = Math.floor(this.totalStorage / this.importVolume);
				}
			}
			else if(this.exportVolume >= this.importVolume){
				if(this.exportVolume != 0){
					this.runtime = Math.floor(this.totalStorage / this.exportVolume);
				}
			}
			else{
				console.error("Possible Error in runtime determination, please report to dev");
				this.runtime =  0;
			}
			$scope.updateMinRunHours();
		}
		
		this.updateTaxes = function(){
			this.importTaxes = 0;
			this.exportTaxes = 0;
			angular.forEach(this.importExport, function(io){
				var io_tier = $scope.data.itemDetails[io.typeID].tier;
				var tax = io.quantity * $scope.costByTier[io_tier] * this.taxRate/100;
				if(io.quantity < 0){
					this.importTaxes -= tax / 2;
				}
				else if(io.quantity > 0){
					this.exportTaxes += tax;
				}
				else { console.debug("IO Debug with quantity = 0 at " + io); }
			}, this)
			$scope.updateTotalTaxCost();
		}
		
		this.updateImportExports = function(){
			//this does IO quantity/volume and calls refreshTaxes and refreshRuntime
			//ImportExportUtil will now handle volume too
			angular.forEach(this.importExport, function(io){
				io.quantity = 0;
			}, this);
			angular.forEach(this.basics, function(f){
				this.ImportExportUtil(f);
			}, this);
			angular.forEach(this.advanced, function(f){
				this.ImportExportUtil(f);
			}, this);
			angular.forEach(this.hightech, function(f){
				this.ImportExportUtil(f);
			}, this);
			angular.forEach(this.extractors, function(e){
				delete this.importExport[$scope.data.nameMap[e.resourceId]];
			}, this);
			//quantities
			this.updateIOVolumes();
			this.updateTaxes();
			this.updateRuntime();
			$scope.updateTotalImportExport();
		}//use this when factories change
		
		//private?
		this.updateIOVolumes = function(){
			this.importVolume = 0;
			this.exportVolume = 0;
			angular.forEach(this.importExport, function(io){
				var io_tier = $scope.data.itemDetails[io.typeID].tier;
				var vol = io.quantity * $scope.volumeByTier[io_tier];
				if (vol < 0){
					this.importVolume -= vol;
				}
				else if (vol > 0){
					this.exportVolume += vol;
				}
				else{
//					$scope.removeElementFrom(io, this.importExport);
					delete this.importExport[io];
//					console.log("Removed element with volume 0: " + io.typeID); 
				}
			}, this);
		}
		
		//private
		this.ImportExportUtil = function(f){
			var schID = getIDfromName(f.schematic);
			if(schID != undefined){
				var sch = $scope.data.schematicMap[schID];
				if(this.importExport[sch.outputID] == undefined){
					this.importExport[sch.outputID] = ({typeID:sch.outputID,quantity:0});
				}
				this.importExport[sch.outputID].quantity += sch.outputQuantity 
					* f.number * 3600 / (sch.cycleTime * this.avgActiveCycles * f.avgActiveCycles);
				angular.forEach(sch.recipe, function(m){
					if(this.importExport[m.typeId] == undefined){
						this.importExport[m.typeId] 
							= ({typeID:m.typeId,quantity:0});
					}
					if(m.typeId != sch.outputID){
						this.importExport[m.typeId].quantity -= m.quantity * f.number 
							/ (this.avgActiveCycles * f.avgActiveCycles);
					}
				}, this)
			}
		}
		
		this.updateAllowedPlanets = function(){
			var allowed = [];
			if(this.hightech.length){
				angular.forEach($scope.factoryPlanetsCanBe, function(p){
					allowed.push(p);
				});
			}
			else
				angular.forEach($scope.data.planetMap, function(pm){
					allowed.push(pm.id);
				})
			angular.forEach(this.extractors, function(e){
				var rid = $scope.data.nameMap[e.resourceId];
				if($scope.data.resourceMap[rid] != undefined){
					angular.forEach($scope.data.planetMap, function(pm){
						var index = allowed.indexOf(pm.id);
						if(standardContains(pm.resourceIDs, rid) == -1
								&& index > -1){
							allowed.splice(index, 1);
						}
					})
				}
			}, this);
			if(allowed.length == 0){
//				console.log("Allowed planets is empty for this planet");
				//this should never be triggered if I did the above right
			}
			this.allowedPlanets = allowed;
			this.updateResourceDatalist();
		}
	
		this.updateResourceDatalist = function(){
			var datalist = [];
			angular.forEach(this.allowedPlanets, function(ptype){
				//if(standardContains(this.allowedPlanets, ptype.id) != -1){
				angular.forEach($scope.data.planetMap[ptype].resourceIDs, function(rtype){
					var name = $scope.data.itemDetails[rtype].name;
					if(standardContains(datalist, name) == -1){
						datalist.push(name);
					}
				}, this)
				//}
			}, this);
			this.resourceDatalist = datalist;
		}	
	
		//add stuff
		this.addBasic = function() {
			this.basics.push({schematic:"", number:1, avgActiveCycles:1});
		}
		this.addAdvanced = function() {
			this.advanced.push({schematic:"", number:1, avgActiveCycles:1});
		}
		this.addHighTech = function(){
			this.hightech.push({schematic:"", number:1, avgActiveCycles:1});
		}
		this.addExtractor = function(){
			this.extractors.push({resourceId:'', headcount:0});
		}
		this.removeStorage = function(){
			this.storagefacilities -= 1;
			if(this.storagefacilities < 0){
				this.storagefacilities = 0;
			}
			this.updateCPU();
			this.updateGrid(); 
			this.updateStorage();
			this.updateCost();
		}
		this.removeLaunchpad = function(){
			this.launchpads -= 1;
			if(this.launchpads < 0){
				this.launchpads = 0;
			}
			this.updateCPU();
			this.updateGrid(); 
			this.updateStorage();
			this.updateCost();
		}
		this.addStorage = function(){
			if(this.storagefacilities < 0){
				console.log("No permanent damage please");
			}
			this.storagefacilities += 1;
			this.updateCPU();
			this.updateGrid(); 
			this.updateStorage();
			this.updateCost();
		}
		this.addLaunchpad = function(){
			if(this.launchpads < 0){
				console.log("No permanent damage please");
			}
			this.launchpads += 1;
			this.updateCPU();
			this.updateGrid(); 
			this.updateStorage();
			this.updateCost();
		}
		
		//initialization
		this.updateAllowedPlanets();
		
		this.addPrerequisiteProduction = function(f){
			//f is a factory
			console.log("adding prereqs for " + f);
			var schID = getIDfromName(f.schematic);
			if(schID != undefined){
				var sch = $scope.data.schematicMap[schID];
				angular.forEach(sch.recipe, function(m){
					console.log(m.typeId);
					var fTier = $scope.data.itemDetails[m.typeId].tier;
					var name = $scope.data.itemDetails[m.typeId].name;
					if(m.typeId != schID){
						console.log("not undefined: " + name + ", " + fTier);
						if(fTier == 1){
							console.log("adding basic");
							this.basics.push({schematic:name, number:0, avgActiveCycles:1});
						}
						else if(fTier == 2 || fTier == 3){
							console.log("adding advanced");
							this.advanced.push({schematic:name, number:0, avgActiveCycles:1});
						}
						else if(fTier == 4){
							console.log("adding hightech");
							this.hightech.push({schematic:name, number:0, avgActiveCycles:1});
						} //this is probably a bad implementation. Figure out if it's in the datalist, that avoids issues.
						else if(fTier == 0){
//							this.resourceDatalist
							if(standardContains(this.resourceDatalist, name)){
								console.log("adding extractor: " + m.typeId);
								this.extractors.push({resourceId:name, headcount:0});
								this.updateImportExports();
								this.updateCPU();
								this.updateGrid();
								this.updateCost();
								this.updateAllowedPlanets();
							}else{
								console.log("Cannot add extractor: planet resource combination does not exist");
							}
							
							
//							$scope.planets[id].extractors.push({resourceId: e.resourceId, headcount: e.headcount});
						}
						else{
							console.debug("YOU FUCKED UP BOY");
						}
					}
				}, this);
			}
			
		}
		
		/*
		 * //private
		this.ImportExportUtil = function(f){
			var schID = getIDfromName(f.schematic);
			if(schID != undefined){
				var sch = $scope.data.schematicMap[schID];
				if(this.importExport[sch.outputID] == undefined){
					this.importExport[sch.outputID] = ({typeID:sch.outputID,quantity:0});
				}
				this.importExport[sch.outputID].quantity += sch.outputQuantity 
					* f.number * 3600 / (sch.cycleTime * this.avgActiveCycles * f.avgActiveCycles);
				angular.forEach(sch.recipe, function(m){
					if(this.importExport[m.typeId] == undefined){
						this.importExport[m.typeId] 
							= ({typeID:m.typeId,quantity:0});
					}
					if(m.typeId != sch.outputID){
						this.importExport[m.typeId].quantity -= m.quantity * f.number 
							/ (this.avgActiveCycles * f.avgActiveCycles);
					}
				}, this)
			}
		}
		 */
		
	} //planet definition "function"
	
	
	$scope.createPlanetFromCopy = function(planet, suffix){
		var id = $scope.planets.length;
		$scope.planets.push(new Planet(id));
		
		/*
		 * $scope.planets.push(new Planet($scope.planets.length));
//		console.log($scope.planets);
		$scope.changeActivePlanet($scope.planets.length-1);
		 * 
		 */
		
		angular.forEach(planet.basics, function(f){
			$scope.planets[id].basics.push({schematic:f.schematic, number:f.number, avgActiveCycles:f.avgActiveCycles});
//			console.log(f.schematic);
		});
		angular.forEach(planet.advanced, function(f){
			$scope.planets[id].advanced.push({schematic:f.schematic, number:f.number, avgActiveCycles:f.avgActiveCycles});
//			console.log(f.schematic);
		});
		angular.forEach(planet.hightech, function(f){
			$scope.planets[id].hightech.push({schematic:f.schematic, number:f.number, avgActiveCycles:f.avgActiveCycles});
//			console.log(f.schematic);
		});
		angular.forEach(planet.extractors, function(e){
			$scope.planets[id].extractors.push({resourceId: e.resourceId, headcount: e.headcount});
		});
		$scope.planets[id].storagefacilities = planet.storagefacilities;
		$scope.planets[id].launchpads = planet.launchpads;
		$scope.planets[id].useCCStorage = planet.useCCStorage;
		$scope.planets[id].restrictPads = planet.restrictPads;
		$scope.planets[id].taxRate = planet.taxRate;
		$scope.planets[id].level = planet.level;
		$scope.planets[id].AvgLinkLength = planet.AvgLinkLength;
		$scope.planets[id].avgActiveCycles = planet.avgActiveCycles;
		$scope.planets[id].isFactoryPlanet = planet.isFactoryPlanet;
		$scope.planets[id].text = planet.text + suffix;
		
		$scope.planets[id].updateCPU();
		$scope.planets[id].updateGrid();
		$scope.planets[id].updateCost();
		$scope.planets[id].updateStorage();
		$scope.planets[id].updateImportExports();
		$scope.planets[id].updateAllowedPlanets();
		
		$scope.changeActivePlanet(id);
	}
	
	
	
	
	$scope.$watch('planets.length', function(){
		var height = document.getElementById("planetNavTabs").offsetHeight;
		document.getElementById("planetContent").style.marginTop = height + "px";
		document.getElementById("infoContent").style.marginTop = height + "px";
	});
	
	
	$scope.marketPrices = [];

	//function populatePriceMapFromStatic(){
	$scope.populatePriceMapFromStatic = function(){
		var types = [];
		$scope.updateTotalImportExport();
		angular.forEach($scope.totalImportExport, function(ietype){
//			console.log("Pushing: " + ietype);
			types.push(ietype.typeID);
		});
		console.log("Intermediate, types = " + types);
		if(types.length === 0){
//			console.log("Length of totalImportExport is 0, not making price call")
		}
		else{
//			console.log("Making price call with : " + types);
			var getData = {method: 'GET',
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
		}
	}
	
	$scope.marketHubList = ({30000142:"Jita", 10000002:"The Forge"});
	
	$scope.calledRemoteSuccessfully = false;
	$scope.importMarketSystem = 30000142;
	$scope.exportMarketSystem = 30000142;
	$scope.orderTypeList = ["buy", "sell"]; //ignoring all
	$scope.marketStatTypeList = ["wavg", "avg", "median", "fivePercent", "max", "min"];

	$scope.im_orderType = "buy";
	$scope.im_marketStatType = "fivePercent";
	$scope.im_brokerfees = 1;
	$scope.im_salestax = 1.5;
	
	$scope.ex_orderType = "buy";
	$scope.ex_marketStatType = "fivePercent";
	$scope.ex_brokerfees = 1;
	$scope.ex_salestax = 1.5;
	
	$scope.realMarketPrices = {};
	
	/*
	 * In planets: 
	 * 		planet profit before market fees
	 * 		market fees
	 * 
	 * Total:
	 * 		Total Export Revenue
	 * 		Export Market Fees
	 * 		Total Import Cost
	 * 		Import Market Fees
	 * 		Total hourly customs tax (already exist?)
	 * 		profit per hour (optional)
	 * 
	 */
	
	$scope.updateMarketPricesByQualifiers = function(){
		if(!$scope.calledRemoteSuccessfully){
			console.error("Remote call failed, not refreshing market prices");
			return;
		}
		//$scope.realMarketPrices
		angular.forEach($scope.planets, function(p){
			p.importCostValue = 0;
			p.exportRevenueValue = 0;
			//p.importMarketFees = 0;
			//p.exportMarketFees = 0;
			angular.forEach(p.importExport, function(io){
//				console.log(io);
				//marketHubList[exportMarketSystem]
				if(io.quantity < 0){
					var price = $scope.realMarketPrices[io.typeID][$scope.importMarketSystem][$scope.im_orderType][$scope.ex_marketStatType];
					p.importCostValue += price * io.quantity * -1;
				}
				else if(io.quantity > 0){
					var price = $scope.realMarketPrices[io.typeID][$scope.exportMarketSystem][$scope.ex_orderType][$scope.im_marketStatType];
					p.exportRevenueValue += price * io.quantity;
				}
				else{
					console.debug("Quantity = 0 in updateMarketPrices>planets: " + io.typeID);
				}
			});//foreach io
			if($scope.im_orderType == "buy"){
				p.importMarketFees = p.importCostValue * ($scope.im_brokerfees)/100;
			} else{
				p.importMarketFees = 0;
			}
			if($scope.ex_orderType == "buy"){
				p.exportMarketFees = p.exportRevenueValue * ($scope.ex_brokerfees + $scope.ex_salestax)/100;
			}
			else{
				p.exportMarketFees = p.exportRevenueValue * ($scope.ex_salestax)/100;
			}
		});//forEach planet
		$scope.totalImportCost = 0;
		$scope.totalExportRevenue = 0;
			
		angular.forEach($scope.totalImportExport, function(ietype){
			//$scope.totalImportExport[io.typeID] = ({typeID:io.typeID,quantity:io.quantity,planets:p.planetID});
			if(ietype.quantity < 0){
				var price = $scope.realMarketPrices[ietype.typeID][$scope.importMarketSystem][$scope.im_orderType][$scope.im_marketStatType];
				$scope.totalImportCost += (ietype.quantity * -1) * price;
			}
			else if(ietype.quantity > 0){
				var price = $scope.realMarketPrices[ietype.typeID][$scope.exportMarketSystem][$scope.ex_orderType][$scope.ex_marketStatType];
				$scope.totalExportRevenue += ietype.quantity * price;
			}
			else{
				console.debug("Quantity = 0 in updateMarketPrices>global: " + ietype.typeID);
			}
		});
		if($scope.ex_orderType == "buy"){
			$scope.exportMarketFees = $scope.totalExportRevenue * ($scope.ex_brokerfees + $scope.ex_salestax)/100;
		}
		else{
			$scope.exportMarketFees = $scope.totalExportRevenue * ($scope.ex_salestax)/100;
		}
		if($scope.im_orderType == "buy"){
			$scope.importMarketFees = $scope.totalImportCost * ($scope.im_brokerfees)/100;
		}
		else{
			$scope.importMarketFees = 0;
		}
		$scope.totalProfitPerHour = $scope.totalExportRevenue 
			- ($scope.exportMarketFees + $scope.totalImportCost + $scope.importMarketFees + $scope.totalTaxCost);
	}

	/*$scope.updateMarketPricesByQualifiers = function(){
		if(!$scope.calledRemoteSuccessfully){
			console.log("updateMarketPricesByQualifiers: Remote api call failed, qualifiers are meaningless");
			return;
		}
		$scope.marketPrices = [];
		//$scope.planets[id].hightech.push({schematic:f.schematic, number:f.number, avgActiveCycles:f.avgActiveCycles});
		angular.forEach($scope.realMarketPrices, function(item){
			console.log(item);
			angular.forEach(item, function(sub1){
				console.log(sub1);
			})
			var idvar = item.query.types[0];
			var quantityvar = item[$scope.marketAction].volume;
			var pricevar = item[$scope.marketAction][$scope.marketDataType];
			console.log("updateMarketPricesByQualifiers: " + idvar + ", " + quantityvar + ", " + pricevar)
			var ioMarketDetails = {id:idvar, quantity:quantityvar, price:pricevar};
			$scope.marketPrices.push({idvar:ioMarketDetails});
		})
		console.log($scope.marketPrices);
	}*/
	
	
	//test the real one
	$scope.populatePriceMap = function(){
//		console.log("Import System " + $scope.importMarketSystem + ": " + $scope.marketHubList[$scope.importMarketSystem]);
//		console.log("Export System " + $scope.exportMarketSystem + ": " + $scope.marketHubList[$scope.exportMarketSystem]);
		
		$scope.calledRemoteSuccessfully = false;
		var types = [];
		$scope.updateTotalImportExport();
		angular.forEach($scope.totalImportExport, function(ietype){
			if(!($scope.realMarketPrices[ietype.typeID] && $scope.realMarketPrices[ietype.typeID][$scope.importMarketSystem]) 
				|| !($scope.realMarketPrices[ietype.typeID] && $scope.realMarketPrices[ietype.typeID][$scope.exportMarketSystem])){
				types.push(ietype.typeID);
			}
		});
		var systems = [];
		if($scope.importMarketSystem == $scope.exportMarketSystem){
			systems = [$scope.importMarketSystem];
		}
		else{
			systems = [$scope.importMarketSystem, $scope.exportMarketSystem];
		}
//		console.log("IO Systems: " + $scope.importMarketSystem + ", " + $scope.exportMarketSystem);
//		console.log("Systems: " + systems);
//		console.log("Intermediate, types = " + types);
		if(types.length === 0){
			console.debug("Length of totalImportExport is 0, not making price call")
		}
		else{
//			console.log("Making price call with : " + types);
			var getData = {method: 'GET',
					url: '/priceAPI',
					params: {
						type: types,
						system: systems
					}
			};
//			console.log("Making call: " + getData);
			$http(getData)
			.success(function(data){
				var notEmpty = false;
				for(var d in data){
					notEmpty = true;
					break;
				}
				if(notEmpty){
					console.debug("populatePriceMap: data found");
					$scope.calledRemoteSuccessfully = true;
					$scope.realMarketPrices = data;
					$scope.updateMarketPricesByQualifiers();
				}
				else{
					console.error("populatePriceMap: call failed");
//					$scope.populatePriceMapFromStatic();
				}
//				console.log("Call successful with response: " + data);
//				$scope.updateTotalImportExportCost();
			})
			.error(function(data, status, headers, config){
				console.log("populatePriceMap failed with info: " + data + " " + status + " " 
						+ headers + " " + config); 
			});
		}
	}
	
	/*
	 * $scope.importMarketSystem = 30000142;
	$scope.exportMarketSystem = 30000142;
	$scope.orderTypeList = ["buy", "sell"]; //ignoring all
	$scope.marketStatTypeList = ["wavg", "avg", "median", "fivePercent", "max", "min"];

	$scope.im_orderType = "buy";
	$scope.im_marketStatType = "fivePercent";
	$scope.im_brokerfees = 1;
	$scope.im_salestax = 1.5;
	
	$scope.ex_orderType = "buy";
	$scope.ex_marketStatType = "fivePercent";
	$scope.ex_brokerfees = 1;
	$scope.ex_salestax = 1.5;
	 */
	
	$scope.savePlanetJson = '';
	$scope.generateSavePlanetJson = function(){
		console.log("Inside generateSavePlanetJson");
		var json = {};
		//i, e + s, o, m, b, t
		if($scope.importMarketSystem != 30000142){json.is = $scope.importMarketSystem;}
		if($scope.exportMarketSystem != 30000142){json.es = $scope.exportMarketSystem;}
		if($scope.im_orderType != "buy"){json.io = $scope.im_orderType;}
		if($scope.ex_orderType != "buy"){json.eo = $scope.ex_orderType;}
		if($scope.im_marketStatType != "fivePercent"){json.im = $scope.im_marketStatType;}
		if($scope.ex_marketStatType != "fivePercent"){json.ex = $scope.ex_marketStatType;}
		if($scope.im_brokerfees != 1){json.ib = $scope.im_brokerfees;}
		if($scope.ex_brokerfees != 1){json.eb = $scope.ex_brokerfees;}
		if($scope.im_salestax != 1.5){json.it = $scope.im_salestax;}
		if($scope.ex_salestax != 1.5){json.et = $scope.ex_salestax;}
		
		json.pl = [];
		//add info panel stuff
		
		for(var i = 0; i < $scope.planets.length; i++){
			var p = {};
			if($scope.planets[i].basics.length){
				p.b = [];
				angular.forEach($scope.planets[i].basics, function(f){
					var factory = {};
					if(f.schematic != "") {factory.s = getIDfromName(f.schematic);}
					if(f.number != 1){factory.n = f.number;}
					if(f.avgActiveCycles != 1) {factory.a = f.avgActiveCycles;}
					p.b.push(factory);
				});
			}
			if($scope.planets[i].advanced.length){
				p.a = [];
				angular.forEach($scope.planets[i].advanced, function(f){
					var factory = {};
					if(f.schematic != "") {factory.s = getIDfromName(f.schematic);}
					if(f.number != 1){factory.n = f.number;}
					if(f.avgActiveCycles != 1) {factory.a = f.avgActiveCycles;}
					p.a.push(factory);
				});
			}
			if($scope.planets[i].hightech.length){
				p.h = [];
				angular.forEach($scope.planets[i].hightech, function(f){
					var factory = {};
					if(f.schematic != "") {factory.s = getIDfromName(f.schematic);}
					if(f.number != 1){factory.n = f.number;}
					if(f.avgActiveCycles != 1) {factory.a = f.avgActiveCycles;}
					p.h.push(factory);
				});
			}
			if($scope.planets[i].extractors.length){
				p.e = [];
				angular.forEach($scope.planets[i].extractors, function(ex){
					var extractor = {};
					if(ex.resourceId != "") {extractor.r = $scope.data.nameMap[ex.resourceId];}
					if(ex.headcount != 0) {extractor.h = ex.headcount;}
					p.e.push(extractor);
				});
			}
			if($scope.planets[i].storagefacilities != 0)
				{p.s = $scope.planets[i].storagefacilities;}
			if($scope.planets[i].launchpads != 0)
				{p.p = $scope.planets[i].launchpads;}
			if($scope.planets[i].useCCStorage)
				{p.c = $scope.planets[i].useCCStorage;}
			if($scope.planets[i].restrictPads)
				{p.r = $scope.planets[i].restrictPads;}
			if($scope.planets[i].taxRate != 10)
				{p.t = $scope.planets[i].taxRate;}
			if($scope.planets[i].level != 0)
				{p.l = $scope.planets[i].level;}
			if($scope.planets[i].AvgLinkLength != 200)
				{p.n = $scope.planets[i].AvgLinkLength;}
			if($scope.planets[i].avgActiveCycles != 1)
				{p.v = $scope.planets[i].avgActiveCycles;}
			if($scope.planets[i].isFactoryPlanet)
				{p.f = $scope.planets[i].isFactoryPlanet;}
			p.x = $scope.planets[i].text;
			
			json.pl.push(p);
		}
		console.log("Generated save json: " + json);
//		$scope.savePlanetJson = angular.toJson(json);
		return json;
	}
	
	
	$scope.populateSetupFromJson = function(stringVersion){
		var json = angular.fromJson(stringVersion);
		console.log("trying to populate setup");
		console.log("string version: " + stringVersion);
		console.log("json version: " + json);
		if(json.is){$scope.importMarketSystem = json.is;} else {$scope.importMarketSystem = 30000142;}
		if(json.es){$scope.exportMarketSystem = json.es;} else {$scope.exportMarketSystem = 30000142;}
		if(json.io){$scope.im_orderType = json.io;} else {$scope.im_orderType = "buy";}
		if(json.eo){$scope.ex_orderType = json.eo;} else {$scope.ex_orderType = "buy";}
		if(json.im){$scope.im_marketStatType = json.im;} else {$scope.im_marketStatType = "fivePercent";}
		if(json.em){$scope.ex_marketStatType = json.em;} else {$scope.ex_marketStatType = "fivePercent";}
		if(json.ib){$scope.im_brokerfees = json.ib;} else {$scope.im_brokerfees = 1;}
		if(json.eb){$scope.ex_brokerfees = json.eb;} else {$scope.ex_brokerfees = 1;}
		if(json.it){$scope.im_salestax = json.it;} else {$scope.im_salestax = 1.5;}
		if(json.et){$scope.ex_salestax = json.et;} else {$scope.ex_salestax = 1.5;}
		
		var planets = [];
		angular.forEach(json.pl, function(p){
			var planet = new Planet(planets.length);
			angular.forEach(p.b, function(f){
				var factory ={schematic:"", number:1, avgActiveCycles:1};
				if(f.s){
					factory.schematic = $scope.data.itemDetails[f.s].name;
				}
				if(f.n){
					factory.number = f.n;
				}
				if(f.a){
					factory.avgActiveCycles = f.a;
				}
				planet.basics.push(factory);
			});
			angular.forEach(p.a, function(f){
				var factory ={schematic:"", number:1, avgActiveCycles:1};
				if(f.s){
					factory.schematic = $scope.data.itemDetails[f.s].name;
				}
				if(f.n){
					factory.number = f.n;
				}
				if(f.a){
					factory.avgActiveCycles = f.a;
				}
				planet.advanced.push(factory);
			});
			angular.forEach(p.h, function(f){
				var factory ={schematic:"", number:1, avgActiveCycles:1};
				if(f.s){
					factory.schematic = $scope.data.itemDetails[f.s].name;
				}
				if(f.n){
					factory.number = f.n;
				}
				if(f.a){
					factory.avgActiveCycles = f.a;
				}
				planet.hightech.push(factory);
			});
			angular.forEach(p.e, function(e){
				var extractor = {resourceId:'', headcount:0};
				if(e.r){
					extractor.resourceId = $scope.data.itemDetails[e.r].name;
				}
				if(e.h){
					extractor.headcount = e.h;
				}
				planet.extractors.push(extractor);
			});
			if(p.s){planet.storagefacilities = p.s};
			if(p.p){planet.launchpads = p.p};
			if(p.c){planet.useCCStorage = p.c};
			if(p.r){planet.restrictPads = p.r};
			if(p.t){planet.taxRate = p.t};
			if(p.l){planet.level = p.l};
			if(p.n){planet.AvgLinkLength = p.n};
			if(p.v){planet.avgActiveCycles = p.v};
			if(p.f){planet.isFactoryPlanet = p.f};
			if(p.x){planet.text = p.x};
			planet.planetId = planets.length;
			planets.push(planet);
			console.log(planet);
		});
		console.log("should be pushing this now");
		$scope.planets = planets;
		angular.forEach($scope.planets, function(p){
			p.updateCPU();
			p.updateGrid();
			p.updateCost();
			p.updateStorage();
			p.updateImportExports();
			p.updateAllowedPlanets();
		})
		$scope.changeActivePlanet(0);
	}
	
});