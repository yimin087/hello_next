import React, {Component} from 'react'
import fetch from 'isomorphic-unfetch'
import {withRouter} from 'next/router'
import './index.css'

class Detail extends Component {
	static async getInitialProps(ctx) {
		const {id} = ctx.query
		const res = await fetch(
			`http://localhost:2345/goods/getDetailGoodsInfo?goodsId=${id}`
		)

		const errorCode = res.statusCode > 200 ? res.statusCode : false
		const json = await res.json()
		return {detail: json.message}
	}

	render() {
		const {detail} = this.props
		return (
			<div className="detail">
				<ul>
					<li>
						<img src={detail.IMAGE1} alt="" />
						<h1>{detail.NAME}</h1>
					</li>
					<li
						className="imgDetail"
						dangerouslySetInnerHTML={{__html: detail.DETAIL}}
					/>
				</ul>
			</div>
		)
	}
}

export default withRouter(Detail)
