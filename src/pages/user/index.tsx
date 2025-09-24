import styles from './index.less';
import './auto.less';
import { useState } from 'react';
import ModalCom from './modalCom'
import { Button, Form, Input, Select,Space, Switch, Table, Tag } from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import type { TableProps } from 'antd';

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

const data: DataType[] =[
  {
    key: '1',
    name: '张三',
    xh: 1,
    xb: '男',
    phone: 13099665533,
    bm: '项目一部',
    gw: '渠道运营、备件主管',
    status: 1
  },
  {
    key: '2',
    name: '李四',
    xh: 2,
    xb: '女',
    phone: 13177665544,
    bm: '项目二部',
    gw: '市场专员',
    status: 1
  },
  {
    key: '3',
    name: '王五',
    xh: 3,
    xb: '男',
    phone: 13255665555,
    bm: '项目三部',
    gw: '产品经理',
    status: 1
  },
  {
    key: '4',
    name: '赵六',
    xh: 4,
    xb: '女',
    phone: 13333665566,
    bm: '项目四部',
    gw: 'UI设计师',
    status: 1
  },
  {
    key: '5',
    name: '钱七',
    xh: 5,
    xb: '男',
    phone: 13411665577,
    bm: '项目五部',
    gw: '前端开发',
    status: 1
  },
  {
    key: '6',
    name: '孙八',
    xh: 6,
    xb: '女',
    phone: 13599665588,
    bm: '项目六部',
    gw: '后端开发',
    status: 1
  },
  {
    key: '7',
    name: '周九',
    xh: 7,
    xb: '男',
    phone: 13677665599,
    bm: '项目七部',
    gw: '测试工程师',
    status: 1
  },
  {
    key: '8',
    name: '吴十',
    xh: 8,
    xb: '女',
    phone: 13755665500,
    bm: '项目八部',
    gw: '运维工程师',
    status: 1
  },
  {
    key: '9',
    name: '郑十一',
    xh: 9,
    xb: '男',
    phone: 13833665511,
    bm: '项目九部',
    gw: '数据分析师',
    status: 1
  },
  {
    key: '10',
    name: '王十二',
    xh: 10,
    xb: '女',
    phone: 13911665522,
    bm: '项目十部',
    gw: '项目经理',
    status: 1
  },
  {
    key: '11',
    name: '李十三',
    xh: 11,
    xb: '男',
    phone: 15099665533,
    bm: '项目十一部',
    gw: '技术总监',
    status: 1
  },
  {
    key: '12',
    name: '张十四',
    xh: 12,
    xb: '女',
    phone: 15177665544,
    bm: '项目十二部',
    gw: '运营总监',
    status: 1
  },
  {
    key: '13',
    name: '刘十五',
    xh: 13,
    xb: '男',
    phone: 15255665555,
    bm: '项目十三部',
    gw: '市场总监',
    status: 1
  },
  {
    key: '14',
    name: '陈十六',
    xh: 14,
    xb: '女',
    phone: 15333665566,
    bm: '项目十四部',
    gw: '人事经理',
    status: 1
  },
  {
    key: '15',
    name: '杨十七',
    xh: 15,
    xb: '男',
    phone: 15411665577,
    bm: '项目十五部',
    gw: '财务经理',
    status: 1
  },
  {
    key: '16',
    name: '黄十八',
    xh: 16,
    xb: '女',
    phone: 15599665588,
    bm: '项目十六部',
    gw: '行政主管',
    status: 1
  },
  {
    key: '17',
    name: '赵十九',
    xh: 17,
    xb: '男',
    phone: 15677665599,
    bm: '项目十七部',
    gw: '客服主管',
    status: 1
  },
  {
    key: '18',
    name: '周二十',
    xh: 18,
    xb: '女',
    phone: 15755665500,
    bm: '项目十八部',
    gw: '采购专员',
    status: 1
  },
  {
    key: '19',
    name: '吴二十一',
    xh: 19,
    xb: '男',
    phone: 15833665511,
    bm: '项目十九部',
    gw: '销售经理',
    status: 1
  },
  {
    key: '20',
    name: '郑二十二',
    xh: 20,
    xb: '女',
    phone: 15911665522,
    bm: '项目二十部',
    gw: '商务专员',
    status: 1
  }
];

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

