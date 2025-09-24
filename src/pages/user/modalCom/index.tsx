import { Button, Form, Image, Input, Modal, Radio, Select, Upload, UploadFile, message } from 'antd';
import './auto.less';
import { useState } from 'react';
import { UploadProps } from 'antd/lib';

export default function modalCom(props: any) {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [value, setValue] = useState(1);

  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      props?.setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
      props?.setOpen(false);
  };

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

    const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

 const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

    const onRadioChange = (e: RadioChangeEvent) => {
      setValue(e.target.value);
    };


    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};


  return (
    <>
      <Modal
        title="新增用户"
        centered={true}
        open={props.isopen}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
       <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        className="homeForm"
        layout="horizontal"
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={{ remember: true }}
      >
        <Form.Item
          colon={false}
          label="用户姓名"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}>
          <Input 
          placeholder='请输入' />
        </Form.Item>
         <Form.Item 
          colon={false} 
          label="性别"
           name="xb"
          rules={[{ required: true, message: 'Please input your username!' }]}>
          <Radio.Group
            value={value}
            onChange={onRadioChange}
            options={[
              { value: 1, label: '男' },
              { value: 0, label: '女' },
            ]}
          />
        </Form.Item>
         <Form.Item
            colon={false}
            label="手机号"
            name="phone"
            rules={[{ required: true, message: 'Please input your username!' }]}>
          <Input 
          placeholder='请输入' />
        </Form.Item>
        <Form.Item colon={false}  label="部门">
          <Select 
          placeholder="请选择">
            <Select.Option value="demo">Demo</Select.Option>
            <Select.Option value="demo2">Demo2</Select.Option>
            <Select.Option value="demo3">Demo3</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item colon={false}  label="岗位">
          <Select 
          allowClear
           mode="multiple"
           placeholder="请选择岗位（可多选）">
            <Select.Option value="demo">Demo</Select.Option>
            <Select.Option value="demo2">Demo2</Select.Option>
            <Select.Option value="demo3">Demo3</Select.Option>
          </Select>
        </Form.Item>
        </Form>
      </Modal>
      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
    </>
  );
}