import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Users from './Users/Users';
import Profile from './Profile/Profile';
import UsersTechnicalComponent from './UsersTechnicalComponent/UsersTechnicalComponent';

class App extends Component {
	render() {
		return <Router>
			<div>
				<Route exact path="/" component={Users} />
				<Route exact path="/all-users-technical-page" component={UsersTechnicalComponent} />
				<Route 
					path="/profile/:userName" 
					component={
						({match}) => {
							let { userName } = match.params;
							return <Profile userName={userName} />
						}
					}
				/>
			</div>
		</Router>
	}
}

export default App;