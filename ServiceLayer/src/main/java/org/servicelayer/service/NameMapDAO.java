package org.servicelayer.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.servicelayer.access.NameMapCaller;
import org.servicelayer.models.NameMapDomain;

public class NameMapDAO {
	
	public static Map<String, Integer> getNames(){
		List<NameMapDomain> names = NameMapCaller.getNameMap();
		Map<String, Integer> nameMap = new HashMap<String, Integer>();
		for(NameMapDomain m: names){
			nameMap.put(m.getName(), m.getId());
		}
		return nameMap;
	}
	
}
