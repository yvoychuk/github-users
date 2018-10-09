import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUser } from './actions';

const mapStateToProps = ({user}) => {return { user }}

const mapDispatchToProps = dispatch => {
	return {
		fetchUser: (name) => dispatch(fetchUser(name))
	}
}

class User extends Component {
	componentDidMount() {
		this.props.fetchUser(this.props.match.params.userName)
	}

	render() {
		let { user } = this.props;
		console.log(user)
		return <div>
			<Link to="/">back to list</Link>
			{
				user
					? <div>
						<h1>{user.name}</h1>
						<img src={user.avatar_url} />
						<div>
							<h4>number of followers</h4>
							<i>{user.followers || 'undefined'}</i>
						</div>
						<div>
							<h4>number of followings</h4>
							<i>{user.following || 'undefined'}</i>
						</div>
						<div>
							<h4>created at</h4>
							<i>{user.created_at || 'undefined'}</i>
						</div>
						<div>
							<h4>company</h4>
							<i>{user.company || 'undefined'}</i>
						</div>
						<div>
							<h4>email</h4>
							<i>{user.email || 'undefined'}</i>
						</div>
						<div>
							<h4>location</h4>
							<i>{user.location || 'undefined'}</i>
						</div>
						<div>
							<h4>blog</h4>
							<i>{user.blog || 'undefined'}</i>
						</div>
						<div>
							<h4>bio</h4>
							<i>{user.bio || 'undefined'}</i>
						</div>
					</div>
					: <div>loading...</div>
			}
		</div>
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(User);