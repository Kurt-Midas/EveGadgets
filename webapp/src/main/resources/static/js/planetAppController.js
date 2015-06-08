var app = angular.module('planetApp', ['ui.bootstrap', 
                                       'ngRoute', 
                                       'util']);

app.config(function($routeProvider, $httpProvider) {
	$routeProvider.
		when('/', {
			templateUrl: 'PIApp.html',
			controller: 'planetAppController'
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
			console.log(element[0].offsetHeight);
		}
	};
});

app.controller('ContactCtrl', function(){
});

app.controller('planetAppController', function($scope, $http, $rootScope){

	$scope.planets = [];

	$scope.testnumber=0;
	
	$scope.activePlanet = -1;
	
	$scope.totalCost = 0;
	$scope.totalTaxCost = 0;
	$scope.minRuntime = 100000;
	$scope.totalImportCost = 0;
	$scope.totalExportCost = 0;
	
	$scope.totalImportExport = {};
	
	$scope.utilizationMessage = 
		'A production chain which depends on imports needs to be able to "catch up" if production cycles are missed. '
		+ 'Checking this enables boxes which can set factories or the planet itself to be active only every X cycles.';
	$scope.clickMeMessage = 
		'Click the planet name to edit it';
	$scope.priceMessage = 'Click a price to edit';
	
	$rootScope.contactMessage = 'IGN: Kurt Midas <br>'
		+ "<a href='https://github.com/Kurt-Midas/EveGadgets' " +
				"target='_blank'>Project Github</a><br>"
		+ "<a href='https://secure.eveonline.com/trial/?invc=9e8adfef-08b9-486c-b43b-c8733b49e46a&action=buddy'" +
				" target='_blank'>Make a PI account and stuff</a><br>"
		+ "SEND ME FEEDBACK AND ILL DOUBLE IT FOR FREE CHECK MY BIO";
	
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
	});
	
	$scope.basicTypeList = [];
	$scope.advancedTypeList = [];
	$scope.hightechTypeList = [];
	
	function populateDatalists(){
		console.log("Creating datamaps");
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
				console.log("Unknown marketGroup at <"+sch.name+", " + sch.marketGroup + ">");
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
				this.CPU += this.hightech[i].number * $scope.buildings.Basic_Industry.CPU;
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
				this.Powergrid += this.hightech[i].number * $scope.buildings.Basic_Industry.Power;
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
				console.log("Possible Error in runtime determination, please report to dev");
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
				else { console.log("IO Error with quantity = 0 at " + io); }
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
				else{ console.log("IO Error with volume = 0 at " + io); }
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
				console.log("Allowed planets is empty for this planet");
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
		
		//initialization
		this.updateAllowedPlanets();
		
	} //planet definition "function"
	
	$scope.$watch('planets.length', function(){
		var height = document.getElementById("planetNavTabs").offsetHeight;
		document.getElementById("planetContent").style.marginTop = height + "px";
		document.getElementById("infoContent").style.marginTop = height + "px";
	});
	
	
	$scope.marketPrices = [];

	$scope.populatePriceMap = function(){
		var types = [];
		
		angular.forEach($scope.totalImportExport, function(ietype){
			console.log("Pushing: " + ietype);
			types.push(ietype.typeID);
		});
		console.log("Intermediate, types = " + types);
		if(types.length === 0){
			console.log("Length of totalImportExport is 0, not making price call")
		}
		else{
			console.log("Making price call with : " + types);
			var getData = {method: 'GET',
			url: '/priceAPI',
			params: {
				typeList: types
			}};
			
			$http(getData)
			.success(function(data){
				$scope.marketPrices = data;
				console.log("Call successful with response: " + $scope.marketPrices);
				$scope.updateTotalImportExportCost();
			})
			.error(function(data, status, headers, config){
				console.log("Call failed with info: " + data + " " + status + " " 
						+ headers + " " + config); 
			});
		}
	}
});