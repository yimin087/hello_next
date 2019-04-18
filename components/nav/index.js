import Link from 'next/link'

export default function Nav() {
	return (
		<div>
			<Link href="/about">
				<a>关于我们</a>
			</Link>
			<Link href="/home">
				<a>首页</a>
			</Link>
		</div>
	)
}
