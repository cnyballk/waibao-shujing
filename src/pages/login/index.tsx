
import styles from './index.less';
import { useStore } from '@/store';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { history } from 'umi';

export default function Login() {
	 const {
    setUserInfo
  } = useStore((state: any) => state);
	
	const onFinish = (values: any) => {
		console.log('Success:', values);
		setUserInfo({
			isLogin: true
		})
		history.replace('/');
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};
	return (
		<div className={styles.login}>
			<div className={styles.loginLeft}>
				<div className={styles.leftTop}>
					<img className={styles.leftTopLogo} src={require('@/assets/images/logo.png')} alt="" />
					<div className={styles.leftTopRight}>
						<h1 className={styles.leftTopTitle}>数境设计交互平台</h1>
						<div className={styles.leftTopDesc}>DesignSphere Platform</div>
					</div>
				</div> 
				<div className={styles.leftMiddle}>
					<div className={styles.leftMiddleItem}>数据无界</div>
					<div className={styles.leftMiddleItem}>设计未来</div>
				</div>
				<div className={styles.leftBottom}>
					<div className={styles.leftBottomP}>数据流动之处，<span className={styles.leftBottomSpan}>灵感</span>自然而生。</div>
					<div className={styles.leftBottomEn}>DesignSphere: Where Data Meets Design, and Innovation Knows No Bounds</div>
				</div>
			</div>
			<div className={styles.loginRight}>
				<div className={styles.loginRightTitle}>用户登录</div>
				<Form
				  className={styles.form}
					name="basic"
					initialValues={{ remember: true }}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete="off"
				>
					<Form.Item
						name="username"
				  	className={styles.formItem}
						rules={[{ required: true, message: '用户名错误!' }]}
					>
						<Input 
						  placeholder='请输入账号'
				  		className={styles.input}
						/>
					</Form.Item>

					<Form.Item
						name="password"
				  	className={styles.formItem}
						rules={[{ required: true, message: '密码错误!' }]}
					>
						<Input.Password 
						  placeholder='请输入您的密码'
				  		className={styles.input}
						/>
					</Form.Item>

					<div  className={styles.formGroup}>
						<Form.Item  className={styles.formItem2}  name="remember" valuePropName="checked">
							<Checkbox>记住密码</Checkbox>
						</Form.Item>
						<span className={styles.formGroupSpan}>忘记密码？</span>
					</div>
					

					<Form.Item >
						<Button className={styles.formBtn} type="primary" htmlType="submit">
							登录
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
}
