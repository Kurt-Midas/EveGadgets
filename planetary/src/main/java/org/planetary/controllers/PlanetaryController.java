package org.planetary.controllers;

import org.servicelayer.models.FullInfoDomain;
import org.servicelayer.service.ItemDetailsDAO;
import org.servicelayer.service.NameMapDAO;
import org.servicelayer.service.PlanetDAO;
import org.servicelayer.service.SchematicDAO;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/planetary")
public class PlanetaryController {
	
	
	@RequestMapping("")
	public FullInfoDomain testController(){
		return new FullInfoDomain(
			SchematicDAO.getSchematicsMap(),
			PlanetDAO.getPlanets(),
			PlanetDAO.getResources(),
			NameMapDAO.getNames(),
			ItemDetailsDAO.getItemDetails());
	}
	
//	public static List<Materials> getMaterials(@RequestParam (value="typeId", defaultValue="21506") String type){
}
