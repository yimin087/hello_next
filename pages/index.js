import React, {PureComponent} from 'react'
import fetch from 'isomorphic-unfetch'
import {Button} from 'antd'

class Home extends PureComponent {
	constructor(props) {
		super(props)
		this.state = {
			text: 'Hello Next'
		}
	}
	static async getInitialProps() {
		const res = await fetch('https://api.github.com/repos/zeit/next.js')
		const errorCode = res.statusCode > 200 ? res.statusCode : false
		const json = await res.json()

		return {errorCode, stars: json.stargazers_count}
	}
	render() {
		console.log(this.props)
		return (
			<div>
				<Button type="primary">Button</Button>
				{this.state.text}
				{this.props.stars}
			</div>
		)
	}
}

export default Home
