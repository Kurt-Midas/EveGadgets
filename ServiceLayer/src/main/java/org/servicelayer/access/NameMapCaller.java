package org.servicelayer.access;

import java.util.List;

import org.servicelayer.models.NameMapDomain;
import org.servicelayer.shameful.SessionHolder;

public class NameMapCaller {

	public static List<NameMapDomain> getNameMap() {
		List<NameMapDomain> result 
			= SessionHolder.useSession().selectList("NameMap.getPlanetResourceNameMap");
		return result;
	}

}
