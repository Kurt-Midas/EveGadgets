package com.evegadgets.gadgets.webapp.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.priceutils.calls.EveCentralHandler;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.evegadgets.gadgets.planetary.pricing.MockPriceUtil;
import com.evegadgets.gadgets.planetary.pricing.PriceMap;

@RestController
@RequestMapping("/priceAPI")
public class PriceAPIController {
	
	@RequestMapping("/mock")
	public Map<Integer, PriceMap> getMockPriceMap(
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

	@RequestMapping("")
	public ModelMap getPriceMap(
			@RequestParam(value="type") String[] types,
			@RequestParam(value="system") String[] systems){
		List<Integer> typeList = new ArrayList<Integer>();
		List<Integer> systemList = new ArrayList<Integer>();
		
		if(types.length == 0){
			return null;
		}
		if(systems.length == 0){
			systemList.add(30000142); //default system is Jita
		}
		for(String type : types){
			try{
				typeList.add(Integer.parseInt(type));
			}catch(Exception e){
				System.out.println("Failed to parse type: " + type);
				}
		}
		for(String system: systems){
			try{
				systemList.add(Integer.parseInt(system));
			}catch(Exception e){
				System.out.println("Failed to parse system: " + system);
				}
		}
		try {
			return EveCentralHandler.getMarketStatDisplays(typeList, systemList);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

}
