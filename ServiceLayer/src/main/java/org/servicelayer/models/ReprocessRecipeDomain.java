package org.servicelayer.models;

import java.util.List;

public class ReprocessRecipeDomain {
//	int id = 
	private int id;
	private List<IdAndQuantityDomain> materials;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public List<IdAndQuantityDomain> getMaterials() {
		return materials;
	}
	public void setMaterials(List<IdAndQuantityDomain> materials) {
		this.materials = materials;
	}

}
