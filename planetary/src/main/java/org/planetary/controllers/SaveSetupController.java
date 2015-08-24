package org.planetary.controllers;

import java.util.Map.Entry;

import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import org.planetary.persist.CompleteSetupContainer;
import org.planetary.persist.SaveSetupDAO;

@RestController
@RequestMapping("/persist")
public class SaveSetupController {
	
	@RequestMapping("/testSaveSetup")
	public void saveSetup(@RequestBody final ModelMap jsonSetup){
		System.out.println("testSaveSetup endpoint: " + jsonSetup.toString());
		for(Entry<String, Object> entry : jsonSetup.entrySet()){
			System.out.println("entry: " + entry.getKey() + ", " + entry.getValue().toString());
		}
	}

	@RequestMapping("/saveSetup")
	public ModelMap saveSetup(@RequestBody final CompleteSetupContainer jsonSetup){
		if(jsonSetup == null){
			System.out.println("\n\nERROR: saveSetup | argument is null\n");
			return null;
		}
//		System.out.println(jsonSetup.toString());
//		System.out.println("pl size: " + jsonSetup.getPl().size());
		ModelMap reply = new ModelMap();
		
		if(jsonSetup.getPl() != null && jsonSetup.getPl().size() > 0){
			String replyString = SaveSetupDAO.persistSetupAndGetUrl(jsonSetup);
			if(replyString != null && !replyString.isEmpty()){
				reply.addAttribute("KEY", replyString);
			}else{
				reply.addAttribute("ERROR", "Unknown failure persisting setup");
			}
			return reply;
		}
		else{
			reply.addAttribute("ERROR", "Planet list cannot be empty");
			return reply;
		}
	}
	
	@RequestMapping("/getSetupByGet")
	public ModelMap getSetupByGet(@RequestParam final String id){
		return getSetup(id);
	}
	
	@RequestMapping("/getSetup")
	public ModelMap getSetup(@RequestBody final String id){
		ModelMap response = new ModelMap();
		int requestId = 0;
		try{
			requestId = Integer.parseInt(id);
		}catch (NumberFormatException e){
			response.addAttribute("ERROR", "INVALID");
			return response;
		}
		CompleteSetupContainer setup = SaveSetupDAO.getSetupFromKey(requestId);
		if(setup != null){
			response.addAttribute("setup", setup);
		}else{
			response.addAttribute("ERROR", "NO_DATA");
		}
		return response;
	}
	
	@RequestMapping("/test")
	public String testPersistEndpoint(){
		return "SaveSetupController endpoints work";
	}
}
