package org.scrap.domain;

import java.util.List;

public class Recipe {
//	int id = 
	private int id;
	private List<IdAndQuantity> recipe;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public List<IdAndQuantity> getRecipe() {
		return recipe;
	}
	public void setRecipe(List<IdAndQuantity> recipe) {
		this.recipe = recipe;
	}

}
