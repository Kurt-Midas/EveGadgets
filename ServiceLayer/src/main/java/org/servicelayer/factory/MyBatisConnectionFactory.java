package org.servicelayer.factory;

import java.io.Reader;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

public class MyBatisConnectionFactory {

	private static SqlSessionFactory sessionFactory;
	
	static{
		try{
			String resource = "MyBatisConfig.xml";
			Reader reader = Resources.getResourceAsReader(resource);
			if(sessionFactory == null){
				sessionFactory = new SqlSessionFactoryBuilder().build(reader);
			}
		}catch(Exception e){e.printStackTrace();}
	}
	
	public static SqlSessionFactory getSqlSessionFactory(){
		return sessionFactory;
	}
}
