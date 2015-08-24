package org.planetary.persist;

import java.io.IOException;

import org.servicelayer.models.PersistPlanetDomain;
import org.springframework.ui.ModelMap;
import org.planetary.persist.SavePlanetService.ResponseCodes;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;

public class SaveSetupDAO {
	
	public static String persistSetupAndGetUrl(CompleteSetupContainer jsonSetup){
		//TODO: Make all return null statements into throw exceptions. Add logging. 
		String saveString = null;
//		ObjectWriter ow = new ObjectMapper().writer();//.withDefaultPrettyPrinter();
		ObjectMapper ow = new ObjectMapper();
		try {
			saveString = ow.writeValueAsString(jsonSetup);
			//logger?
//			System.out.println("SaveSetupDAO | persistSetupAndGetURL | Setup String: " 
//				+ saveString); 
			PersistPlanetDomain planetSetup = new PersistPlanetDomain();
			planetSetup.setSetup(saveString);
			if(planetSetup.calculateHashKey() == null){
				System.out.println("Failed to calculate hashKey at SaveSetupDAO.persistSetupAndGetUrl");
				return null; //calculateHashKey is the calculation here
			}
//			System.out.println("Save planet service Call");
			ModelMap response = SavePlanetService.savePlanetSetup(planetSetup);
//			System.out.println("After save planet service Call: "+ response.toString());
			if(response.get("key") != null){
				return ((Integer)response.get("key")).toString();
			}
			else{
				System.out.println("Failed save planet service call" + response.get("status"));
				return null;
			}
		} catch (JsonProcessingException e) {
			System.out.println("JsonProcessingException in SaveSetupDAO.persistSetupAndGetUrl");
			return null;
		}
	}
	
	public static CompleteSetupContainer getSetupFromKey(int urlKey){
		ModelMap response = SavePlanetService.getSetup(urlKey);
		if(response.containsKey("ERROR")){
			return null; //TODO:
		}
		if(response.containsKey("setup")){
			PersistPlanetDomain reply = (PersistPlanetDomain) response.get("setup");
			if(reply.getHashKey() == urlKey){
				ObjectMapper om = new ObjectMapper();
//				om.convertValue(reply.getSetup(), CompleteSetupContainer.class);
				try {
					CompleteSetupContainer container = 
							om.readValue(reply.getSetup(), CompleteSetupContainer.class);
					return container;
				} catch (JsonParseException e) {
					System.out.println("JsonParseException");
					return null;
				} catch (JsonMappingException e) {
					System.out.println("JsonMappingException");
					return null;
				} catch (IOException e) {
					System.out.println("IOException");
					return null;
				}
//				return reply.getSetup();
			}
			else{
				System.out.println("hashes don't match, wtf");
				return null;
			}
		}
		return null;
	}

}
