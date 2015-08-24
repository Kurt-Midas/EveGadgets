package org.servicelayer.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.servicelayer.access.PlanetSchematicsCaller;
import org.servicelayer.models.SchematicDomain;

public class SchematicDAO {
	
	public static Map<Integer, SchematicDomain> getSchematicsMap(){
		List<SchematicDomain> schematicsList = PlanetSchematicsCaller.getSchematicsList();
		Map<Integer, SchematicDomain> schematicsMap = new HashMap<Integer, SchematicDomain>();
		for(SchematicDomain s: schematicsList){
			schematicsMap.put(s.getOutputID(), s);
		}
		return schematicsMap;
	}
}
