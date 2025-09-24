import { useStore } from "@/store";
import { useEffect, useState } from "react";

// useAuth Hook实现
export function useAuth() {
	const {
		userInfo
	} = useStore((state: any) => state);
	// const [getUser, setUser, subscribe] = useState(null);
	// const [getLoading, setLoading, subscribeLoading] = useState(true);

	// // 模拟从localStorage获取用户信息
	// useEffect(() => {
	//     const userData = localStorage.getItem('user');
	//     if (userData) {
	//         setUser(JSON.parse(userData));
	//     }
	//     setLoading(false);
	// }, []);

	// // 登录方法
	// const login = async (username, password) => {
	//     setLoading(true);

	//     // 模拟API调用
	//     return new Promise((resolve, reject) => {
	//         setTimeout(() => {
	//             if (username === 'admin' && password === 'password') {
	//                 const user = { 
	//                     id: 1, 
	//                     username: 'admin', 
	//                     name: '管理员',
	//                     role: 'admin',
	//                     permissions: ['dashboard', 'users', 'settings']
	//                 };
	//                 setUser(user);
	//                 localStorage.setItem('user', JSON.stringify(user));
	//                 resolve(user);
	//             } else {
	//                 reject(new Error('用户名或密码错误'));
	//             }
	//             setLoading(false);
	//         }, 1000);
	//     });
	// };

	// // 登出方法
	// const logout = () => {
	//     setUser(null);
	//     localStorage.removeItem('user');
	// };

	// // 检查权限
	// const hasPermission = (permission) => {
	//     const user = getUser();
	//     return user && user.permissions.includes(permission);
	// };

	return {
		isLogin: userInfo.isLogin
		// loading: getLoading(),
		// login,
		// logout,
		// hasPermission
	};
}



