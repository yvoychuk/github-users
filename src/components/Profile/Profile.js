import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import fetchProfile from '../../actions/profile';
import compose from '../HOC/compose';
import Details from './Details';

const mapStateToProps = ({profile}) => {return { profile }}

const mapDispatchToProps = dispatch => {
	return {
		fetchProfile: (name) => dispatch(fetchProfile(name))
	}
}

const withBackLink = function(profileComponents) {
	return <div>
		<Link to="/">back to list</Link>
		{profileComponents}
	</div>
}

class Profile extends Component {
	componentDidMount() {
		let {match, fetchProfile} = this.props;
		let userName;
		if (typeof match != "undefined") {
			userName = match.params.userName;
		};
		if (typeof userName != "undefined") {
			fetchProfile(userName)
		};
	}

	render() {
		let { profile } = this.props;
		return withBackLink(
			compose(
				profile,
				<Details data={profile && profile.data} />
			)
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);