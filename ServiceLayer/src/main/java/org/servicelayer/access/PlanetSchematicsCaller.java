package org.servicelayer.access;

import java.util.List;

import org.servicelayer.models.SchematicDomain;
import org.servicelayer.shameful.SessionHolder;

public class PlanetSchematicsCaller {

	
	public static List<SchematicDomain> getSchematicsList(){
		return SessionHolder.useSession().selectList("Schematics.getSchematics");
	}
}
