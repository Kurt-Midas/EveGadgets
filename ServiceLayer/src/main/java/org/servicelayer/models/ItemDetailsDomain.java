package org.servicelayer.models;

public class ItemDetailsDomain {
	private String name;
	private int tier;
	private int typeID;
	
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
