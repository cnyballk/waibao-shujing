import styles from "./index.less";
import "./auto.less";
import { useEffect, useState } from "react";
import ModalCom from "./modalCom";
import { Button, Form, Input, Select, Space, Switch, Table, Tag, TreeSelect } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { TableProps } from "antd";
import { request } from "@/axios";
import { appStore } from "@/store/appStore";
import { getTreeLabel } from "@/utils";

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

export default function UserPage() {
  const [dataList, setDataList] = useState([]);
  const [filter, setFilter] = useState({
    userName: "",
    deptId: "",
    status: "",
  });
  const [isopen, setIsOpen] = useState<boolean>(false);
  const [page, setPage] = useState(1); // 用于存储当前页码
  const [pageSize, setPageSize] = useState(20); // 用于存储每页显示的行数
  const [total, setTotal] = useState(0); // 用于存储数据总数
  const { gangweilist, getGangweiList, bumenList, getBumenList } = appStore((state) => state);
  const columns: TableProps<any>["columns"] = [
    {
      title: "序号",
      dataIndex: "userId",
      key: "userId",
      width: 111,
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "姓名",
      dataIndex: "userName",
      key: "userName",
      width: 202,
    },
    {
      title: "性别 ",
      dataIndex: "sex",
      key: "sex",
      width: 154,
    },
    {
      title: "手机号",
      dataIndex: "phonenumber",
      key: "phonenumber",
      width: 231,
    },
    {
      title: "部门 ",
      dataIndex: "deptId",
      key: "deptId",
      width: 259,
      render(_, record) {
        return getTreeLabel(bumenList, record.deptId);
      },
    },
    {
      title: "岗位",
      dataIndex: "postIds",
      key: "postIds",
      width: 308,
    },
    {
      title: "状态 ",
      dataIndex: "status",
      key: "status",
      width: 216,
      render: (_, record) => (
        <>
          <Switch value={record.status == 1} onChange={(checked) => handChangeSwitch(checked, record)} defaultChecked />
          {record.status == 1 ? " 已启用" : " 已关闭"}
        </>
      ),
    },
    {
      title: "操作",
      key: "action",
      width: 300,
      render: (_, record) => (
        <Space size="middle">
          <span style={{ color: "rgba(0, 107, 255, 1)", cursor: "pointer" }}>权限</span>
          <span style={{ color: "rgba(0, 107, 255, 1)", cursor: "pointer" }}>编辑</span>
          <span style={{ color: "rgba(0, 107, 255, 1)", cursor: "pointer" }}>重置密码</span>
          <span style={{ color: "rgba(0, 107, 255, 1)", cursor: "pointer" }}>注销</span>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    getGangweiList();
    getBumenList();
  }, []);
  useEffect(() => {
    request
      .get("/system/user/list", {
        pageNum: page,
        pageSize: pageSize,
        ...filter,
      })
      .then((res: any) => {
        console.log("userlist: ", res);
        setDataList(res.rows);
        setTotal(res.total);
      });
  }, [filter]);

  const showModal = () => {
    setIsOpen(true);
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setPage(pagination.current); // 设置当前页码
    setPageSize(pagination.pageSize); // 设置每页行数，如果需要动态调整每页行数
  };

  const handChangeSwitch = (checked: boolean, record: any) => {
    request
      .put("/system/user/changeStatus", {
        userId: record.userId,
        status: checked ? "1" : "0",
      })
      .then((res: any) => {
        console.log("res: ", res);
      });
    setDataList(
      dataList.map((item) => {
        return item.key === record.key ? { ...item, status: checked ? 1 : 0 } : item;
      })
    );
  };

  return (
    <div className={styles.page}>
      <div className={styles.pageCont}>
        <div className={styles.pageTop}>
          <div className={`userform ${styles.pageTopLfet}`}>
            <Input.Search
              className={styles.pageInput}
              placeholder="姓名/手机号"
              variant="filled"
              onSearch={(value) => {
                console.log("value: ", value);
                setFilter({
                  ...filter,
                  userName: value,
                });
              }}
            />
            <Form.Item className={styles.pageFormItem} colon={false} label="组织">
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
            </Form.Item>
            <Form.Item className={styles.pageFormItem} colon={false} label="状态">
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
            </Form.Item>
          </div>
          <Button type="primary" className="u-ant-btn" icon={<PlusOutlined />} onClick={() => showModal()}>
            新增用户
          </Button>
        </div>
        <div>
          <Table<any>
            className="u-table"
            columns={columns}
            dataSource={dataList}
            scroll={{ y: 41 * 19 }}
            pagination={{
              current: page,
              pageSize: pageSize,
              total:total,
              showSizeChanger: true,
              showTotal: (total, range) => `共 ${total} 条`,
              onChange: handleTableChange, // 页码改变时的回调函数
            }}
          />
        </div>
      </div>
      {isopen && <ModalCom isopen={isopen} setOpen={(bool: Boolean) => setIsOpen(bool)}></ModalCom>}
    </div>
  );
}
