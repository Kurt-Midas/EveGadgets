package com.evegadgets.gadgets.planetary.structure.schematics;

import java.util.List;

public class SchematicDomain {
	private int outputID;
	private String name;
//	private double volume;
//	private double basePrice;
	private int outputQuantity;
	private int marketGroup;
	private int cycleTime;
	private List<ComponentDomain> recipe;
	
	public List<ComponentDomain> getRecipe() {
		return recipe;
	}
	public void setRecipe(List<ComponentDomain> recipe) {
		this.recipe = recipe;
	}
	public int getCycleTime() {
		return cycleTime;
	}
	public void setCycleTime(int cycleTime) {
		this.cycleTime = cycleTime;
	}
	public int getMarketGroup() {
		return marketGroup;
	}
	public void setMarketGroup(int marketGroup) {
		this.marketGroup = marketGroup;
	}
	public int getOutputQuantity() {
		return outputQuantity;
	}
	public void setOutputQuantity(int outputQuantity) {
		this.outputQuantity = outputQuantity;
	}
	public int getOutputID() {
		return outputID;
	}
	public void setOutputID(int outputID) {
		this.outputID = outputID;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	
	//SIZE AND VOLUME. Either its own thing or in TypeName, what do? 
	//Probably TypePreDomain and separate it out into its own map 
	//actually baseCost too. This argues for a comprehensive itemTypeMap and a separate planetNameMap. Maybe. 
		//volume, base cost, 
	

}

