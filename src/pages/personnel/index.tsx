import { useEffect, useState } from "react";
import styles from "./index.less";
import warning from "antd/es/_util/warning";
import { Button, Form, Input, Select, Space, Switch, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { TableProps } from "antd/lib";
import { Icon } from "@/icon";
import { useAntdTable } from "ahooks";

interface DataType {
  key: string;
  xh: number;
  name: string;
  xb: string;
  phone: number;
  bm: string;
  gw: string;
  status: number;
}

const data: DataType[] = [
  {
    key: "1",
    name: "张三",
    xh: 1,
    xb: "男",
    phone: 13099665533,
    bm: "项目一部",
    gw: "渠道运营、备件主管",
    status: 1,
  },
  {
    key: "2",
    name: "李四",
    xh: 2,
    xb: "女",
    phone: 13177665544,
    bm: "项目二部",
    gw: "市场专员",
    status: 1,
  },
  {
    key: "3",
    name: "王五",
    xh: 3,
    xb: "男",
    phone: 13255665555,
    bm: "项目三部",
    gw: "产品经理",
    status: 1,
  },
  {
    key: "4",
    name: "赵六",
    xh: 4,
    xb: "女",
    phone: 13333665566,
    bm: "项目四部",
    gw: "UI设计师",
    status: 1,
  },
  {
    key: "5",
    name: "钱七",
    xh: 5,
    xb: "男",
    phone: 13411665577,
    bm: "项目五部",
    gw: "前端开发",
    status: 1,
  },
  {
    key: "6",
    name: "孙八",
    xh: 6,
    xb: "女",
    phone: 13599665588,
    bm: "项目六部",
    gw: "后端开发",
    status: 1,
  },
  {
    key: "7",
    name: "周九",
    xh: 7,
    xb: "男",
    phone: 13677665599,
    bm: "项目七部",
    gw: "测试工程师",
    status: 1,
  },
  {
    key: "8",
    name: "吴十",
    xh: 8,
    xb: "女",
    phone: 13755665500,
    bm: "项目八部",
    gw: "运维工程师",
    status: 1,
  },
  {
    key: "9",
    name: "郑十一",
    xh: 9,
    xb: "男",
    phone: 13833665511,
    bm: "项目九部",
    gw: "数据分析师",
    status: 1,
  },
  {
    key: "10",
    name: "王十二",
    xh: 10,
    xb: "女",
    phone: 13911665522,
    bm: "项目十部",
    gw: "项目经理",
    status: 1,
  },
  {
    key: "11",
    name: "李十三",
    xh: 11,
    xb: "男",
    phone: 15099665533,
    bm: "项目十一部",
    gw: "技术总监",
    status: 1,
  },
  {
    key: "12",
    name: "张十四",
    xh: 12,
    xb: "女",
    phone: 15177665544,
    bm: "项目十二部",
    gw: "运营总监",
    status: 1,
  },
  {
    key: "13",
    name: "刘十五",
    xh: 13,
    xb: "男",
    phone: 15255665555,
    bm: "项目十三部",
    gw: "市场总监",
    status: 1,
  },
  {
    key: "14",
    name: "陈十六",
    xh: 14,
    xb: "女",
    phone: 15333665566,
    bm: "项目十四部",
    gw: "人事经理",
    status: 1,
  },
  {
    key: "15",
    name: "杨十七",
    xh: 15,
    xb: "男",
    phone: 15411665577,
    bm: "项目十五部",
    gw: "财务经理",
    status: 1,
  },
  {
    key: "16",
    name: "黄十八",
    xh: 16,
    xb: "女",
    phone: 15599665588,
    bm: "项目十六部",
    gw: "行政主管",
    status: 1,
  },
  {
    key: "17",
    name: "赵十九",
    xh: 17,
    xb: "男",
    phone: 15677665599,
    bm: "项目十七部",
    gw: "客服主管",
    status: 1,
  },
  {
    key: "18",
    name: "周二十",
    xh: 18,
    xb: "女",
    phone: 15755665500,
    bm: "项目十八部",
    gw: "采购专员",
    status: 1,
  },
  {
    key: "19",
    name: "吴二十一",
    xh: 19,
    xb: "男",
    phone: 15833665511,
    bm: "项目十九部",
    gw: "销售经理",
    status: 1,
  },
  {
    key: "20",
    name: "郑二十二",
    xh: 20,
    xb: "女",
    phone: 15911665522,
    bm: "项目二十部",
    gw: "商务专员",
    status: 1,
  },
];

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

const PersonnelPage = () => {
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "序号",
      dataIndex: "xh",
      key: "xh",
      width: 80,
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
      width: 150,
    },
    {
      title: "性别 ",
      dataIndex: "xb",
      key: "xb",
      width: 100,
    },
    {
      title: "手机号",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "部门 ",
      dataIndex: "bm",
      key: "bm",
    },
    {
      title: "岗位",
      dataIndex: "gw",
      key: "gw",
    },
    // {
    //   title: "状态 ",
    //   dataIndex: "status",
    //   key: "status",
    //   render: (_, record) => (
    //     <>
    //       <Switch
    //         value={record.status === 1}
    //         onChange={(checked) => handChangeSwitch(checked, record)}
    //         defaultChecked
    //       />
    //       {record.status === 1 ? "已启用" : "已关闭"}
    //     </>
    //   ),
    // },
    {
      title: "操作",
      key: "action",
      width: 100,
      render: (_, record) => (
        <Space size="middle">
          <div style={{cursor: "pointer"}}><Icon.UserIcon></Icon.UserIcon></div>
          <div style={{cursor: "pointer"}} onClick={()=>record.de}><Icon.DeleteIcon></Icon.DeleteIcon></div>
        </Space>
      ),
    },
  ];
  // const tabRef  = useAntdTable();
  const [data1List, setData1List] = useState<any>([
    {
      id: 1,
      name: "智能线路设计",
      fzr: "何伟",
    },
    {
      id: 2,
      name: "区间隧道自动化设计",
      fzr: "何伟",
    },
    {
      id: 3,
      name: "车站模型框架",
      fzr: "何伟",
    },
  ]);
  const [data2List, setData2List] = useState<any>([
    {
      id: 4,
      name: "公共区动线设计",
      fzr: "何伟",
    },
    {
      id: 5,
      name: "智慧客流计算",
      fzr: "何伟",
    },
    {
      id: 6,
      name: "智能房间布局",
      fzr: "何伟",
    },
    {
      id: 7,
      name: "智慧环控系统",
      fzr: "何伟",
    },
    {
      id: 8,
      name: "工程量计算",
      fzr: "何伟",
    },
  ]);
  const [data3List, setData3List] = useState<any>([
    {
      id: 9,
      name: "公共交通设计",
      fzr: "何伟",
    },
    {
      id: 10,
      name: "设备区深化设计",
      fzr: "何伟",
    },
    {
      id: 11,
      name: "地面附属深化设计",
      fzr: "何伟",
    },
    {
      id: 12,
      name: "智能管线综合",
      fzr: "何伟",
    },
    {
      id: 13,
      name: "区间隧道自动化设计",
      fzr: "何伟",
    },
  ]);
  const [data4List, setData4List] = useState<any>([
    {
      id: 14,
      name: "建筑设计成果输出",
      fzr: "何伟",
    },
    {
      id: 15,
      name: "结构设计成果输出",
      fzr: "何伟",
    },
    {
      id: 16,
      name: "给排水设计成果输出",
      fzr: "何伟",
    },
    {
      id: 17,
      name: "环控设计成果输出",
      fzr: "何伟",
    },
    {
      id: 18,
      name: "电力设计成果输出",
      fzr: "何伟",
    },
    {
      id: 19,
      name: "其他",
      fzr: "何伟",
    },
  ]);
  const allList = [...data1List, ...data2List, ...data3List, ...data4List];
  const [obj, setObj] = useState(data1List[0]);
  const [nextId, setNextId] = useState(2);

  const handItem = (t: any) => {
    setObj(t);
  };

  const handPrevItem = () => {
    const i = allList.findIndex((t: any) => t.id === obj.id);
    if (i === 0) {
      setObj(allList[allList.length - 1]);
    } else {
      setObj(allList[i - 1]);
    }
  };

  const handNextItem = () => {
    const i = allList.findIndex((t: any) => t.id === obj.id);
    if (i === allList.length - 1) {
      setObj(allList[0]);
    } else {
      setObj(allList[i + 1]);
    }
  };

  useEffect(() => {
    const i = allList.findIndex((t: any) => t.id === obj.id);
    if (i === allList.length - 1) {
      setNextId(allList[0].id);
    } else {
      setNextId(allList[i + 1].id);
    }
  }, [obj]);

  const [tableList, setDataList] = useState(data);
  const [isopen, setIsOpen] = useState<boolean>(false);
  const [page, setPage] = useState(1); // 用于存储当前页码
  const [pageSize, setPageSize] = useState(5); // 用于存储每页显示的行数

  const showModal = () => {
    setIsOpen(true);
  };

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const handChangeSwitch = (checked: boolean, t: any) => {
    setDataList(
      tableList.map((item) => {
        return item.key === t.key ? { ...item, status: checked ? 1 : 0 } : item;
      })
    );
  };

  return (
    <div className={styles.page}>
      <div className={styles.pageCont}>
        <div className={styles.pageContLeft}>
          <div className={styles.list1}>
            <div className={styles.listCont}>
              {data1List.map((t) => {
                return (
                  <div
                    className={`${styles.listItem} ${t.id === obj.id ? styles.listItemActive : ""} ${
                      t.id === nextId ? styles.listItemNext : ""
                    }`}
                    onClick={() => handItem(t)}
                    key={t.id}
                  >
                    <div className={styles.listItemImg}></div>
                    <div className={styles.listItemTitle} title={t.name}>
                      {t.name}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.list2}>
            <div className={styles.listCont}>
              {data2List.map((t) => {
                return (
                  <div
                    className={`${styles.listItem} ${t.id === obj.id ? styles.listItemActive : ""} ${
                      t.id === nextId ? styles.listItemNext : ""
                    }`}
                    onClick={() => handItem(t)}
                    key={t.id}
                  >
                    <div className={styles.listItemImg}></div>
                    <div className={styles.listItemTitle} title={t.name}>
                      {t.name}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.list3}>
            <div className={styles.listCont}>
              {data3List.map((t) => {
                return (
                  <div
                    className={`${styles.listItem} ${t.id === obj.id ? styles.listItemActive : ""} ${
                      t.id === nextId ? styles.listItemNext : ""
                    }`}
                    onClick={() => handItem(t)}
                    key={t.id}
                  >
                    <div className={styles.listItemImg}></div>
                    <div className={styles.listItemTitle} title={t.name}>
                      {t.name}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.list4}>
            <div className={styles.listCont}>
              {data4List.map((t) => {
                return (
                  <div
                    className={`${styles.listItem} ${t.id === obj.id ? styles.listItemActive : ""} ${
                      t.id === nextId ? styles.listItemNext : ""
                    }`}
                    onClick={() => handItem(t)}
                    key={t.id}
                  >
                    <div className={styles.listItemImg}></div>
                    <div className={styles.listItemTitle} title={t.name}>
                      {t.name}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className={styles.pageContRight}>
          <div className={styles.rightTop}>
            <img className={styles.rightTopImg} src={require("@/assets/images/icon11-2.png")} alt="" />
            <div className={styles.rightTopGroup}>
              <img
                className={styles.rightTopGroupPrev}
                src={require("@/assets/images/prev1.png")}
                onClick={() => handPrevItem()}
                alt=""
              />
              <span className={styles.rightTopGroupTitle} title={obj.name}>
                {obj.name}
              </span>
              <img
                className={styles.rightTopGroupNext}
                src={require("@/assets/images/next1.png")}
                onClick={() => handNextItem()}
                alt=""
              />
            </div>
            <div className={styles.rightTop}>区块负责人：{obj.fzr}</div>
          </div>
          <div className={styles.table}>
            <div className={styles.tableTop}>
              <div className={styles.tableTopLeft}>
                <Icon.ProjectIcon></Icon.ProjectIcon>
                <div className="count-total">
                  区块组员
                  <span className="number">0</span>
                </div>
                <div style={{ cursor: "pointer" }}>
                  <Icon.RefreshIcon></Icon.RefreshIcon>
                </div>
                <div className={styles.tableTopInputWrap}>
                  <Input className={styles.tableInput} placeholder="姓名/手机号" variant="filled" />
                  <Icon.SearchIcon></Icon.SearchIcon>
                </div>
              </div>
              <div className={styles.tableTopRight}>
                <Button type="primary" className="u-ant-btn" icon={<PlusOutlined />} onClick={() => showModal()}>
                  添加组员
                </Button>
              </div>
            </div>
            <div>
              <Table<DataType>
                className="u-table"
                columns={columns}
                dataSource={tableList}
                scroll={{ y: 41 * 14 }}
                pagination={false}
              />
            </div>
          </div>
        </div>
      </div>
      {/* {isopen && <ModalCom isopen={isopen} setOpen={(bool: Boolean) => setIsOpen(bool)}></ModalCom>} */}
    </div>
  );
};

export default PersonnelPage;
