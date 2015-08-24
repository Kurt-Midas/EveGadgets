package org.servicelayer.access;

import java.util.List;

import org.servicelayer.models.ImportantItemDetailsDomain;
import org.servicelayer.models.ItemDetailsDomain;
import org.servicelayer.shameful.SessionHolder;

public class ItemDetailsCalls {
	
	public static List<ItemDetailsDomain> getItemDetailsList() {
		List<ItemDetailsDomain> result 
			= SessionHolder.useSession().selectList("ItemDetails.getPlanetResourceTypeNameTier");
		return result;
	}
	
	public static List<ImportantItemDetailsDomain> getImportantItemDetails(List<Integer> itemIdList){
		List<ImportantItemDetailsDomain> result
			= SessionHolder.useSession().selectList("ItemDetails.getImportantItemDetails", itemIdList);
		return result;
	}

}
