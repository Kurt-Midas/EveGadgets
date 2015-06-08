package com.evegadgets.gadgets.planetary.structure.planets;

import java.util.List;

public class ResourceDomain {
	
	private int id;
	private List<Integer> planetIDs;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public List<Integer> getPlanetIDs() {
		return planetIDs;
	}
	public void setPlanetIDs(List<Integer> planetIDs) {
		this.planetIDs = planetIDs;
	}

}
