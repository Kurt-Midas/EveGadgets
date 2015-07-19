package org.priceutils.models;

public class MarketStatInfo {
	private MarketStatQuery forQuery;
	private int volume;
	private double wavg;
	private double avg;
	private double variance;
	private double stdDev;
	private double median;
	private double fivePercent;
	private double max;
	private double min;
	private boolean highToLow;
	private int generated;
	
	public MarketStatQuery getForQuery() {
		return forQuery;
	}
	public void setForQuery(MarketStatQuery forQuery) {
		this.forQuery = forQuery;
	}
	public int getVolume() {
		return volume;
	}
	public void setVolume(int volume) {
		this.volume = volume;
	}
	public double getWavg() {
		return wavg;
	}
	public void setWavg(double wavg) {
		this.wavg = wavg;
	}
	public double getAvg() {
		return avg;
	}
	public void setAvg(double avg) {
		this.avg = avg;
	}
	public double getVariance() {
		return variance;
	}
	public void setVariance(double variance) {
		this.variance = variance;
	}
	public double getStdDev() {
		return stdDev;
	}
	public void setStdDev(double stdDev) {
		this.stdDev = stdDev;
	}
	public double getMedian() {
		return median;
	}
	public void setMedian(double median) {
		this.median = median;
	}
	public double getFivePercent() {
		return fivePercent;
	}
	public void setFivePercent(double fivePercent) {
		this.fivePercent = fivePercent;
	}
	public double getMax() {
		return max;
	}
	public void setMax(double max) {
		this.max = max;
	}
	public double getMin() {
		return min;
	}
	public void setMin(double min) {
		this.min = min;
	}
	public boolean isHighToLow() {
		return highToLow;
	}
	public void setHighToLow(boolean highToLow) {
		this.highToLow = highToLow;
	}
	public int getGenerated() {
		return generated;
	}
	public void setGenerated(int generated) {
		this.generated = generated;
	}
}
