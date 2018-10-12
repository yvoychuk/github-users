import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Link, withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = () => ({
    card: {
		width: '360px',
		marginRight: '50px'
    }
})

class Following extends Component {
	render() {
		let { data, classes } = this.props;
		return <div className={classes.card}>
			<Link to="/profile/yvoychuk">base</Link>
            <Card>
                <CardContent>
					<Typography variant="h4" component="h4">
						Following
					</Typography>
                    <List>
						{
							data.map(
								({id, login}) => <ListItem key={id}>
									<Link to={`/profile/${login}`}>
										{login}
									</Link>
								</ListItem>
							)
						}
					</List>
                </CardContent>
            </Card>
        </div>
	}
}

export default withStyles(styles)(Following)