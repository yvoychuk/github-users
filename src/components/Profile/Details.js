import React, {Component} from 'react';

class Details extends Component {
	render() {
		let { data } = this.props;
		return <div>
            {data.login}
        </div>
	}
}

export default Details;