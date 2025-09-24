import { history, Link, useLocation } from 'umi';
import styles from './index.less';
import { useStore } from '@/store';
import { useEffect, useState } from 'react';

const data1 = [{
  id: 1,
  title: '首页',
  icon: '',
  aIcon: '',
  link: '/',
},{
  id: 2,
  title: '项目看板',
  icon: '',
  aIcon: '',
  link: '/project',
},{
  id: 3,
  title: '进度管理',
  icon: '',
  aIcon: '',
  link: '/progress',
},{
  id: 4,
  title: '数据看板',
  icon: '',
  aIcon: '',
  link: '/dashboard',
},{
  id: 5,
  title: '人员分配',
  icon: '',
  aIcon: '',
  link: '/personnel',
}]

const data2 = {
  id: 6,
  title: '用户管理',
  icon: '',
  aIcon: '',
  link: '/user',
}

const Navs = () => {
   const {
    userInfo,
    setUserInfo
  } = useStore((state: any) => state);
  const [pathUrl,usePathUrl] = useState('/');

  const location = useLocation();

  useEffect(() => {
    usePathUrl(location.pathname);
  },[location])

  const handOut = () => {
    setUserInfo({})
    console.log(11)
    // history.replace('/login')
  }

  const handItem = (t: any) => {
    history.push(t.link)
  }

  return (
    <div className={styles.nav}>
      <div className={styles.navLeft}>
        <img className={styles.navLeftImg} src={require('@/assets/images/logo.png')} alt="" />
        <span className={styles.navLeftSpan}>数境设计交互平台</span>
      </div>
      <div className={styles.navList}>
         {data1.map(t => {
          return <div 
           className={`${styles.navItem} ${t.link === pathUrl && styles.active}`}
           key={t.id}
           onClick={()=>handItem(t)}
           >
            <img  className={styles.navItemImg} src={t.link ===pathUrl  ? t.aIcon : t.icon} alt="" />
            <div className={styles.navItemSpan} >{t.title}</div>
          </div>
         })}
      </div > 
       <div 
        className={`${styles.navItem} ${styles.navUser} ${data2.link ===pathUrl && styles.active}`}
        onClick={()=>handItem(data2)}
        >
        <img  className={styles.navItemImg} src={data2.link === pathUrl  ? data2.aIcon : data2.icon} alt="" />
        <div className={styles.navItemSpan} >{data2.title}</div>
      </div>
      <div className={styles.navRight}>
        <span className={styles.navRightSpan}>{userInfo.name}</span>
        <img 
          className={styles.navRightImg}
          src={require('@/assets/images/out.png')}
          alt=""
          onClick={()=>handOut()} />
      </div>
      {/* <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/docs">Docs</Link>
        </li>
      </ul> */}
    </div>
  );
};

export default Navs;
