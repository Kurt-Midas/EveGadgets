package org.servicelayer.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.servicelayer.access.PlanetsCaller;
import org.servicelayer.models.PlanetDomain;
import org.servicelayer.models.ResourceDomain;

public class PlanetDAO {
	
	
	public static Map<Integer,PlanetDomain> getPlanets(){
		List<PlanetDomain> planetList = PlanetsCaller.getPlanets();
		Map<Integer, PlanetDomain> planetMap = new HashMap<Integer, PlanetDomain>();
		for(PlanetDomain p: planetList){
			planetMap.put(p.getId(), p);
		}
		return planetMap;
	}
	
	public static Map<Integer, ResourceDomain> getResources(){
		List<ResourceDomain> resourceList = PlanetsCaller.getResources();
		Map<Integer, ResourceDomain> resourceMap = new HashMap<Integer, ResourceDomain>();
		for(ResourceDomain r: resourceList){
			resourceMap.put(r.getId(), r);
		}
		return resourceMap;
	}
}