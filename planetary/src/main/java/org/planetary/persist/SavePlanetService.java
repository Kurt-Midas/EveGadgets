package org.planetary.persist;

import org.apache.ibatis.session.SqlSession;
import org.servicelayer.factory.MyBatisConnectionFactory;
import org.servicelayer.models.PersistPlanetDomain;
import org.springframework.ui.ModelMap;

public class SavePlanetService {
	private static SqlSession session = null;
	
	static{
		session = MyBatisConnectionFactory.getSqlSessionFactory().openSession();
	}
	
	public enum ResponseCodes{
		//no, I don't know why I'm doing this. Doesn't matter had success 
		SUCCESS(0, "Success"),
		FAILURE(1, "Unqualified Failure"),
		EXISTS(2, "Setup Hash Exists"),
		COLLISION(3, "Hash Collision, please kill the developer");
		
		private int code;
		private String message;
		private ResponseCodes(int code, String message){
			this.code = code;
			this.message = message;
		}
		public int getCode(){
			return code;
		}
		public String getMessage(){
			return message;
		}
	}
	
	public static ModelMap savePlanetSetup(PersistPlanetDomain planetSetup) {
//		System.out.println("Inside SavePlanetService");
		ModelMap modelMap = new ModelMap();
		Integer hashKey = planetSetup.getHashKey();
		PersistPlanetDomain existing = getSetupFromKey(hashKey);
		if(existing != null){
//			System.out.println("hash already exists in DB");
			if(!existing.getSetup().equals(planetSetup.getSetup())){
				System.out.println("MASSIVE FUCKING FAILURE, COLLIDING HASHES: \n" 
					+ planetSetup.toString() + "\n" + existing.toString());
				modelMap.addAttribute("key", null);
				modelMap.addAttribute("status", ResponseCodes.COLLISION.getMessage());
				return modelMap;
			}
			refreshCreatedDate(planetSetup.getHashKey());
			modelMap.addAttribute("key", hashKey);
			modelMap.addAttribute("status", ResponseCodes.EXISTS.getMessage());
			return modelMap;
		}
		try{
//			System.out.println("DB call to save planet");
			int result = savePlanet(planetSetup);
//			System.out.println("After DB call to save planet, result code: " + result);
			//what do the responses mean? WHAT DOES IT ALL MEAN?!
		}catch(Exception e){
			System.out.println("Failure in SavePlanetService.savePlanetSetup: " + e.getMessage());
			modelMap.addAttribute("key", null);
			modelMap.addAttribute("status", ResponseCodes.FAILURE.getMessage());
			return modelMap;
		}
		modelMap.addAttribute("key", hashKey);
		modelMap.addAttribute("status", ResponseCodes.SUCCESS.getMessage());
		return modelMap;
	}
	
	public static ModelMap getSetup(int urlKey){
		ModelMap response = new ModelMap();
		try{
			PersistPlanetDomain setup = getSetupFromKey(urlKey);
			response.addAttribute("setup", setup);
			refreshCreatedDate(urlKey);
			response.addAttribute("MESSAGE", ResponseCodes.SUCCESS);
		}catch(Exception e){
			response.addAttribute("ERROR", ResponseCodes.FAILURE);
		}
		return response;
	}
	
	private static int savePlanet(PersistPlanetDomain planetSetup){
		int response = session.insert("PlanetPersistence.savePlanet", planetSetup);
		session.commit();
		return response;
	}
	
	private static PersistPlanetDomain getSetupFromKey(int hashKey){
		return session.selectOne("PlanetPersistence.getPlanet", hashKey);
	}
	
	private static int refreshCreatedDate(int hashKey){
		int response = session.update("PlanetPersistence.refreshCreatedDate", hashKey);
		session.commit();
		return response;
	}
	
	/*public static List<SchematicDomain> getSchematicsList(){
		return session.selectList("Schematics.getSchematics");
	}*/
	
	
}
