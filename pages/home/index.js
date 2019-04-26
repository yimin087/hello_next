import React, {PureComponent} from 'react'
import fetch from 'isomorphic-unfetch'
import Axios from 'axios'
import {Row, Col, Message, Card, Pagination} from 'antd'
import Router from 'next/router'
class Home extends PureComponent {
	constructor() {
		super()
		this.state = {
			SubID: '',
			SubList: [],
			goods: {},
			goodsList: []
		}
	}
	static async getInitialProps() {
		const res = await fetch('http://localhost:2345/goods/getCategoryList')
		const errorCode = res.statusCode > 200 ? res.statusCode : false
		const json = await res.json()
		return {errorCode, CategoryList: json.message}
	}
	checkCategory = id => {
		Axios.post('http://localhost:2345/goods/getCategorySubList', {
			cateoryId: id
		}).then(res => {
			let data = res.data
			console.log(data)
			if (data.code === 200) {
				this.setState(() => {
					return {
						SubList: data.message
					}
				})
			} else {
				Message.error(data.message, 1.5)
			}
		})
	}
	checkSub = (id, page) => {
		const {SubID} = this.state
		if (id !== SubID) {
			this.setState(() => {
				return {
					SubID: id
				}
			})
		}
		this.setState
		Axios.post('http://localhost:2345/goods/getGoodsListByCategorySubID', {
			categorySubId: id,
			page,
			size: 8
		}).then(res => {
			let data = res.data
			console.log(data)
			if (data.code === 200) {
				this.setState(() => {
					return {
						goods: data,
						goodsList: data.message
					}
				})
			} else {
				Message.error(data.message, 1.5)
			}
		})
	}

	checkDetail = id => {
		Router.push({pathname: '/detail', query: {id}})
	}
	render() {
		const {SubList, goods, goodsList, SubID} = this.state
		return (
			<Row>
				<Col span={3}>
					<ul className="nav">
						{this.props.CategoryList.map(item => (
							<li
								key={item.ID}
								onClick={() => {
									this.checkCategory(item.ID)
								}}
							>
								{item.MALL_CATEGORY_NAME}
							</li>
						))}
					</ul>
				</Col>
				<Col span={3}>
					<ul className="subnav">
						{SubList.map(item => (
							<li
								key={item.ID}
								onClick={() => {
									this.checkSub(item.ID, 1)
								}}
							>
								{item.MALL_SUB_NAME}
							</li>
						))}
					</ul>
				</Col>
				<Col span={18}>
					<Row>
						{goodsList.map(item => (
							<Col span={6} key={item.ID}>
								<Card
									title={item.NAME}
									style={{width: 300}}
									onClick={() => {
										this.checkDetail(item.ID)
									}}
								>
									<img
										style={{width: '100%'}}
										src={item.PICTURE_COMPERSS_PATH}
										alt=""
									/>
								</Card>
							</Col>
						))}
					</Row>
					{goodsList.length ? (
						<div>
							<Pagination
								defaultCurrent={1}
								total={goods.total}
								pageSize={goods.size}
								onChange={page => {
									this.checkSub(SubID, page)
								}}
							/>
						</div>
					) : (
						''
					)}
				</Col>
				<style jsx>{`
					.nav {
						font-size: 22px;
						line-height: 40px;
						padding-left: 40px;
						padding-top: 40px;
						text-algin: center;
					}
					.nav li:hover {
						background: #ccc;
					}
					.subnav {
						font-size: 18px;
						line-height: 40px;
						padding-left: 40px;
						padding-top: 60px;
						text-algin: center;
					}
					.subnav li:hover {
						background: #ccc;
					}
				`}</style>
			</Row>
		)
	}
}

export default Home
