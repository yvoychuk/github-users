import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUsers } from './actions';
import './styles.css';

const mapStateToProps = ({users}) => {return { users }}

const mapDispatchToProps = dispatch => {
	return {
		fetchUsers: (since, perPage) => dispatch(fetchUsers(since, perPage))
	}
}

class UserList 	extends Component {
	constructor() {
		super();
		this.state = {
			since: 1,
			perPage: 30,
			shouldFetch: false
		}
	}

	componentDidMount() {
		this.props.fetchUsers(this.state.since, this.state.perPage)
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.shouldFetch) {
			this.props.fetchUsers(this.state.since, this.state.perPage);
			this.setState({shouldFetch: false});
		}
	}

	render() {
		let { users } = this.props;
		return users
			? <div>
				<div>
					<p>configure:</p>
					<div>
						<label>
							<h5>since</h5>
							<input 
								type="number"
								onChange={
									evt => {
										this.setState({since: evt.target.value});
									}
								}
								value={this.state.since}
								placeholder="show users since" 
							/>
						</label>
						<label>
							<h5>per page</h5>
							<input 
								type="number"
								onChange={
									evt => {
										this.setState({perPage: evt.target.value});
									}
								}
								value={this.state.perPage}
								placeholder="users per page" 
							/>
						</label>
						<label>
							<button
								type="button"
								onClick={
									evt => {
										this.setState({shouldFetch: true});
									}
								}
							>
								update
							</button>
						</label>
					</div>
				</div>
				<ul className="user-list">
					{
						users.map(
							user => <li key={user.id}>
								<div className="user-list__item">
									<img src={`${user.avatar_url}`} className="user-list__avatar" />
									<div>
										<div>
											<Link to={`/${user.login}`}>{user.login}</Link>
										</div>
										<div>{user.html_url}</div>
									</div>
								</div>
							</li>
						)
					}
				</ul>
			</div>
			: <div>loading...</div>
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);