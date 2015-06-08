package com.evegadgets.gadgets.planetary.pricing;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import com.evegadgets.gadgets.planetary.mybatis.models.Materials;

public class MockPriceUtil {
	
	private static Properties prop = new Properties();
	private static InputStream input = null;
	private static String configFile = "src/main/resources/config.properties";
	
	static{
		System.out.println(configFile);
		try{
			input = new FileInputStream(configFile);
			prop.load(input);
		}catch(IOException e) { e.printStackTrace();}
		finally {
			if (input != null) {
				try {
					input.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}
	
	public static Map<Integer, PriceMap> getPriceMap(List<Integer> typeList, Integer region){
		//region doesn't matter atm but will be useful in the future.
		Map<Integer, PriceMap> priceMap = new HashMap<Integer, PriceMap>();
		for(int typeID: typeList){
			int id = typeID;
			String quantString = prop.getProperty(String.valueOf(typeID) + "q");
			String priceString = prop.getProperty(String.valueOf(typeID) + "b");
			//b for buy, not p for price
			try{
				priceMap.put(id, new PriceMap(id, Integer.valueOf(quantString), 
						Double.valueOf(priceString)));
			} catch(Exception e){
				System.out.println("ERROR: MockPriceUtil | String parsing failed at <" 
						+ quantString + " | " + priceString + "> with message: " + e.getMessage());
			}
		}
		return priceMap;
	}
	
	//this is old stuff. Salvaged this code from a reprocessing calculator, this is leftover. 
	public static HashMap<Integer, Double> getPriceMap2(List<Materials> componentList){
		HashMap<Integer, Double> priceMap = new HashMap<Integer, Double>();
		for(Materials materials: componentList){
			Integer id = materials.getTypeID();
			String price = prop.getProperty(String.valueOf(id));
			if(price != null){
				priceMap.put(id, Double.parseDouble(price));
			}
			else{
				System.out.println("Price for typeID not found: " + id);
//				priceMap.put(id, null);
			}
		}
		return priceMap;
	}
	
	
	

}
