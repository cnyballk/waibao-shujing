import { useEffect, useState } from "react";
import styles from "./index.less";
import warning from "antd/es/_util/warning";
import { Button, Form, Input, message, Modal, Select, Space, Switch, Table, TreeSelect } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { TableProps } from "antd/lib";
import { Icon } from "@/icon";
import { useAntdTable, useMemoizedFn } from "ahooks";
import { request } from "@/axios";
import { appStore } from "@/store/appStore";
import classNames from "classnames";
import { getTreeLabel } from "@/utils";
import "./index.less";
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

const flowList1 = [
  {
    id: "1-1",
    name: "智能线路设计",
  },
  {
    id: "1-2",
    name: "区间隧道自动化设计",
  },
  {
    id: "1-3",
    name: "车站模型框架",
  },
];

const flowList2 = [
  {
    id: "2-1",
    name: "公共区动线设计",
  },
  {
    id: "2-2",
    name: "智慧客流计算",
  },
  {
    id: "2-3",
    name: "智能房间布局",
  },
  {
    id: "2-4",
    name: "智慧环控系统",
  },
  {
    id: "2-5",
    name: "工程量计算",
  },
];
const flowList3 = [
  {
    id: "3-1",
    name: "公共交通设计",
  },
  {
    id: "3-2",
    name: "设备区深化设计",
  },
  {
    id: "3-3",
    name: "地面附属深化设计",
  },
  {
    id: "3-4",
    name: "智能管线综合",
  },
  {
    id: "3-5",
    name: "区间隧道自动化设计",
  },
];
const flowList4 = [
  {
    id: "4-1",
    name: "建筑设计成果输出",
  },
  {
    id: "4-2",
    name: "结构设计成果输出",
  },
  {
    id: "4-3",
    name: "给排水设计成果输出",
  },
  {
    id: "4-4",
    name: "环控设计成果输出",
  },
  {
    id: "4-5",
    name: "电力设计成果输出",
  },
  {
    id: "4-6",
    name: "其他",
  },
];
const PersonnelPage = () => {
  const [currentFlow, setCurrentFlow] = useState({});
  const { bumenList, getBumenList } = appStore((state) => state);
  useEffect(() => {
    getBumenList();
  }, []);
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "序号",
      dataIndex: "id",
      key: "id",
      width: 80,
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "姓名",
      dataIndex: "nickName",
      key: "nickName",
      width: 150,
    },
    {
      title: "性别 ",
      dataIndex: "sex",
      key: "sex",
      width: 100,
      render: (_, record) => {
        return record.sex == 1 ? "男" : "女";
      },
    },
    {
      title: "手机号",
      dataIndex: "phonenumber",
      key: "phonenumber",
    },
    {
      title: "部门 ",
      dataIndex: "deptName",
      key: "deptName",
    },
    {
      title: "岗位",
      dataIndex: "postName",
      key: "postName",
      // render: (_, record) => {
      //   return record.postIds.map((item: any) => item.postName).join(",");
      // },
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
          <div style={{ cursor: "pointer" }} onClick={() => handChangeLeader(record)}>
            <Icon.UserIcon></Icon.UserIcon>
          </div>
          <div style={{ cursor: "pointer" }} onClick={() => record.de}>
            <Icon.DeleteIcon></Icon.DeleteIcon>
          </div>
        </Space>
      ),
    },
  ];

  // const tabRef  = useAntdTable();
  const allFlowList = [...flowList1, ...flowList2, ...flowList3, ...flowList4];
  const [selectFlow, setSelectFlow] = useState(flowList1[0]);
  const [nextId, setNextId] = useState(2);

  const [tableList, setDataList] = useState([]);
  const [isopen, setIsOpen] = useState<boolean>(false);
  const [page, setPage] = useState(1); // 用于存储当前页码
  const [pageSize, setPageSize] = useState(5); // 用于存储每页显示的行数
  const [total, setTotal] = useState(0);
  const { selectedProjectId } = appStore((state) => state);
  const showModal = () => {
    setIsOpen(true);
  };

  const handItem = (t: any) => {
    setSelectFlow(t);
  };
  useEffect(() => {
    request
      .get(`/design/workflow/detail`, {
        projectId: selectedProjectId,
        flowCode: selectFlow.id,
      })
      .then((currentFlow: any) => {
        setCurrentFlow(currentFlow.data);
      });
  }, [selectFlow]);
  const handPrevItem = () => {
    const i = allFlowList.findIndex((t: any) => t.id === selectFlow.id);
    if (i === 0) {
      setSelectFlow(allFlowList[allFlowList.length - 1]);
    } else {
      setSelectFlow(allFlowList[i - 1]);
    }
  };

  const handNextItem = () => {
    const i = allFlowList.findIndex((t: any) => t.id === selectFlow.id);
    if (i === allFlowList.length - 1) {
      setSelectFlow(allFlowList[0]);
    } else {
      setSelectFlow(allFlowList[i + 1]);
    }
  };

  useEffect(() => {
    const i = allFlowList.findIndex((t: any) => t.id === selectFlow.id);
    if (i === allFlowList.length - 1) {
      setNextId(allFlowList[0].id);
    } else {
      setNextId(allFlowList[i + 1].id);
    }
  }, [selectFlow]);
  const [filter, setFilter] = useState({
    userName: "",
  });
  const getTableList = useMemoizedFn(() => {
    request
      .get("/design/user/detailList", {
        projectId: selectedProjectId,
        flowCode: selectFlow.id,
        pageNum: 1,
        pageSize: 100000,
      })
      .then((res: any) => {
        setDataList(res.rows);
        setTotal(res.total);
      });
  });

  useEffect(() => {
    getTableList();
  }, [selectFlow]);

  const handRefresh = useMemoizedFn(() => {
    getTableList();
  });

  const handChangeLeader = useMemoizedFn((record: any) => {
    console.log("record: ", record);
    request
      .put("/design/user", {
        id: record.id,
        projectId: selectedProjectId,
        flowCode: selectFlow.id,
        userId: record.userId,
        isLeader: 1,
      })
      .then((res: any) => {
        message.success("设置成功");
      })
      .catch((err: any) => {
        message.error("设置失败");
      });
  });
  return (
    <div className={styles.page}>
      <PersonnelModal open={isopen} setOpen={setIsOpen} projectId={selectedProjectId} flowCode={selectFlow.id} />
      <div className={styles.pageCont}>
        <div className={styles.pageContLeft}>
          <div className={styles.list1}>
            <div className={styles.listCont}>
              {flowList1.map((t) => {
                return (
                  <div
                    className={`${styles.listItem} ${t.id === selectFlow.id ? styles.listItemActive : ""} ${
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
              {flowList2.map((t) => {
                return (
                  <div
                    className={`${styles.listItem} ${t.id === selectFlow.id ? styles.listItemActive : ""} ${
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
              {flowList3.map((t) => {
                return (
                  <div
                    className={`${styles.listItem} ${t.id === selectFlow.id ? styles.listItemActive : ""} ${
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
              {flowList4.map((t) => {
                return (
                  <div
                    className={`${styles.listItem} ${t.id === selectFlow.id ? styles.listItemActive : ""} ${
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
              <span className={styles.rightTopGroupTitle} title={selectFlow.name}>
                {selectFlow.name}
              </span>
              <img
                className={styles.rightTopGroupNext}
                src={require("@/assets/images/next1.png")}
                onClick={() => handNextItem()}
                alt=""
              />
            </div>
            <div className={styles.rightTop}>区块负责人：{currentFlow.userName}</div>
          </div>
          <div className={styles.table}>
            <div className={styles.tableTop}>
              <div className={styles.tableTopLeft}>
                <Icon.ProjectIcon></Icon.ProjectIcon>
                <div className="count-total">
                  区块组员
                  <span className="number">{total}</span>
                </div>
                <div style={{ cursor: "pointer" }} onClick={() => handRefresh()}>
                  <Icon.RefreshIcon></Icon.RefreshIcon>
                </div>
                <div className={styles.tableTopInputWrap}>
                  <Input
                    className={styles.tableInput}
                    placeholder="姓名/手机号"
                    variant="filled"
                    value={filter.userName}
                    onChange={(e) => setFilter({ ...filter, userName: e.target.value })}
                  />
                  <div style={{ cursor: "pointer" }} onClick={() => getTableList()}>
                    <Icon.SearchIcon></Icon.SearchIcon>
                  </div>
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
const PersonnelModal = (props) => {
  const { gangweilist, getGangweiList, bumenList, getBumenList } = appStore((state) => state);
  useEffect(() => {
    getGangweiList();
    getBumenList();
  }, []);
  const columns: TableProps<any>["columns"] = [
    {
      title: "序号",
      dataIndex: "userId",
      key: "userId",
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "姓名",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "性别 ",
      dataIndex: "sex",
      key: "sex",
    },
    {
      title: "手机号",
      dataIndex: "phonenumber",
      key: "phonenumber",
    },
    {
      title: "部门 ",
      dataIndex: "deptId",
      key: "deptId",
      render(_, record) {
        return getTreeLabel(bumenList, record.deptId);
      },
    },
    {
      title: "岗位",
      dataIndex: "postIds",
      key: "postIds",
    },
    {
      title: "状态 ",
      dataIndex: "status",
      key: "status",
      render: (_, record) => {
        return <>{record.status == 1 ? " 已启用" : " 已关闭"}</>;
      },
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <div style={{ cursor: "pointer" }} onClick={() => handAdd(record)}>
          <Icon.AddIcon />
        </div>
      ),
    },
  ];
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState({
    userName: "",
    deptId: "",
    status: "",
  });

  useEffect(() => {
    getList();
  }, []);
  const getList = useMemoizedFn(() => {
    request
      .get("/system/user/list", {
        pageNum: 1,
        pageSize: 100000,
        ...filter,
      })
      .then((res: any) => {
        console.log("userlist: ", res);
        setList(res.rows.filter((item: any) => item.userId > 100));
      });
  });
  const handAdd = useMemoizedFn((record: any) => {
    console.log("record: ", record);
    request
      .post("/design/user", {
        projectId: props.projectId,
        flowCode: props.flowCode,
        userId: record.userId,
        isLeader: 0,
      })
      .then((res: any) => {
        message.success("添加成功");
      })
      .catch((err: any) => {
        message.error("添加失败");
      });
  });
  const handRefresh = useMemoizedFn(() => {
    getList();
  });
  return (
    <Modal
      open={props.open}
      onCancel={() => props.setOpen(false)}
      maskClosable={false}
      width={1440}
      height={810}
      style={{ maxWidth: "unset" }}
    >
      <div className="project-file-list">
        <div className="project-file-list-header">
          <Icon.ProjectFileIcon />
          <div className="project-file-list-header-left-text">添加人员</div>
          <div className="count-total">
            <span className="number">{list.length}</span>
          </div>
          <div style={{ cursor: "pointer" }} onClick={() => handRefresh()}>
            <Icon.RefreshIcon />
          </div>
        </div>
        <div className="filter-wrap">
          <div className="filter-left">
            <div className="filter-item">
              <div className={"tableTopInputWrap"}>
                <Input className={"tableInput"} placeholder="姓名/手机号" variant="filled" />
                <Icon.SearchIcon></Icon.SearchIcon>
              </div>
            </div>
            <div className="filter-item">
              <div className="filter-item-label">组织</div>
              <div className="filter-item-content">
                <TreeSelect
                  defaultValue="100"
                  style={{ width: "300px" }}
                  className={styles.pageSelect}
                  onChange={(value) => {
                    console.log("value: ", value);
                    setFilter({
                      ...filter,
                      deptId: value,
                    });
                  }}
                  treeData={bumenList}
                ></TreeSelect>
              </div>
            </div>
            <div className="filter-item">
              <div className="filter-item-label">状态</div>
              <div className="filter-item-content">
                <Select
                  defaultValue="全部"
                  className={styles.pageSelect}
                  onChange={(value) => {
                    setFilter({
                      ...filter,
                      status: value === "-1" ? "" : value,
                    });
                  }}
                >
                  <Select.Option value="-1">全部</Select.Option>
                  <Select.Option value="1">启用</Select.Option>
                  <Select.Option value="0">停用</Select.Option>
                </Select>
              </div>
            </div>
          </div>
        </div>
        <div className="table-list">
          <Table className="u-table" columns={columns} dataSource={list} scroll={{ y: 41 * 14 }} pagination={false} />
        </div>
      </div>
    </Modal>
  );
};
export default PersonnelPage;
