package com.evegadgets.gadgets.planetary.structure.namemap;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;

import com.evegadgets.gadgets.planetary.mybatis.factory.MyBatisConnectionFactory;

public class NameMapDAO {
	private static SqlSession session = null;
	
	static{
		session = MyBatisConnectionFactory.getSqlSessionFactory().openSession();
	}
	
	public static Map<String, Integer> getNames(){
		List<NameMapDomain> names = session.selectList("NameMap.getNameMap");
		Map<String, Integer> nameMap = new HashMap<String, Integer>();
		for(NameMapDomain m: names){
			nameMap.put(m.getName(), m.getId());
		}
		return nameMap;
	}
	
	/*
		public static List<PlanetDomain>getPlanets(){
		List<PlanetDomain> planetList = session.selectList("Planets.getPlanets");
		System.out.println(planetList);
		return planetList;
	}

	 */
}
