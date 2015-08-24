package org.servicelayer.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.servicelayer.access.ItemDetailsCalls;
import org.servicelayer.models.ImportantItemDetailsDomain;
import org.servicelayer.models.ItemDetailsDomain;

public class ItemDetailsDAO {
	
	
	public static Map<Integer, ItemDetailsDomain> getItemDetails(){
		List<ItemDetailsDomain> itemDetailsList = ItemDetailsCalls.getItemDetailsList();
				//session.selectList("ItemDetails.getItemDetailsList");
		Map<Integer, ItemDetailsDomain> resultMap = new HashMap<Integer, ItemDetailsDomain>();
		for(ItemDetailsDomain d : itemDetailsList){
			resultMap.put(d.getTypeID(), d);
		}
		return resultMap;
	}
	
	public static List<ImportantItemDetailsDomain> getImportantItemDetails(List<Integer> itemIdList){
		List<ImportantItemDetailsDomain> detailsList = ItemDetailsCalls.getImportantItemDetails(itemIdList);
//		Map<Integer, ImportantItemDetailsDomain> resultMap = new HashMap<Integer, ImportantItemDetailsDomain>();
//		for(ImportantItemDetailsDomain d : detailsList){
//			resultMap.put(d.getTypeId(), d);
//		}
		return detailsList;
	}
}
