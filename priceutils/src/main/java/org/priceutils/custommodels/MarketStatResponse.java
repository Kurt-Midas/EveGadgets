package org.priceutils.custommodels;

import org.priceutils.models.MarketStatInfo;
import org.priceutils.models.MarketStatQuery;

public class MarketStatResponse {

	private MarketStatQuery query;
	private MarketStatInfo buy;
	private MarketStatInfo sell;
	private MarketStatInfo all;
	public MarketStatResponse(MarketStatQuery query, MarketStatInfo buy, MarketStatInfo sell, MarketStatInfo all){
		this.query = query;
		this.buy = buy;
		this.sell = sell;
		this.all = all;
	}
	public MarketStatQuery getQuery() {
		return query;
	}
	public void setQuery(MarketStatQuery query) {
		this.query = query;
	}
	public MarketStatInfo getBuy() {
		return buy;
	}
	public void setBuy(MarketStatInfo buy) {
		this.buy = buy;
	}
	public MarketStatInfo getSell() {
		return sell;
	}
	public void setSell(MarketStatInfo sell) {
		this.sell = sell;
	}
	public MarketStatInfo getAll() {
		return all;
	}
	public void setAll(MarketStatInfo all) {
		this.all = all;
	}
}
