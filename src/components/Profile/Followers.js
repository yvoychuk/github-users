import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const styles = () => ({
    card: {
		width: '360px',
		marginRight: '50px'
    }
})

class Followers extends Component {
	render() {
		let { data, classes } = this.props;
		return <div className={classes.card}>
            <Card>
                <CardContent>
					<Typography variant="h4" component="h4">
						Followers
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

export default withStyles(styles)(Followers);