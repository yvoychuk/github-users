import React, {Component} from 'react';
import User from './User';

class List extends Component {
    render() {
        let {items} = this.props;
        let content = items.map(item => <User key={item.id} data={item} />);
        return <div>{content}</div>;
    }
}

export default List