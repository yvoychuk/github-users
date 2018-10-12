import React, {Component} from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Users from './Users/Users';
import Profile from './Profile/Profile';

class App extends Component {
	render() {
		return <Router>
			<div>
				<Route exact path="/" component={Users} />
				<Route path="/profile/:userName" component={({match}) => <Profile userName={match.params.userName} />} />
			</div>
		</Router>
	}
}

export default App;