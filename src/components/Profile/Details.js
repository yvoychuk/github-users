import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
    card: {
        width: '360px',
        marginRight: '50px'
    },
    image: {
        backgroundSize: 'contain',
        backgroundColor: '#000',
        backgroundPosition: 'center',
        height: '240px'
    }
})

class Details extends Component {
	render() {
        let { data, classes } = this.props;
        let { name, company, avatar_url, location, bio} = data;
		return <div className={classes.card}>
            <Card>
                <CardMedia
                    className={classes.image}
                    component="div"
                    image={avatar_url}
                />
                <CardContent>
                    <List>
                        <ListItem>
                            <Typography gutterBottom variant="h5" component="h2">
                                {name}
                            </Typography>
                        </ListItem>
                        {company && <ListItem>{company}</ListItem>}
                        {location && <ListItem>{location}</ListItem>}
                        {bio && <ListItem>{bio}</ListItem>}
                    </List>
                </CardContent>
            </Card>
        </div>
	}
}

export default withStyles(styles)(Details);