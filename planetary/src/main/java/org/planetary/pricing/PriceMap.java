package org.planetary.pricing;

public class PriceMap {
	private int id;
	private int quantity;
	private double price;
	
	public PriceMap(int id, int quantity, double price){
		this.id = id;
		this.quantity = quantity;
		this.price = price;
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
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}

}
