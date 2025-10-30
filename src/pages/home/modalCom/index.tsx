import { Button, Form, Image, Input, Modal, Select, Upload, UploadFile, message } from "antd";
import "./auto.less";
import { useState } from "react";
import { UploadProps } from "antd/lib";
import { baseApi, request } from "@/axios";
import { myUploadFile } from "@/utils";

export default function modalCom(props: any) {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleOk = () => {};

  const handleCancel = () => {
    console.log("Clicked cancel button");
    props?.setOpen(false);
  };

  const getBase64 = (file: any): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const handleUpload = (file) => {
    console.log("file: ", file);
    myUploadFile(file.file).then((res) => {
      console.log("res: ", res);
      file.onSuccess({
        ...res,
        url: res.url,
        name: res.newFileName,
      });
    });
  };
  const onFinish = (values) => {
    console.log("Success:", values);
    setConfirmLoading(true);
    console.log('fileList: ', fileList);
    request.post(`/design/project`, {
      thumbnail: fileList[0].response.fileName,
      projectName: values.projectName,
      projectManager: values.projectManager,
    }).then((res: any) => {
      console.log("res: ", res);
      message.success("新增成功");
      props?.setOpen(false);
    }).finally(() => {
      setConfirmLoading(false);
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Modal
        title="新建项目"
        centered={true}
        open={props.isopen}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        maskClosable={false}
        okButtonProps={{ autoFocus: true, htmlType: "submit" }}
        modalRender={(dom) => {
          return (
            <Form
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 14 }}
              className="homeForm"
              layout="horizontal"
              style={{ maxWidth: 600 }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              initialValues={{}}
            >
              {dom}
            </Form>
          );
        }}
      >
        <Form.Item colon={false} label="项目名称" name="projectName">
          <Input placeholder="请输入项目名称" />
        </Form.Item>
        <Form.Item colon={false} label="项目经理" name="projectManager">
          <Select placeholder="请选择">
            <Select.Option value="1">Demo</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item colon={false} label="项目缩略图" valuePropName="fileList">
          <Upload
            listType="picture-card"
            onChange={handleChange}
            showUploadList={{ showPreviewIcon: false }}
            customRequest={handleUpload}
          >
            {fileList.length >= 1 ? null : (
              <button style={{ color: "inherit", cursor: "inherit", border: 0, background: "none" }} type="button">
                <img src={require("@/assets/images/icon3.png")} alt="" />
              </button>
            )}
          </Upload>
        </Form.Item>
      </Modal>
    </>
  );
}
