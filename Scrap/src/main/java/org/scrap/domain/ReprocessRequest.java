package org.scrap.domain;

import java.util.List;

public class ReprocessRequest {
	private List<TypeAndQuantity> items;

	public List<TypeAndQuantity> getItems() {
		return items;
	}

	public void setItems(List<TypeAndQuantity> items) {
		this.items = items;
	}

}
