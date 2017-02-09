# Process Success

Core application to be used in the Frappe framework.


#### License

© 2017 PROCESS SUCCESS ALL RIGHTS RESERVED

### Bench Installation
Please ensure you have the Frappe 'bench' cli tool installed:

```
$ git clone https://github.com/frappe/bench bench-repo
$ sudo pip install -e bench-repo
```

### Development Notes

Frappe framework utlizes the bench CLI as a development, deployment, and devops tool. You may have multiple benches to for development and/or production testing. Our production server will likely have a product bench with versioning configuration files.

#### Fresh Installation
When instantiating a new bench and you want a fresh installation of a the application, perform the following commands::

```
$ bench init name-of-your-bench ; cd name-of-your-bench
$ bench get-app https://github.com/process-success/Process-Success-Application.git
$ cd apps/process-success

# This adds the remote 'origin' to your local git configuration:
$ git remote add origin https://github.com/process-success/Process-Success-Application.git
$ git fetch origin
$ git checkout develop
```
PLEASE MAKE SURE TO SWITCH TO DEVELOP/FEATURE BRANCH AS PULLING AN APP FROM GIT USING BENCH WILL PLACE YOU IN UPSTREAM/MASTER!!

###### Upstream / Origin
The bench CLI tool pulls from the Process Success Application repo and sets the HEAD as upstream/master. For now, track all you changes in your own feature branch within the 'origin' remote. Whomever is managing git will merge all feature branches with the '
develop' branch of remote. This may be done by pushing directly to origin master or managed as pull requests on github. Once a set of features in the develop branch are deemed stable, these features will be merged into origin/master and tagged with a specific release. Upstream master will then be synced wirth origin master.  

When running the command `bench update --pull`, bench references the remote upstream master. This will most likely only be important for updating the production environment conveinently using the bench CLI with a new production version.

#### Normal Development
Once the app has been successfully pulled down (including adding the 'origin' remote), you can use bench normally with our new app. You may create sites, install the app, etc,. To manage changes, make sure you are in your appropriate feature branch. You can run normal git commands as usual:

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

#### Backup Sites and MariaDb

The bench CLI is capable of backing up your sites and dumping your MariaDb data. This can be useful for sharing and testing local site configurations and testing production data locally, if need be.

