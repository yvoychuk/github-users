import React, {Component} from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import UserList from './UserList';
import User from './User';

class App extends Component {
	render() {
		return <Router>
			<div>
				<Route exact path="/" component={UserList} />
				<Route path="/:userName" component={User} />
			</div>
		</Router>
	}
}

export default App;