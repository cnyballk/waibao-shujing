import styles from "./index.less";
import "./auto.less";
import { useEffect, useState } from "react";
import ModalCom from "./modalCom";
import { request } from "@/axios";
import { getImageUrl } from "@/utils";
import { appStore } from "@/store/appStore";
import { history } from "umi";
import { useMemoizedFn } from "ahooks";

const data1 = [
  {
    img: require("@/assets/images/pro.png"),
    id: 1,
    name: "岗厦北地铁站1",
    time: "创建：2025/08/26",
  },
  {
    img: require("@/assets/images/pro.png"),
    id: 2,
    name: "岗厦北地铁站2",
    time: "创建：2025/08/26",
  },
  {
    img: require("@/assets/images/pro.png"),
    id: 3,
    name: "岗厦北地铁站3",
    time: "创建：2025/08/26",
  },
  {
    img: require("@/assets/images/pro.png"),
    id: 4,
    name: "岗厦北地铁站4",
    time: "创建：2025/08/26",
  },
  {
    img: require("@/assets/images/pro.png"),
    id: 5,
    name: "岗厦北地铁站5",
    time: "创建：2025/08/26",
  },
];

export default function HomePage() {
  const [isopen, setIsOpen] = useState<Boolean>(false);
  const { projectList } = appStore((state) => state);
  useEffect(() => {
    appStore.setState({ selectedProject: null, selectedProjectId: null });
    getProjectList();
  }, []);
  const getProjectList = useMemoizedFn(() => {
    request.get("/design/project/my").then((res: any) => {
      console.log("res: ", res);
      appStore.setState({ projectList: res.rows });
    });
  });
  const showModal = () => {
    setIsOpen(true);
  };
  return (
    <div className={styles.page}>
      <div className={styles.pageCont}>
        <div className={styles.pageList}>
          <div className={styles.pageItem} onClick={() => showModal()}>
            <div className={styles.itemGroup}>
              <img className={styles.itemGroupIcon} src={require("@/assets/images/icon1.png")} alt="" />
              <div className={styles.itemGroupTitle}>新建项目</div>
            </div>
          </div>
          {projectList.map((projectItem, projectIndex) => {
            return (
              <div key={projectItem.id} className={styles.pageItem} onClick={() => {
                appStore.setState({ selectedProject: projectItem, selectedProjectId: projectItem.id });
                history.push("/project");
              }}>
                <div className={styles.itemCont}>
                  <img className={styles.itemBg} src={getImageUrl(projectItem.thumbnail)} alt="" />
                  <img className={styles.itemIcon} src={require("@/assets/images/icon2.png")} alt="" />
                  <div className={styles.itemBot}>
                    <div className={styles.itemBotTitle}>
                      <span>{projectItem.projectName}</span>
                    </div>
                    <div className={styles.itemBotTime}>创建：{projectItem.createTime}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {isopen && <ModalCom isopen={isopen} setOpen={(bool: Boolean) => {
        setIsOpen(bool)
        if (!bool) {
          getProjectList();
        }
      }}></ModalCom>}
    </div>
  );
}
