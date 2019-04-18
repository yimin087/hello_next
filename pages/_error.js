import Link from 'next/link'

const _error = () => {
	return (
		<div>
			<p>您访问的页面去火星了!!</p>
			<div>
				返回
				<Link href="/home">
					<a>首页</a>
				</Link>
			</div>
		</div>
	)
}

export default _error
