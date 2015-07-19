package org.priceutils.requestmodels;

import java.util.List;

public class MarketStatRequest {
	private boolean isSystem;
	private List<Integer> typeList;
	private int marketLocation;
	
	private final String urlPrefix 
		= "http://api.eve-central.com/api/marketstat/json?";
	
	public MarketStatRequest(int marketLocation, 
				List<Integer> typeList, 
				boolean isSystem){
		this.setSystem(isSystem);
		this.setTypeList(typeList);
		this.setMarketLocation(marketLocation);
	}
	
	public String getRequestUrl(){
		if(typeList == null || typeList.size() == 0){
			return null;
		}
		String buildUrl = urlPrefix;
		if(isSystem){
			buildUrl += "usesystem=" + marketLocation;
		}else{
			buildUrl += "regionlimit=" + marketLocation;
		}
		
		for(Integer type : typeList){
			buildUrl += "&typeid=" + type;
		}
//		System.out.println("Making call with: " + buildUrl);
		return buildUrl;
	}

	public int getMarketLocation() {
		return marketLocation;
	}

	public void setMarketLocation(int marketLocation) {
		this.marketLocation = marketLocation;
	}

	public List<Integer> getTypeList() {
		return typeList;
	}

	public void setTypeList(List<Integer> typeList) {
		this.typeList = typeList;
	}

	public boolean isSystem() {
		return isSystem;
	}

	public void setSystem(boolean isSystem) {
		this.isSystem = isSystem;
	}
	

}
