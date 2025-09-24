import { useAuth } from '@/hook/useAuth';
import { history, Outlet } from 'umi';

export default ():any => {
  const { isLogin } = useAuth();
  
  if (isLogin) {
    return <Outlet />
  } else {
    return  history.replace('/login'); // ;
  }
};