import {parseNextUrl} from './UsersTechnicalComponent';

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
        test(
            'sample string',
            () => expect(parseNextUrl(SAMPLE_STRING)).toBe(undefined)
        )

        test(
            'sample long string',
            () => expect(parseNextUrl(SAMPLE_LONG_STRING)).toBe(undefined)
        )

        test(
            'sample array',
            () => expect(parseNextUrl(SAMPLE_ARRAY)).toBe(undefined)
        )

        test(
            'sample object',
            () => expect(parseNextUrl(SAMPLE_OBJECT)).toBe(undefined)
        )

        test(
            'sample function',
            () => expect(parseNextUrl(SAMPLE_FUNCTION)).toBe(undefined)
        )

        test(
            'corrupted url',
            () => {
                expect(parseNextUrl(urls.corrupted)).toBe(undefined)
            }
        )

        test(
            'correct url',
            () => {
                expect(parseNextUrl(urls.correct)).toBe('https://api.github.com/users?per_page=100&since=100110')
            }
        )
    }    
)