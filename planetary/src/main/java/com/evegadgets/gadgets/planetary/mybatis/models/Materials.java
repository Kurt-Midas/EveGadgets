package com.evegadgets.gadgets.planetary.mybatis.models;

public class Materials {
	
	private int typeID;
	private int quantity;
	private String materialName;
	
	public int getTypeID() {
		return typeID;
	}
	public void setTypeID(int typeID) {
		this.typeID = typeID;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public String getMaterialName() {
		return materialName;
	}
	public void setMaterialName(String materialName) {
		this.materialName = materialName;
	}
	public Materials(){
		
	}
	public Materials(int typeID, String materialName, int quantity){
		this.typeID = typeID;
		this.materialName = materialName;
		this.quantity=quantity;
	}

}
