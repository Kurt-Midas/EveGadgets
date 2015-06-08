package com.evegadgets.gadgets.webapp.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/*import pricing.MockPriceUtil;
import pricing.PriceMap;*/



import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.evegadgets.gadgets.planetary.pricing.MockPriceUtil;
import com.evegadgets.gadgets.planetary.pricing.PriceMap;

@RestController
@RequestMapping("/priceAPI")
public class PriceAPIController {
	
	@RequestMapping("")
	public Map<Integer, PriceMap> getPriceMap(
			@RequestParam(value="typeList") String[] types){
		System.out.println("DEBUG: in getPriceMap with arg: <" + types + ">");
		List<Integer> typeList = new ArrayList<Integer>();
		for(String type : types){
			try{
				typeList.add(Integer.parseInt(type));
			} catch(Exception e){
				System.out.println("ERROR: PriceAPIController bad type: <" + type + ">, "
						+ "Message = " + e.getMessage());
			}
		}
		return MockPriceUtil.getPriceMap(typeList, 0);
	}

	//public static List<Materials> getMaterials(@RequestParam (value="typeId", defaultValue="21506") String type){
}
