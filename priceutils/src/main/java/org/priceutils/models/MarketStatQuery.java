package org.priceutils.models;

import java.util.List;

public class MarketStatQuery {
	
	private boolean bid;
	private List<Integer> types;
	private List<Integer> regions;
	private List<Integer> systems;
	private int hours;
	private int minq;
	
	public boolean isBid() {
		return bid;
	}
	public void setBid(boolean bid) {
		this.bid = bid;
	}
	public List<Integer> getTypes() {
		return types;
	}
	public void setTypes(List<Integer> types) {
		this.types = types;
	}
	public List<Integer> getRegions() {
		return regions;
	}
	public void setRegions(List<Integer> regions) {
		this.regions = regions;
	}
	public List<Integer> getSystems() {
		return systems;
	}
	public void setSystems(List<Integer> systems) {
		this.systems = systems;
	}
	public int getHours() {
		return hours;
	}
	public void setHours(int hours) {
		this.hours = hours;
	}
	public int getMinq() {
		return minq;
	}
	public void setMinq(int minq) {
		this.minq = minq;
	}

}
