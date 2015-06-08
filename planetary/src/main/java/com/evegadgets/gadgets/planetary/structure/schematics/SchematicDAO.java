package com.evegadgets.gadgets.planetary.structure.schematics;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;

import com.evegadgets.gadgets.planetary.mybatis.factory.MyBatisConnectionFactory;

public class SchematicDAO {

	private static SqlSession session = null;
	
	static{
		session = MyBatisConnectionFactory.getSqlSessionFactory().openSession();
	}
	
	public static List<SchematicDomain> getSchematicsList(){
		return session.selectList("Schematics.getSchematics");
	}
	
	public static Map<Integer, SchematicDomain> getSchematicsMap(){
		List<SchematicDomain> schematicsList = getSchematicsList();
		Map<Integer, SchematicDomain> schematicsMap = new HashMap<Integer, SchematicDomain>();
		for(SchematicDomain s: schematicsList){
			schematicsMap.put(s.getOutputID(), s);
		}
		return schematicsMap;
	}
}
