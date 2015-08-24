package org.servicelayer.access;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.servicelayer.factory.MyBatisConnectionFactory;
import org.servicelayer.models.ReprocessRecipeDomain;

public class ReprocessCaller {
	
	private static SqlSession session = null;
	
	static{
		session = MyBatisConnectionFactory.getSqlSessionFactory().openSession();
	}
//	Reprocessor
//	getByTypeIdList
//	getByNameList	
	public static List<ReprocessRecipeDomain> getRecipesFromNames(List<String> nameList){
		List<ReprocessRecipeDomain> result
			= session.selectList("Reprocessor.getByNameList", nameList);
		return result;
	}
	
	public static List<ReprocessRecipeDomain> getRecipesFromTypeIDs(List<Integer> idList){
		List<ReprocessRecipeDomain> result
			= session.selectList("Reprocessor.getByNameList", idList);
		return result;
	}

}
