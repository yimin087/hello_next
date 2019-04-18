import React from 'react'
import App, {Container} from 'next/app'
import Nav from '../components/nav'

class Layout extends React.Component {
	render() {
		const {children} = this.props
		return (
			<div className="layout">
				<Nav />
				{children}
			</div>
		)
	}
}

export default class MyApp extends App {
	render() {
		const {Component, pageProps} = this.props
		return (
			<Container>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</Container>
		)
	}
}
