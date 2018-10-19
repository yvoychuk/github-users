import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { get } from 'axios';
import { githubEndpoint } from '../../request';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const PER_PAGE = 100;
const USERS_LIMIT = 100;
const SINCE = 100000;
const STORAGE_KEY_USERS = "users";

const styles = () => ({
    root: {
      padding: '20px',
      width: '400px'
    },
});

const requestParams = {
    params: {
        per_page: PER_PAGE,
        since: SINCE
    }
}

const defaultState = {
    url: `${githubEndpoint}/users`,
    status: 200
};

export const parseNextUrl = (input) => {
    if (typeof input != 'string') return undefined;
    let urlPattern = '<https://api.github.com/users.*>';
    let linkPattern = new RegExp(
        `${urlPattern}; rel="next", ${urlPattern}; rel="first"`
    );
    if (! linkPattern.test(input)) return undefined;
    let url = input.split(',')[0].split(';')[0];
    return url.substring(1, url.length - 1);
}

export const pushToStorage = (data, key=STORAGE_KEY_USERS) => {
    let currentData = JSON.parse(
        localStorage.getItem(key)
    ) || [];
    localStorage.setItem(
        key,
        JSON.stringify([
            ...currentData,
            ...data
        ])
    );
    return 'ok';
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

export const convertArrayToSet = (input, key) => {
    if (! Array.isArray(input)) return;
    if (! input.length > 0) return;
    if (typeof key != "string") return;
    let inputMap = new Map();
    for (let i = 0; i < input.length; i++) {
        let item = input[i];
        if (typeof item != "object") return;
        if (! item.hasOwnProperty(key)) return;
        inputMap.set(item.login, item)
    }
    return inputMap;
}

class UsersTechnicalComponent extends Component {
    constructor(props) {
        super(props);
        this.state = defaultState;
        initializeStorage();   
    }

    getUsers() {
        get(
            this.state.url, 
            requestParams
        ).then(
            (response) => {
                let url = parseNextUrl(response.headers.link);
                let users = response.data;
                this.setState({url, users}, () => pushToStorage(users));
            }
        ).catch(
            () => {
                // error handling
            }
        )
    }

    withLimit(fn) {
        let users = pullFromStorage();
        if (users.length < USERS_LIMIT) {
            fn()
        }
    }

    componentDidMount() {
        this.withLimit(this.getUsers)
    }

    componentDidUpdate() {
        // load more users
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
            <Typography component="div">
                <ul>
                    {
                        users.map(
                            item => (
                                <li key={item.login + item.created}>
                                    {item.login},
                                    {item.followers_url}
                                </li>
                            )
                        )
                    }
                </ul>
            </Typography>
        </Paper>
	}
}

UsersTechnicalComponent.propTypes = {
    classes: PropTypes.object
}

export default withStyles(styles)(UsersTechnicalComponent)