package org.priceutils.calls;

import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.priceutils.displays.MarketStatForQuery;
import org.priceutils.displays.MarketStatInfoContainer;
import org.priceutils.displays.MarketStatTypeDisplay;
import org.priceutils.requestmodels.MarketStatRequest;
import org.springframework.ui.ModelMap;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;


/**
 * Hello world!
 *
 */
public class EveCentralHandler 
{
//	private static final String USER_AGENT = "evegadgets.com";	
	/*public static void main( String[] args )
    {
		//public static ModelMap getMarketStatDisplays(List<Integer> types, List<Integer> markets){
        System.out.println( "Hello World!" );
        List<Integer> typeList = new ArrayList<Integer>();
        typeList.add(3689);
        typeList.add(44);
        List<Integer> marketList = new ArrayList<Integer>();
        marketList.add(30000142);
        marketList.add(10000002);
        try {
        	getMarketStatDisplays(typeList, marketList);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    }*/
	
	public static ModelMap getMarketStatDisplays(List<Integer> types, List<Integer> markets){
//		System.out.println("Trying getMarketStatDisplays");
		ModelMap modelMap = new ModelMap();
		List<MarketStatRequest> requestList = new ArrayList<MarketStatRequest>();
		for(int market : markets){
//			System.out.println(market);
			if(market > 30000000){
				requestList.add(new MarketStatRequest(market, types, true));
			}else if (market < 30000000 && market > 10000000){
				requestList.add(new MarketStatRequest(market, types, false));
			}else{
				System.out.println("Error in EveCentralHandler.getMarketStatDisplays: market id = " + market);
			}
		}
//		System.out.println("Checkpoint");
		for(MarketStatRequest request : requestList){
//			System.out.println(request.getRequestUrl());
			ObjectMapper mapper = new ObjectMapper();
//			mapper.disable(DeserializationFeature.FAIL_ON_NULL_FOR_PRIMITIVES);
			mapper.disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);
			List<Map<String, Object>> reply = new ArrayList<Map<String, Object>>();
			try{
//				System.out.println(request.getRequestUrl());
				URL url = new URL(request.getRequestUrl());
				reply = mapper.readValue(new URL(request.getRequestUrl()), List.class);
			}catch(Exception ex){
//				System.out.println("Failed to connect with details: " + ex.getLocalizedMessage() + ", " + ex.getCause());
				continue;
			}
			for(Map<String, Object> typeMap : reply){
				if(typeMap.containsKey("buy") 
						&& typeMap.containsKey("sell")
						&& typeMap.containsKey("all")){
//					System.out.println("Buy object: " + typeMap.get("buy").toString());
					MarketStatInfoContainer buy = mapper.convertValue(typeMap.get("buy"), MarketStatInfoContainer.class);
					MarketStatInfoContainer sell = mapper.convertValue(typeMap.get("sell"), MarketStatInfoContainer.class);
					MarketStatInfoContainer all = mapper.convertValue(typeMap.get("all"), MarketStatInfoContainer.class);
					MarketStatTypeDisplay typeAndMarketInfo = new MarketStatTypeDisplay(all, buy, sell);
					
					String type = "";
					try{
						ModelMap tempBuyMap = mapper.convertValue(typeMap.get("buy"), ModelMap.class);
						MarketStatForQuery forQuery= mapper.convertValue(tempBuyMap.get("forQuery"), MarketStatForQuery.class);
						type = Integer.toString(forQuery.getTypes().get(0));
//						System.out.println("Getting Type: " + type + ", " + modelMap.get(type));
						if(modelMap.get(type) != null){
//							System.out.println("type already exists");
							((Map<Integer, MarketStatTypeDisplay>) modelMap.get(type))
								.put(request.getMarketLocation(), typeAndMarketInfo);
						}else{
							
							Map<Integer, MarketStatTypeDisplay> marketMap = new HashMap<Integer, MarketStatTypeDisplay>();
							marketMap.put(request.getMarketLocation(), typeAndMarketInfo);
//							System.out.println("Setting Details: " + type + ", " + marketMap.toString());
							modelMap.put(type, marketMap);
						}
					}catch(Exception ex){
						System.out.println("Data Error: " + ex.getLocalizedMessage() + ", " + ex.getCause());
						continue;
					} 
				}
			}
		}
//		System.out.println("Result:");
//		System.out.println(modelMap.toString());
		return modelMap;
	}

	
	
	/*public static void main( String[] args )
    {
        System.out.println( "Hello World!" );
//        ObjectMapper mapper = new ObjectMapper();
        List<Integer> typeList = new ArrayList<Integer>();
        typeList.add(3689);
        typeList.add(44);
        int system = 30000142;
        try {
			marketStat(typeList, system);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    }*/


    
/*    public static Map<Integer, MarketStatResponse> marketStat(List<Integer> typeList, Integer system) throws JsonParseException, JsonMappingException, MalformedURLException, IOException{
    	String url = "http://api.eve-central.com/api/marketstat/json?";
    	if(typeList == null || system == null){
    		System.out.println("Null arguments");
    		return null;
    	}
    	if(typeList.size() == 0){
    		System.out.println("typeList is empty");
    		return null;
    	}
    
    	for(int type : typeList){
    		url += "typeid=" + type + "&";
    	}
    	url += "usesystem=" + system;
    	//
    	System.out.println(url);
    	ObjectMapper mapper = new ObjectMapper();
//    	mapper.disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);
    	mapper.disable(DeserializationFeature.FAIL_ON_NULL_FOR_PRIMITIVES);
//    	URL urlObject = new URL(url);
    	List<Map<String, MarketStatInfo>> reply = new ArrayList<Map<String, MarketStatInfo>>();
    	try{
    		reply = mapper.readValue(new URL(url), List.class);
    	}
    	catch(Exception ex){
    		System.out.println("Failed to connect with details: " + ex.getLocalizedMessage() + ", " + ex.getCause());
    	}
//    	System.out.println(reply);
    	
    	Map<Integer, MarketStatResponse> returnValue = new HashMap<Integer, MarketStatResponse>();
    	
    	for(Map<String, MarketStatInfo> typeMap: reply){
    		System.out.println("Map");
    		if(typeMap.containsKey("buy")
    				&& typeMap.containsKey("sell")
    				&& typeMap.containsKey("all")){
    			System.out.println(typeMap.get("buy"));
    			MarketStatInfo buy = mapper.convertValue(typeMap.get("buy"), MarketStatInfo.class);
    			MarketStatInfo sell = mapper.convertValue(typeMap.get("sell"), MarketStatInfo.class);
    			MarketStatInfo all = mapper.convertValue(typeMap.get("all"), MarketStatInfo.class);
    			int type = buy.getForQuery().getTypes().get(0);
    			returnValue.put(type, new MarketStatResponse(buy.getForQuery(),
    					buy, sell, all));
    		}
    	}
    	return returnValue;
//    	for(List<Market>)
    }
*/}
