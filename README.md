This is an app with simple possible file and code structure, which purposes are:
- fetch github users list (up to 100);
- enable `since` and `per_page` parameters passing;
- show full user profile on single page.

List of improvements:
- show followers, repos, followings in profile;
- pagination of users list;
- better styling;
- refactoring (not-DRY, naming, readability);
- performance improvements;
- error & progress handling;
- improve local build process;
- basic testing.

For local development/testing `parcel-bundler` was used as global dependency.

To run app, follow next steps
`npm install & npm install -g parcel-bundler`  
`npm start`

Local webserver is on address `http://localhost:1234`.
 
