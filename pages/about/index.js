import React, {PureComponent} from 'react'
import Link from 'next/link'

class About extends PureComponent {
	constructor(props) {
		super(props)
		this.state = {
			aboutList: [
				{
					name: 'a',
					id: 1
				},
				{
					name: 'b',
					id: 2
				},
				{
					name: 'ca',
					id: 3
				}
			]
		}
	}
	render() {
		const {aboutList} = this.state
		return (
			<div>
				<p>关于我们</p>
				<ul>
					{aboutList.map(item => (
						<li key={item.id}>
							<Link href={`/about/detail?id=${item.id}`}>
								<a>{item.name}</a>
							</Link>
						</li>
					))}
				</ul>
			</div>
		)
	}
}

export default About
