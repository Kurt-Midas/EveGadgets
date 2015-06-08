package com.evegadgets.gadgets.webapp.controllers;

import java.util.List;
import java.util.Map;

/*import structure.planets.PlanetDAO;
import structure.planets.PlanetDomain;
import structure.schematics.SchematicDAO;
import structure.schematics.SchematicDomain;*/

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class TestingController {
	
	@RequestMapping("")
	public String getCreed(){
		String response = "";
		response += "<p>Ever since One knew Zero and begat The Computer have we knelt to it and "
				+ "wept, screamed at it, and prayed:</p>"
				+ "<p>Keep Working;</p>"
				+ "<p>Don't Hang;</p>"
				+ "<p>Protect our precious data.</p>"
				+ "<p> - Brother Turing, \"Address to the Initiates,\" New Berkeley</p>";
		return response;
	}
/*
	@RequestMapping("/planets")
	public Map<Integer, PlanetDomain> testPlanetsDAO(){
		Map<Integer, PlanetDomain> planetMap = PlanetDAO.getPlanets();
		return planetMap;
	}
	
	@RequestMapping("/schematicsList")
	public List<SchematicDomain> testSchematicList(){
		List<SchematicDomain> schematicList = SchematicDAO.getSchematicsList();
		return schematicList;
	}
	
	@RequestMapping("/schematicsMap")
	public Map<Integer, SchematicDomain> testSchematicMap(){
		return SchematicDAO.getSchematicsMap();
	}
	
	*/
}
