package org.priceutils.displays;

public class MarketStatInfoContainer {
	private int volume;
	private double wavg;
	private double avg;
	private double variance;
	private double stdDev;
	private double median;
	private double fivePercent;
	private double max;
	private double min;
	private int generated;
	
	public MarketStatInfoContainer(){
		super();
	}
	
	public MarketStatInfoContainer(int volume,
			double wavg, double avg, double variance,
			double stdDev, double median, double fivePercent,
			double max,	double min,	int generated){
		this.volume = volume;
		this.wavg = wavg;
		this.avg = avg;
		this.variance = variance;
		this.stdDev = stdDev;
		this.median = median;
		this.fivePercent = fivePercent;
		this.max = max;
		this.min = min;
		this.generated = generated;
	}
	
	public int getGenerated() {
		return generated;
	}
	public void setGenerated(int generated) {
		this.generated = generated;
	}
	public double getMin() {
		return min;
	}
	public void setMin(double min) {
		this.min = min;
	}
	public double getMax() {
		return max;
	}
	public void setMax(double max) {
		this.max = max;
	}
	public double getFivePercent() {
		return fivePercent;
	}
	public void setFivePercent(double fivePercent) {
		this.fivePercent = fivePercent;
	}
	public double getMedian() {
		return median;
	}
	public void setMedian(double median) {
		this.median = median;
	}
	public double getStdDev() {
		return stdDev;
	}
	public void setStdDev(double stdDev) {
		this.stdDev = stdDev;
	}
	public double getVariance() {
		return variance;
	}
	public void setVariance(double variance) {
		this.variance = variance;
	}
	public double getAvg() {
		return avg;
	}
	public void setAvg(double avg) {
		this.avg = avg;
	}
	public double getWavg() {
		return wavg;
	}
	public void setWavg(double wavg) {
		this.wavg = wavg;
	}
	public int getVolume() {
		return volume;
	}
	public void setVolume(int volume) {
		this.volume = volume;
	}

}
