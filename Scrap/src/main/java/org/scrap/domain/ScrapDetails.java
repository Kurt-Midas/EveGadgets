package org.scrap.domain;

public class ScrapDetails {
	private String name;
	private int typeID;
	private int groupID;
	private int categoryID;
	private double volume;
	private int marketGroupID;
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
	public int getGroupID() {
		return groupID;
	}
	public void setGroupID(int groupID) {
		this.groupID = groupID;
	}
	public int getCategoryID() {
		return categoryID;
	}
	public void setCategoryID(int categoryID) {
		this.categoryID = categoryID;
	}
	public double getVolume() {
		return volume;
	}
	public void setVolume(double volume) {
		this.volume = volume;
	}
	public int getMarketGroupID() {
		return marketGroupID;
	}
	public void setMarketGroupID(int marketGroupID) {
		this.marketGroupID = marketGroupID;
	}

}
