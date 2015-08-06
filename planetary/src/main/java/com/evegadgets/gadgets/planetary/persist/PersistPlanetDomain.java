package com.evegadgets.gadgets.planetary.persist;

public class PersistPlanetDomain {
	private Integer hashKey;
	private String setup;
	private String lastRefreshDate; //no idea what to do with this
	
	public Integer calculateHashKey(){
		if(setup == null){
			return null;
		}
		hashKey = setup.hashCode();
		return getHashKey();
	}
	public Integer getHashKey() {
		return hashKey;
	}
	public void setHashKey(Integer hashKey) {
		this.hashKey = hashKey;
	}
	public String getSetup() {
		return setup;
	}
	public void setSetup(String setup) {
		this.setup = setup;
	}
	public String getLastRefreshDate() {
		return lastRefreshDate;
	}
	public void setLastRefreshDate(String lastRefreshDate) {
		this.lastRefreshDate = lastRefreshDate;
	}
}
