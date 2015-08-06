package com.evegadgets.gadgets.planetary.persist;

import java.util.List;

public class CompleteSetupContainer {

	private int is; // system
	private int es; 
	private String io; //orderType
	private String eo;
	private String im; //marketStatType
	private String em;
	private double ib; //brokerfees
	private double eb;
	private double it; //salestax
	private double et;
	
	private List<PlanetSetupContainer> pl;
	
	public List<PlanetSetupContainer> getPl() {
		return pl;
	}

	public void setPl(List<PlanetSetupContainer> pl) {
		this.pl = pl;
	}

	public int getIs() {
		return is;
	}

	public void setIs(int is) {
		this.is = is;
	}

	public int getEs() {
		return es;
	}

	public void setEs(int es) {
		this.es = es;
	}

	public String getIo() {
		return io;
	}

	public void setIo(String io) {
		this.io = io;
	}

	public String getEo() {
		return eo;
	}

	public void setEo(String eo) {
		this.eo = eo;
	}

	public String getIm() {
		return im;
	}

	public void setIm(String im) {
		this.im = im;
	}

	public String getEm() {
		return em;
	}

	public void setEm(String em) {
		this.em = em;
	}

	public double getIb() {
		return ib;
	}

	public void setIb(double ib) {
		this.ib = ib;
	}

	public double getEb() {
		return eb;
	}

	public void setEb(double eb) {
		this.eb = eb;
	}

	public double getIt() {
		return it;
	}

	public void setIt(double it) {
		this.it = it;
	}

	public double getEt() {
		return et;
	}

	public void setEt(double et) {
		this.et = et;
	}
	
}
