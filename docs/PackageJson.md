# Package.json

We make use of the `npm-run-all` package to help split up the scripts, so that we can reuse them. For example, if we have scripts `test:one`, `test:two`, `test:three` and then run `npm-run-all --sequential test:*`, then each of the scripts that start with "test:" would run one at a time.


### Custom keys

The `dockerTagName` key is used by the docker build scripts. This way the .ps1 or .sh script can tag the docker build with the same name, without having to keep the name consistent in the 2 files.