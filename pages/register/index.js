import React from 'react'
import {Form, Icon, Input, Button, Message} from 'antd'
import Axios from 'axios'
import Link from 'next/link'
import Router from 'next/router'
import './index.css'

class LoginForm extends React.Component {
	constructor() {
		super()
		this.state = {
			loading: false
		}
	}
	handleSubmit = e => {
		e.preventDefault()
		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.setState(() => {
					return {
						loading: true
					}
				})
				Axios.post('http://localhost:2345/user/register', values).then(res => {
					let data = res.data
					if (data.code === 200) {
						Message.success('注册成功', 1.5)
						setTimeout(() => {
							Router.push('/home')
						}, 1500)
					} else {
						Message.error(data.message.errmsg, 1.5)
					}
					this.setState(() => {
						return {
							loading: false
						}
					})
				})
			}
		})
	}

	render() {
		const {getFieldDecorator} = this.props.form
		const {loading} = this.state

		return (
			<Form onSubmit={this.handleSubmit} className="login-form">
				<Form.Item>
					{getFieldDecorator('userName', {
						rules: [{required: true, message: 'Please input your username!'}]
					})(
						<Input
							prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}} />}
							placeholder="Username"
							allowClear
						/>
					)}
				</Form.Item>
				<Form.Item>
					{getFieldDecorator('password', {
						rules: [{required: true, message: 'Please input your Password!'}]
					})(
						<Input
							prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}} />}
							type="password"
							placeholder="Password"
							allowClear
						/>
					)}
				</Form.Item>
				<Form.Item>
					<Button
						block
						type="primary"
						htmlType="submit"
						className="login-form-button"
						loading={loading}
					>
						Register
					</Button>
					<Link href="/login">
						<a>Login in</a>
					</Link>
				</Form.Item>
			</Form>
		)
	}
}

const WrappedNormalLoginForm = Form.create({name: 'normal_login'})(LoginForm)

export default WrappedNormalLoginForm
