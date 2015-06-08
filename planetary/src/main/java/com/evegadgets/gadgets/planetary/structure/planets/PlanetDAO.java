package com.evegadgets.gadgets.planetary.structure.planets;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;

import com.evegadgets.gadgets.planetary.mybatis.factory.MyBatisConnectionFactory;

public class PlanetDAO {
	
	private static SqlSession session = null;
	
	static{
		session = MyBatisConnectionFactory.getSqlSessionFactory().openSession();
	}
	
	public static Map<Integer,PlanetDomain> getPlanets(){
		List<PlanetDomain> planetList = session.selectList("Planets.getPlanets");
		Map<Integer, PlanetDomain> planetMap = new HashMap<Integer, PlanetDomain>();
		for(PlanetDomain p: planetList){
			planetMap.put(p.getId(), p);
		}
		return planetMap;
	}
	
	public static Map<Integer, ResourceDomain> getResources(){
		List<ResourceDomain> resourceList = session.selectList("Planets.getResources");
		Map<Integer, ResourceDomain> resourceMap = new HashMap<Integer, ResourceDomain>();
		for(ResourceDomain r: resourceList){
			resourceMap.put(r.getId(), r);
		}
		return resourceMap;
	}
}