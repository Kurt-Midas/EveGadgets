package org.priceutils.displays;

public class MarketStatTypeDisplay {
	private MarketStatInfoContainer all;
	private MarketStatInfoContainer buy;
	private MarketStatInfoContainer sell;
	
	public MarketStatTypeDisplay(MarketStatInfoContainer all, 
			MarketStatInfoContainer buy, 
			MarketStatInfoContainer sell){
		this.all = all;
		this.buy = buy;
		this.sell = sell;
	}

	public MarketStatInfoContainer getAll() {
		return all;
	}
	public void setAll(MarketStatInfoContainer all) {
		this.all = all;
	}
	public MarketStatInfoContainer getBuy() {
		return buy;
	}
	public void setBuy(MarketStatInfoContainer buy) {
		this.buy = buy;
	}
	public MarketStatInfoContainer getSell() {
		return sell;
	}
	public void setSell(MarketStatInfoContainer sell) {
		this.sell = sell;
	}

}
