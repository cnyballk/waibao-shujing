import styles from './index.less';
import './auto.less';
import { useState } from 'react';
import ModalCom from './modalCom'

const data1 = [{
  img: require('@/assets/images/pro.png'),
  id: 1,
  name: '岗厦北地铁站1',
  time: '创建：2025/08/26',
},{
  img: require('@/assets/images/pro.png'),
  id: 2,
  name: '岗厦北地铁站2',
  time: '创建：2025/08/26',
},{
  img: require('@/assets/images/pro.png'),
  id: 3,
  name: '岗厦北地铁站3',
  time: '创建：2025/08/26',
},{
  img: require('@/assets/images/pro.png'),
  id: 4,
  name: '岗厦北地铁站4',
  time: '创建：2025/08/26',
},{
  img: require('@/assets/images/pro.png'),
  id: 5,
  name: '岗厦北地铁站5',
  time: '创建：2025/08/26',
},]

export default function HomePage() {
  const [isopen, setIsOpen] = useState<boolean>(false);

  const showModal = () => {
    setIsOpen(true);
  };

  return (
    <div className={styles.page}>
      <div className={styles.pageCont}>
        <div className={styles.pageList}>
          <div className={styles.pageItem} onClick={() => showModal()}>
            <div className={styles.itemGroup}>
              <img className={styles.itemGroupIcon} src={require('@/assets/images/icon1.png')} alt="" />
              <div className={styles.itemGroupTitle}>新建项目</div>
            </div>
          </div>
          {data1.map(t => {
              return <div
                key={t.id}
                className={styles.pageItem}>
                <div className={styles.itemCont}>
                  <img className={styles.itemBg} src={t.img} alt="" />
                  <img className={styles.itemIcon} src={require('@/assets/images/icon2.png')} alt="" />
                  <div className={styles.itemBot}>
                    <div className={styles.itemBotTitle}>
                      <span>{t.name}</span>
                    </div>
                    <div className={styles.itemBotTime}>创建：{t.time}</div>
                  </div>
                </div>
              </div>
            })}
        </div>
      </div>
      {isopen && <ModalCom isopen={isopen} setOpen={(bool: Boolean) => setIsOpen(bool)}></ModalCom>}
    </div>
  );
}