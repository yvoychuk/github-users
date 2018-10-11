import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class User extends Component {
    render() {
        let {data} = this.props;
        return <Link to={`/profile/${data.login}`}>
            <div>
                <h4>{data.login}</h4>
                <p>{data.html_url}</p>
            </div>
        </Link>;
    }
}

export default User;