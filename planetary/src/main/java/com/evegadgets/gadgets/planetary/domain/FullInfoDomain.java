package com.evegadgets.gadgets.planetary.domain;

import java.util.Map;

import com.evegadgets.gadgets.planetary.structure.itemdetails.ItemDetailsDomain;
import com.evegadgets.gadgets.planetary.structure.planets.PlanetDomain;
import com.evegadgets.gadgets.planetary.structure.planets.ResourceDomain;
import com.evegadgets.gadgets.planetary.structure.schematics.SchematicDomain;

public class FullInfoDomain {
//	private List<PinCostDomain> pinCosts; //actually should be a map? 
	//schematics
	
	private Map<Integer, SchematicDomain> schematicMap;
	private Map<Integer, PlanetDomain> planetMap;
	private Map<Integer, ResourceDomain> resourceMap;
	private Map<String, Integer> nameMap;
	private Map<Integer, ItemDetailsDomain> itemDetails;
	
	public FullInfoDomain(
			Map<Integer, SchematicDomain> schematicMap, 
			Map<Integer, PlanetDomain> planetMap,
			Map<Integer, ResourceDomain> resourceMap, 
			Map<String, Integer> nameMap,
			Map<Integer, ItemDetailsDomain> itemDetails){
		this.setSchematicMap(schematicMap);
		this.setPlanetMap(planetMap);
		this.setResourceMap(resourceMap);
		this.setNameMap(nameMap);
		this.setItemDetails(itemDetails);
	}

	public Map<Integer, SchematicDomain> getSchematicMap() {
		return schematicMap;
	}

	public void setSchematicMap(Map<Integer, SchematicDomain> schematicMap) {
		this.schematicMap = schematicMap;
	}

	public Map<String, Integer> getNameMap() {
		return nameMap;
	}

	public void setNameMap(Map<String, Integer> nameMap) {
		this.nameMap = nameMap;
	}

	public Map<Integer, ItemDetailsDomain> getItemDetails() {
		return itemDetails;
	}

	public void setItemDetails(Map<Integer, ItemDetailsDomain> itemDetails) {
		this.itemDetails = itemDetails;
	}

	public Map<Integer, PlanetDomain> getPlanetMap() {
		return planetMap;
	}

	public void setPlanetMap(Map<Integer, PlanetDomain> planetMap) {
		this.planetMap = planetMap;
	}

	public Map<Integer, ResourceDomain> getResourceMap() {
		return resourceMap;
	}

	public void setResourceMap(Map<Integer, ResourceDomain> resourceMap) {
		this.resourceMap = resourceMap;
	}

	//have a verify function somewhere?
}
