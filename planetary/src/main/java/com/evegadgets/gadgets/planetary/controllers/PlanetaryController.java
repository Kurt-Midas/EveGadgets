package com.evegadgets.gadgets.planetary.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.evegadgets.gadgets.planetary.domain.FullInfoDomain;
import com.evegadgets.gadgets.planetary.structure.itemdetails.ItemDetailsDAO;
import com.evegadgets.gadgets.planetary.structure.namemap.NameMapDAO;
import com.evegadgets.gadgets.planetary.structure.planets.PlanetDAO;
import com.evegadgets.gadgets.planetary.structure.schematics.SchematicDAO;

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
