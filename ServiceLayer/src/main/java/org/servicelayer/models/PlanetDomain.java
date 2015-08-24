package org.servicelayer.models;

import java.util.List;

public class PlanetDomain {
	private int id;
	private List<Integer> resourceIDs;
	public List<Integer> getResourceIDs() {
		return resourceIDs;
	}
	public void setResourceIDs(List<Integer> resourceIDs) {
		this.resourceIDs = resourceIDs;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}

}
