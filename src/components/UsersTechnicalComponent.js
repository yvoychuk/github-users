import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { get } from 'axios';
import { githubEndpoint, requestParams } from '../request';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const PER_PAGE = 100;
const USERS_LIMIT = 1000;
const SINCE = 100000;
const STORAGE_KEY_USERS = "users";

const styles = () => ({
    root: {
      padding: '20px',
      width: '400px'
    },
  });

export const parseNextUrl = (input) => {
    if (typeof input != 'string') return undefined;
    let urlPattern = '<https://api.github.com/users.*>';
    let linkPattern = new RegExp(
        `${urlPattern}; rel="next", ${urlPattern}; rel="first"`
    );
    if (! linkPattern.test(input)) return undefined;
    let inputSplitted = input.split(',');
    let leftPart = inputSplitted[0];
    let leftPartSplitted = leftPart.split(';');
    let urlUnparsed = leftPartSplitted[0];
    let url = urlUnparsed.substring(1, urlUnparsed.length - 1);
    return url;
}

const pushToStorage = (data, key=STORAGE_KEY_USERS) => {
    let currentData = JSON.parse(
        localStorage.getItem(key)
    ) || [];
    localStorage.setItem(
        key,
        JSON.stringify([
            ...currentData,
            ...data
        ])
    )
}

const pullFromStorage = (key=STORAGE_KEY_USERS) => {
    return JSON.parse(localStorage.getItem(key))
}

const initializeStorage = (key=STORAGE_KEY_USERS) => {
    let currentData = localStorage.getItem(key);
    if (currentData === null) {
        localStorage.setItem(key, JSON.stringify([]));
    }
}

// todo
// const convertArrayToSet = (array) => {}

const usersAuthorizedRequestParams = {
    ...requestParams,
    ...{
        params: {
            per_page: PER_PAGE,
            since: SINCE
        }
    }
}

const defaultState = {
    url: `${githubEndpoint}/users`,
    status: 200
};

class UsersTechnicalComponent extends Component {
    constructor(props) {
        super(props);
        this.state = defaultState;
        initializeStorage();   
    }

    getUsers() {
        get(
            this.state.url, 
            usersAuthorizedRequestParams
        ).then(
            (response) => {
                let url = parseNextUrl(response.headers.link);
                this.setState({url});
                pushToStorage(response.data);
            }
        ).catch(
            () => {
                // error handling
            }
        )
    }

    componentDidMount() {
        // initial fetch or set status
        this.getUsers()
    }

    componentDidUpdate() {
        let users = pullFromStorage();
        if (users.length < USERS_LIMIT) {
            // next fetch
        }
    }

	render() {
        let {classes} = this.props;
        let {status} = this.state;
        let users = pullFromStorage();
        return <Paper className={classes.root} elevation={1}>
            <Typography variant="h5" component="h3">
                status: {status}
            </Typography>
            <Typography component="p">
                users count: {users.length}
            </Typography>
        </Paper>
	}
}

UsersTechnicalComponent.propTypes = {
    classes: PropTypes.object
}

export default withStyles(styles)(UsersTechnicalComponent)