package com.evegadgets.gadgets.planetary.persist;

import java.util.List;

public class PlanetSetupContainer {
	private List<FactorySetupContainer> b;
	private List<FactorySetupContainer> a;
	private List<FactorySetupContainer> h;
	private List<ExtractorSetupContainer> e;
	
	private Integer s; //storagefacilities
	private Integer p; //pads
	private Boolean r; //restrictPads
	private Integer t; //taxRate
	private Integer l; //level
	private Integer n; //liNk length
	private Double v; //avg active cycles
	private Boolean f; //isFactoryPlanet
	private String x; //text
	
	public List<FactorySetupContainer> getB() {
		return b;
	}
	public void setB(List<FactorySetupContainer> b) {
		this.b = b;
	}
	public List<FactorySetupContainer> getA() {
		return a;
	}
	public void setA(List<FactorySetupContainer> a) {
		this.a = a;
	}
	public List<FactorySetupContainer> getH() {
		return h;
	}
	public void setH(List<FactorySetupContainer> h) {
		this.h = h;
	}
	public List<ExtractorSetupContainer> getE() {
		return e;
	}
	public void setE(List<ExtractorSetupContainer> e) {
		this.e = e;
	}
	public Integer getS() {
		return s;
	}
	public void setS(Integer s) {
		this.s = s;
	}
	public Integer getP() {
		return p;
	}
	public void setP(Integer p) {
		this.p = p;
	}
	public Boolean getR() {
		return r;
	}
	public void setR(Boolean r) {
		this.r = r;
	}
	public Integer getT() {
		return t;
	}
	public void setT(Integer t) {
		this.t = t;
	}
	public Integer getL() {
		return l;
	}
	public void setL(Integer l) {
		this.l = l;
	}
	public Integer getN() {
		return n;
	}
	public void setN(Integer n) {
		this.n = n;
	}
	public Double getV() {
		return v;
	}
	public void setV(Double v) {
		this.v = v;
	}
	public Boolean getF() {
		return f;
	}
	public void setF(Boolean f) {
		this.f = f;
	}
	public String getX() {
		return x;
	}
	public void setX(String x) {
		this.x = x;
	}
	

}
