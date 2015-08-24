package org.servicelayer.service;

import java.util.List;

import org.servicelayer.access.ReprocessCaller;
import org.servicelayer.models.ReprocessRecipeDomain;

public class ScrapService {
	

	public static List<ReprocessRecipeDomain> getRecipeList(List<String> items) {
		return ReprocessCaller.getRecipesFromNames(items);
	}

}
