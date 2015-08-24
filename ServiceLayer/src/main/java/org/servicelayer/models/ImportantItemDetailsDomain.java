package org.servicelayer.models;

public class ImportantItemDetailsDomain {

	private int typeId;
	private String name;
	private Double volume;
	private int groupId;
	private int categoryId;
	private int marketGroupID;
	public int getTypeId() {
		return typeId;
	}
	public void setTypeId(int typeId) {
		this.typeId = typeId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Double getVolume() {
		return volume;
	}
	public void setVolume(Double volume) {
		this.volume = volume;
	}
	public int getGroupId() {
		return groupId;
	}
	public void setGroupId(int groupId) {
		this.groupId = groupId;
	}
	public int getCategoryId() {
		return categoryId;
	}
	public void setCategoryId(int categoryId) {
		this.categoryId = categoryId;
	}
	public int getMarketGroupID() {
		return marketGroupID;
	}
	public void setMarketGroupID(int marketGroupID) {
		this.marketGroupID = marketGroupID;
	}
}
