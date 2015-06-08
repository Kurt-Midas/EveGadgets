package com.evegadgets.gadgets.planetary.structure.itemdetails;

public class ItemDetailsDomain {
	private String name;
	private double volume;
	private int tier;
	private int typeID;
	
	public double getVolume() {
		return volume;
	}
	public void setVolume(double volume) {
		this.volume = volume;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getTypeID() {
		return typeID;
	}
	public void setTypeID(int typeID) {
		this.typeID = typeID;
	}
	public int getTier() {
		return tier;
	}
	public void setTier(int tier) {
		this.tier = tier-1333;
	}

}
