import {withRouter} from 'next/router'

export default withRouter(porps => {
	// console.log(porps.router.query.id)
	return <div>about detail{porps.router.query.id}</div>
})
