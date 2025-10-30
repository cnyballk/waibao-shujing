import {
  Button,
  Form,
  FormProps,
  Image,
  Input,
  Modal,
  Radio,
  RadioChangeEvent,
  Select,
  TreeSelect,
  Upload,
  UploadFile,
  message,
} from "antd";
import "./auto.less";
import { useEffect, useState } from "react";
import { UploadProps } from "antd/lib";
import { request } from "@/axios";
import { appStore } from "@/store/appStore";
import { getTreeData } from "@/utils";
import { useMemoizedFn } from "ahooks";

export default function ModalCom(props: any) {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [value, setValue] = useState(1);
  const [userInfo, setUserInfo] = useState<any>(null);
  const { gangweilist, getGangweiList, bumenList, getBumenList, roleList, getRoleList } = appStore((state) => state);
  useEffect(() => {
    getUserInfo();
    getGangweiList();
    getRoleList();
    getBumenList();
  }, []);

  const getUserInfo = useMemoizedFn(() => {
    request.get(`/system/user/${props.editUserId}`).then((res: any) => {
      console.log("res: ", res);
      setUserInfo(res.data);
    });
  });

  const handleCancel = () => {
    console.log("Clicked cancel button");
    props?.setOpen(false);
  };

  const onRadioChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
    setConfirmLoading(true);
    if (props.editUserId) {
      request
        .put(`/system/user`, { ...userInfo, ...values, status: 1 })
        .then((res: any) => {
          console.log("res: ", res);
          message.success("编辑成功");
          props?.setOpen(false);
        })
        .finally(() => {
          setConfirmLoading(false);
        });
    } else {
      request
        .post("/system/user", { ...values, roleIds: [102] })
        .then((res: any) => {
          console.log("res: ", res);
          message.success("新增成功");
          props?.setOpen(false);
        })
        .finally(() => {
          setConfirmLoading(false);
        });
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Modal
      title="新增用户"
      centered={true}
      open={props.isopen}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      onOk={() => {
        return false;
      }}
      maskClosable={false}
      okButtonProps={{ autoFocus: true, htmlType: "submit" }}
      modalRender={(dom) => {
        return (
          <Form
            key={userInfo?.userId}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            className="homeForm"
            layout="horizontal"
            style={{ maxWidth: 600 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            initialValues={userInfo}
          >
            {dom}
          </Form>
        );
      }}
    >
      <Form.Item colon={false} label="登录账号" name="userName" rules={[{ required: true, message: "请输入用户姓名" }]}>
        <Input placeholder="请输入" autoComplete="false" />
      </Form.Item>
      <Form.Item colon={false} label="用户姓名" name="nickName" rules={[{ required: true, message: "请输入用户姓名" }]}>
        <Input placeholder="请输入用户姓名" autoComplete="false" />
      </Form.Item>
      <Form.Item colon={false} label="性别" name="sex">
        <Radio.Group
          value={value}
          onChange={onRadioChange}
          options={[
            { value: 1, label: "男" },
            { value: 0, label: "女" },
          ]}
        />
      </Form.Item>
      {props.editUserId ? null : (
        <Form.Item colon={false} label=" 密码" name="password" rules={[{ required: true, message: "请输入密码" }]}>
          <Input.Password placeholder="请输入密码" autoComplete="false" />
        </Form.Item>
      )}
      <Form.Item colon={false} label="手机号" name="phonenumber" rules={[{ required: true, message: "请输入手机号" }]}>
        <Input placeholder="请输入" />
      </Form.Item>
      <Form.Item colon={false} label="部门" name="deptId">
        <TreeSelect placeholder="请选择" treeData={bumenList}></TreeSelect>
      </Form.Item>
      <Form.Item colon={false} label="岗位" name="postIds">
        <Select allowClear mode="multiple" placeholder="请选择岗位（可多选）">
          {gangweilist.map((item) => (
            <Select.Option key={item.postId} value={item.postId}>
              {item.postName}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item colon={false} label="角色" name="roleIds">
        <Select allowClear mode="multiple" placeholder="请选择角色（可多选）">
          {roleList.map((item) => (
            <Select.Option key={item.roleId} value={item.roleId}>
              {item.roleName}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Modal>
  );
}
