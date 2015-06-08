package com.evegadgets.gadgets.planetary.structure.itemdetails;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;

import com.evegadgets.gadgets.planetary.mybatis.factory.MyBatisConnectionFactory;

public class ItemDetailsDAO {
	private static SqlSession session = null;
	
	static{
		session = MyBatisConnectionFactory.getSqlSessionFactory().openSession();
	}
	
	public static Map<Integer, ItemDetailsDomain> getItemDetails(){
		List<ItemDetailsDomain> itemDetailsList = session.selectList("ItemDetails.getItemDetailsList");
		Map<Integer, ItemDetailsDomain> resultMap = new HashMap<Integer, ItemDetailsDomain>();
		for(ItemDetailsDomain d : itemDetailsList){
			resultMap.put(d.getTypeID(), d);
		}
		return resultMap;
	}
}
