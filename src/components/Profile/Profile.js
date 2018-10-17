import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import fetchProfile from '../../actions/profile';
import compose from '../HOC/compose';
import Container from './Container';
import Button from '@material-ui/core/Button';

const mapStateToProps = ({user}) => {return { user }}

const mapDispatchToProps = dispatch => {
	return {
		fetchProfile: (name) => dispatch(fetchProfile(name))
	}
}

const withBackLink = function(profileComponents) {
	return <div>
		<Link to="/">
			<Button color="primary" variant="outlined">back to list</Button>
		</Link>
		{profileComponents}
	</div>
}

class Profile extends Component {
	componentDidMount() {
		let {fetchProfile, userName} = this.props;
		fetchProfile(userName);
	}

	componentDidUpdate(prevProps) {
		if (prevProps.userName !== this.props.userName) {
			this.props.fetchProfile(this.props.userName)	
		}
	}

	render() {
		let { user } = this.props;
		return withBackLink(
			compose(
				user ? user.profile : {},
				<Container data={user} />
			)
		)
	}

}

Profile.propTypes = {
	fetchProfile: PropTypes.func,
	userName: PropTypes.string,
	user: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)