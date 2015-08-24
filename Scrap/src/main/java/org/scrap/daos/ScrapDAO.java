package org.scrap.daos;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.scrap.domain.IdAndQuantity;
import org.scrap.domain.Recipe;
import org.scrap.domain.ScrapDetails;
import org.scrap.domain.TypeAndQuantity;
import org.servicelayer.models.IdAndQuantityDomain;
import org.servicelayer.models.ImportantItemDetailsDomain;
import org.servicelayer.models.ReprocessRecipeDomain;
import org.servicelayer.service.ItemDetailsDAO;
import org.servicelayer.service.ScrapService;

public class ScrapDAO {

	public static List<Recipe> getRecipeList(List<TypeAndQuantity> items) {
		List<String> nameList = new ArrayList<String>();
		for(TypeAndQuantity item: items){
			nameList.add(item.getName());
		}
		
		List<ReprocessRecipeDomain> result = ScrapService.getRecipeList(nameList);
		List<Recipe> recipeList = new ArrayList<Recipe>();
		for(ReprocessRecipeDomain item: result){
			recipeList.add(convertAndVerify(item));
		}
		return recipeList;
	}

	private static Recipe convertAndVerify(ReprocessRecipeDomain item) {
		Recipe result = new Recipe();
		result.setId(item.getId());
		List<IdAndQuantity> componentList = new ArrayList<IdAndQuantity>();
		for(IdAndQuantityDomain component : item.getMaterials()){
			componentList.add(new IdAndQuantity(component.getId(), component.getQuantity()));
		}
		result.setRecipe(componentList);
		return result;
	}
	
	public static Map<Integer, ScrapDetails> getImportantItemDetails(List<Integer> ids){
		List<ImportantItemDetailsDomain> detailsList = ItemDetailsDAO.getImportantItemDetails(ids);
		Map<Integer, ScrapDetails> resultMap = verifyAndMapifyImportantDetails(detailsList);
//		Map<Integer, ImportantItemDetailsDomain> resultMap = new HashMap<Integer, ImportantItemDetailsDomain>();
//		for(ImportantItemDetailsDomain d : detailsList){
//			resultMap.put(d.getTypeId(), d);
//		}
		return resultMap;
	}
	
	private static Map<Integer, ScrapDetails> verifyAndMapifyImportantDetails(List<ImportantItemDetailsDomain> detailsList){
		Map<Integer, ScrapDetails> map = new HashMap<Integer, ScrapDetails>();
		for(ImportantItemDetailsDomain d: detailsList){
			ScrapDetails details = new ScrapDetails();
			details.setName(d.getName());
			details.setTypeID(d.getTypeId());
			details.setGroupID(d.getGroupId());
			details.setCategoryID(d.getCategoryId());
			details.setVolume(d.getVolume());
			details.setMarketGroupID(d.getMarketGroupID()); 
			map.put(d.getTypeId(), details);
		}
		
		return map;
	}
	

}