export default function UserPage() {
  const columns: TableProps<DataType>['columns'] = [
  {
    title: '序号',
    dataIndex: 'xh',
    key: 'xh',
    width: 111,
    // render: (text) => <a>{text}</a>,
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    width: 202,
  },
  {
    title: '性别 ',
    dataIndex: 'xb',
    key: 'xb',
    width: 154,
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    key: 'phone',
    width: 231,
  },
  {
    title: '部门 ',
    dataIndex: 'bm',
    key: 'bm',
    width: 259,
  },
  {
    title: '岗位',
    dataIndex: 'gw',
    key: 'gw',
    width: 308,
  },
  {
    title: '状态 ',
    dataIndex: 'status',
    key: 'status',
    width: 216,
    render: (_, record) => (
      <>
        <Switch value={record.status === 1} onChange={(checked) => handChangeSwitch(checked, record)}  defaultChecked />
        {record.status === 1 ? '已启用' : '已关闭'}
      </>
    ),
   
  },
  {
    title: '操作',
    key: 'action',
    width: 335,
    render: (_, record) => (
      <Space size="middle">
        <span style={{color: 'rgba(0, 107, 255, 1)', cursor: 'pointer'}}>权限</span>
        <span style={{color: 'rgba(0, 107, 255, 1)', cursor: 'pointer'}}>编辑</span>
        <span style={{color: 'rgba(0, 107, 255, 1)', cursor: 'pointer'}}>重置密码</span>
        <span style={{color: 'rgba(0, 107, 255, 1)', cursor: 'pointer'}}>注销</span>
      </Space>
    ),
  },
];

  const [dataList, setDataList] = useState(data);
  const [isopen, setIsOpen] = useState<boolean>(false);
  const [page, setPage] = useState(1); // 用于存储当前页码
  const [pageSize, setPageSize] = useState(20); // 用于存储每页显示的行数
  

  const showModal = () => {
    setIsOpen(true);
  };

  const onChange = (value: string) => {
  console.log(`selected ${value}`);
};


const handleTableChange = (pagination, filters, sorter) => {
  setPage(pagination.current); // 设置当前页码
  setPageSize(pagination.pageSize); // 设置每页行数，如果需要动态调整每页行数
};
 
const paginationConfig = {
  current: page, // 当前页码
  pageSize: pageSize, // 每页行数
  total: data.length, // 数据总数，用于计算总页数
  showSizeChanger: true, // 显示切换显示条数的下拉菜单
  showTotal: (total, range) => `共 ${total} 条`,
  onChange: handleTableChange, // 页码改变时的回调函数
};

const handChangeSwitch = (checked: boolean, t:any) => {
 setDataList(dataList.map(item =>{
      return item.key === t.key ? { ...item, status: checked ? 1: 0 } : item
}));
};
 


  return (
    <div className={styles.page}>
      <div className={styles.pageCont}>
        <div className={styles.pageTop}>
          <div className={`userform ${styles.pageTopLfet}`}>
            <Input.Search 
            className={styles.pageInput}
            placeholder="姓名/手机号"
            variant="filled" />
            <Form.Item className={styles.pageFormItem}  colon={false} label="组织">
              <Select 
                defaultValue="全部"
                className={styles.pageSelect} onChange={onChange}>
                <Select.Option value="全部">全部</Select.Option>
                <Select.Option value="sample1">Sample1</Select.Option>
                <Select.Option value="sample2">Sample2</Select.Option>
                <Select.Option value="sample3">Sample3</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item className={styles.pageFormItem}  colon={false} label="状态">
              <Select 
                defaultValue="全部"
                className={styles.pageSelect} onChange={onChange}>
                <Select.Option value="全部">全部</Select.Option>
                <Select.Option value="Option1">Option1</Select.Option>
                <Select.Option value="Option2">Option2</Select.Option>
                <Select.Option value="Option3">Option3</Select.Option>
              </Select>
            </Form.Item>
          </div>
          <Button type="primary" className="u-ant-btn" icon={<PlusOutlined />} onClick={() => showModal()}>新增用户</Button>
        </div>
        <div>
          <Table<DataType> 
            className="u-table"
            columns={columns}
            dataSource={dataList}
            scroll={{ y: 41 * 19 }}
            pagination={paginationConfig}/>
        </div>
      </div>
      {isopen && <ModalCom isopen={isopen} setOpen={(bool: Boolean) => setIsOpen(bool)}></ModalCom>}
    </div>
  );
}
