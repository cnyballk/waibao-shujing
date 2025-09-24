import {  Outlet } from 'umi';
import fullScreen from '@cnyballk/full-screen';
import {ConfigProvider} from 'antd';
import zhCN from 'antd/locale/zh_CN';
import Navs from '@/components/navs';
import styles from './index.less';
// import 'antd/dist/antd.css'; // 引入 Ant Design 样式文件
 const style = {
  width: 1920,
  height: 1080,
};

const Layout = () => {
  
  return (
    <div className={styles.layout} id="layout">
      <ConfigProvider
       locale={zhCN}
       getPopupContainer={() => {
        return document.getElementById('layout'); // 如果没有找到合适的容器，返回 document.body
      }}
     >
        <Navs />
        <Outlet />
      </ConfigProvider>
    </div>
  );
}


export default fullScreen({ style, mode: 1 })(Layout);
