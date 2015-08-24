package org.scrap.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.priceutils.calls.EveCentralHandler;
import org.priceutils.displays.MarketStatTypeDisplay;
import org.scrap.daos.ScrapDAO;
import org.scrap.domain.IdAndQuantity;
import org.scrap.domain.Recipe;
import org.scrap.domain.ReprocessRequest;
import org.scrap.domain.ScrapDetails;
import org.servicelayer.service.ItemDetailsDAO;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/reprocess")
public class ScrapController {
	/*
	 * Contract: 	Send back list {String "name", int quantity}. Market? 
		Get {
			RecipeList { itemID, {quantity, materialTypeID}}
			ItemDetails { itemID: {typeName, volume,(marketGroupID,) (imageUrl,)
			PriceMap {itemID: price} (more complicated is possible, keep the details?)
			}
	 */
	
	@RequestMapping("/test")
	public String testEndpoint(){
		return "Reprocess Endpoint Exists";
	}
	
	@RequestMapping("/")
	public ModelMap reprocessEverything(@RequestBody final ReprocessRequest request){
		ModelMap modelMap = new ModelMap();
		System.out.println("Inside reprocessEverything: " + request.toString());
		
		if(!verifyReprocessRequest(request)){
			return modelMap;
			//might not be necessary
		}
		
		List<Recipe> recipeList = ScrapDAO.getRecipeList(request.getItems());
		modelMap.put("RecipeList", recipeList);
		
		List<Integer> idList = new ArrayList<Integer>();
		for(Recipe recipe : recipeList){
			if(!idList.contains(recipe.getId())){idList.add(recipe.getId());}
			for(IdAndQuantity component : recipe.getRecipe()){
				if(!idList.contains(component.getId())){idList.add(component.getId());}
			}
		}
		
		
		Map<Integer, ScrapDetails> detailsMap = ScrapDAO.getImportantItemDetails(idList);
		modelMap.put("ItemDetails", detailsMap);
		
		List<Integer> marketList = new ArrayList<Integer>();
		marketList.add(30000142);
//		ModelMap priceMap = null;
		Map<Integer, Double> priceMap = new HashMap<Integer, Double>();
		try{
			ModelMap eveCentralMap = EveCentralHandler.getMarketStatDisplays(idList, marketList);
			if(eveCentralMap != null && !eveCentralMap.isEmpty()){
//				for(String i, Object o: eveCentralMap.entrySet()){
//					
//				}
				//Map<Integer, MarketStatTypeDisplay>
				for(Integer id : idList){
					/*Object p = priceMap.get(id);
					if(p.getClass() == Map.class){
						Map<Object, Object> pm = (Map<Object, Object>) p;
					}*/
//					System.out.println("Marker 1 with id: " + id);
					Map<Integer, MarketStatTypeDisplay> p = (Map<Integer, MarketStatTypeDisplay>) eveCentralMap.get(Integer.toString(id));
//					System.out.println("p successfully converted: " + p.toString());
					MarketStatTypeDisplay m = p.get(30000142);
//					System.out.println("m successfully converted: " + m.toString());
//					m.getBuy().getFivePercent();
					priceMap.put(id, m.getBuy().getFivePercent());
				}
			}
		}catch(Exception e){
			System.out.println("Failed to populate priceMap for reprocessor endpoint");
			e.printStackTrace();
		}
		modelMap.put("PriceMap", priceMap);
		
		return modelMap;
	}
	
	public boolean verifyReprocessRequest(ReprocessRequest request){
		return true;
	}
}


