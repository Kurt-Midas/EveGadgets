package org.servicelayer.shameful;

import org.apache.ibatis.session.SqlSession;
import org.servicelayer.factory.MyBatisConnectionFactory;

public class SessionHolder {
	
	private static SqlSession session = null;
	
	static{
		session = MyBatisConnectionFactory.getSqlSessionFactory().openSession();
	}
	
	public static SqlSession useSession(){
		return session;
	}

}
