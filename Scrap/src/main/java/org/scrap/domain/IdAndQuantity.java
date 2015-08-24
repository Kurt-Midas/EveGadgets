package org.scrap.domain;

public class IdAndQuantity {
	private int id;
	private int quantity;
	public IdAndQuantity(){
		super();
	}
	public IdAndQuantity(int id, int quantity) {
		this.id = id;
		this.quantity = quantity;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

}
