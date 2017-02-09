## Process Success

Core application to be used in the Frappe framework.

#### License

© 2017 PROCESS SUCCESS ALL RIGHTS RESERVED

#### Bench Installation
Please ensure you have the Frappe 'bench' cli tool installed:

```
$ git clone https://github.com/frappe/bench bench-repo
$ sudo pip install -e bench-repo
```

#### Development Notes

Frappe framework utlizes the bench CLI as a development, deployment, and devops tool. You may have multiple benches to for development and/or production testing. Our production server will likely have a product bench with versioning configuration files.

##### Fresh Installation
If instantiating a fresh installation of a bench, perform the following commands::

```
$ bench init name-of-your-bench ; cd name-of-your-bench
$ bench get-app https://github.com/process-success/Process-Success-Application.git
$ cd apps/process-success

# This adds the remote 'origin' to your local git configuration:
$ git remote add origin https://github.com/process-success/Process-Success-Application.git
$ git checkout develop
```
PLEASE MAKE SURE TO SWITCH TO DEVELOP/FEATURE BRANCH AS PULLING AN APP FROM GIT USING BENCH WILL PLACE YOU IN UPSTREAM/MASTER!!

###### Upstream / Origin
The bench CLI tool pulls from the Prcess Success Application repo and sets the HEAD as upstream/master. For now, track all you changes in your own feature branch with the 'origin' remote. We need to work together to get a good system of merging completed feature into origin/master usch that the changes are refelcted in upstream/master.

##### Normal Development
Once installed, you can use bench normally with our new app. You may create sites, install the app, etc,. To manage changes, make sure you are in your appropriate feature branch, and simply enter the working directory of your feature branch and run git commands as you normally would.

Example:
```
$ bench cd apps/process-success
$ git status
$ git add . ; git commit
$ git push origin <branch name>
```




###### Updating Local Bench
To see changes in your application reflected in your running bench, stop your server and run the following command from the root directory of your branch:

```
$ bench update --patch
```
