package com.evegadgets.gadgets.planetary.persist;

public class FactorySetupContainer{
	private Integer s; //schematic
	private Integer n; //number
	private Double a; //avgActiveCycles
	
	public void setS(Integer s){
		this.s = s;
	}
	public Integer getS(){
		return s;
	}
	public void setN(Integer n){
		this.n = n;
	}
	public Integer getN(){
		return n;
	}
	public void setA(Double a){
		this.a = a;
	}
	public Double getA(){
		return a;
	}
}
