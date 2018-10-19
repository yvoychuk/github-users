import {
    parseNextUrl,
    convertArrayToSet
} from './UsersTechnicalComponent';

const SAMPLE_STRING = 'foobar';
const SAMPLE_LONG_STRING = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.s';
const SAMPLE_ARRAY = [0, 1, 2, 3, 4];
const SAMPLE_OBJECT = {
    a: 0,
    b: 1,
    c: 2
};
const SAMPLE_FUNCTION = function() {
    return;
};

describe(
    'parseNextUrl',
    () => {
        let urls = {
            corrupted: '<https://api2.github.com/users?per_page=100&since=100110>; rel="next", <https://api.github.com/users{?since}>; rel="first"',
            correct: '<https://api.github.com/users?per_page=100&since=100110>; rel="next", <https://api.github.com/users{?since}>; rel="first"'
        }
        let fn = parseNextUrl;

        test(
            'input simple types: should return "undefined"',
            function() {
                expect(fn()).toBeUndefined();
                expect(fn(null)).toBeUndefined();
                expect(fn(SAMPLE_ARRAY)).toBeUndefined();
                expect(fn(SAMPLE_OBJECT)).toBeUndefined();
                expect(fn(SAMPLE_FUNCTION)).toBeUndefined();
                expect(fn(SAMPLE_STRING)).toBeUndefined();
                expect(fn(SAMPLE_LONG_STRING)).toBeUndefined();
            }
        )

        test(
            'corrupted url: should return "undefined"',
            () => {
                expect(fn(urls.corrupted)).toBeUndefined();
            }
        )

        test(
            'correct url, should return: "https://api.github.com/users/${sinceValue}',
            () => {
                expect(fn(urls.correct)).toBe('https://api.github.com/users?per_page=100&since=100110')
            }
        )
    }    
)

describe(
    'convertArrayToSet',
    () => {
        let arrays = {
            correct: [{login: 'one'}, {login: 'two'}],
            corrupted: {
                completely: SAMPLE_ARRAY,
                withMissedKey: [{login: 'one'}, SAMPLE_OBJECT],
                withDifferentTypes: [{login: 'one'}, SAMPLE_STRING]
            }
        }
        let fn = convertArrayToSet;
        let defaultKey = 'login';

        test(
            'input simple types: should return "undefined"',
            function() {
                expect(fn()).toBeUndefined();
                expect(fn(null)).toBeUndefined();
                expect(fn([])).toBeUndefined();
                expect(fn(SAMPLE_OBJECT, defaultKey)).toBeUndefined();
                expect(fn(SAMPLE_FUNCTION)).toBeUndefined();
                expect(fn(SAMPLE_STRING, defaultKey)).toBeUndefined();
                expect(fn(SAMPLE_LONG_STRING)).toBeUndefined();
            }
        )

        test(
            'incompatible array: should return "undefined"',
            function() {
                expect(fn(arrays.corrupted.completely, defaultKey)).toBeUndefined();
                expect(fn(arrays.corrupted.withMissedKey, defaultKey)).toBeUndefined();
                expect(fn(arrays.corrupted.withDifferentTypes, defaultKey)).toBeUndefined();
            }
        )

        test(
            'incompatible key: should return "undefined"',
            function() {
                expect(fn(arrays.correct)).toBeUndefined();
                expect(fn(arrays.correct, SAMPLE_OBJECT)).toBeUndefined();
                expect(fn(arrays.correct, SAMPLE_STRING)).toBeUndefined();
            }
        )
        
        let m = new Map();
        m.set('one', {login: 'one'});
        m.set('two', {login: 'two'});
        expect.extend(
            {
                toBeSameAsMap(received, sample) {
                    let pass = true;
                    let errorMsg;
                    if (received.size !== sample.size) {
                        pass = false;
                    };
                    for (let [k] of received) {
                        if (! sample.has(k)) {
                            pass = false;
                            errorMsg = `missed key in map: ${k}`
                        }
                    }
                    if (pass) {
                        return {
                            message: () => `done`,
                            pass
                        }
                    } else {
                        return {
                            message: () => errorMsg,
                            pass
                        }
                    }
                }
            }
        )
        test(
            'correct array: should return "true"',
            function() {
                expect(fn(arrays.correct, 'login')).toBeSameAsMap(m);
            }
        )
    }
)