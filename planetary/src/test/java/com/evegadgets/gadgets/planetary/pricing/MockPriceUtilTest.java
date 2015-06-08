package com.evegadgets.gadgets.planetary.pricing;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.runners.MockitoJUnitRunner;

@RunWith(MockitoJUnitRunner.class)
public class MockPriceUtilTest {
	
	@Test
	public void testGetPriceMap(){
		List<Integer> typeList = new ArrayList<Integer>();
		typeList.add(2393);
		typeList.add(2396);
		Map<Integer, PriceMap> result = MockPriceUtil.getPriceMap(typeList, null);
		System.out.println(result.toString());
	}
}
