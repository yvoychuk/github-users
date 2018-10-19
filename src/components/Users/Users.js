import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchUsers from '../../actions/users';
import compose from '../HOC/compose';
import List from './List';

const mapStateToProps = ({users}) => {return { users }}

const mapDispatchToProps = dispatch => {
	return {
		fetchUsers: (since, perPage) => dispatch(fetchUsers(since, perPage))
	}
}

class Users	extends Component {
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

	componentDidUpdate() {
		if (this.state.shouldFetch) {
			this.props.fetchUsers(this.state.since, this.state.perPage);
			this.setState({shouldFetch: false});
		}
	}

	render() {
		let { users } = this.props;
		return compose(
			users,
			<List items={users && users.items} />
		)
	}
}

Users.propTypes = {
	fetchUsers: PropTypes.func,
	users: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)