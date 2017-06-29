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

Frappe framework utlizes the bench CLI as a development, deployment, and devops tool. You may have multiple benches for development and/or production testing. Our production server will likely have a production bench setup with versioned configuration files.

#### Fresh Installation
When instantiating a new bench and you want a fresh installation of the application, perform the following commands::

```
$ bench init name-of-your-bench ; cd name-of-your-bench
$ bench get-app https://github.com/process-success/Process-Success-Application.git
$ cd apps/process-success

# Change the Frappe Version and build:

# Create a new site and install:

# This adds the remote 'origin' to your local git configuration:
$ git remote add origin https://github.com/process-success/Process-Success-Application.git
$ git fetch origin

# This sets branch master set up to track remote branch master from origin and allow us to avoid that pesky upstream remote setup by bench.
$ git branch -u origin/master
$ git checkout develop_or_feature_branch
```
PLEASE MAKE SURE TO SWITCH TO DEVELOP/FEATURE BRANCH AS TO NOT ACCIDENTALLY MAKE CHANGES IN MASTER!!

###### bench update --pull

When running the command `bench update --pull`, bench references whatever current branch you are on and will pull down the latest changes from the remote branch. 

#### Normal Development
Once the app has been successfully pulled down (including adding the 'origin' remote), you can use bench normally with our new app. You may create sites, install the app, etc,. To manage changes, make sure you are in your appropriate feature branch. You can run normal git commands from the application's directory as usual:

Example:
```
$ cd apps/process-success
$ git status
$ git add . ; git commit
$ git push origin <branch name>
```

##### Git branches
There are two major branches of concern:


    - develop: This is the development branch where all new features are to be integrated and tested. 
               Do not merge into develop without having tested your feature branch extensively and the changes you're making are agreed upon. 
               Ideally, use a pull request so we can all disucc the changes to be made.

    - master: Production state branch. 
              Master should only be updated with major feature pushes via a --squash commit and/or incremental commits (README.md updates etc). This branch is reserved for major releases.

##### Updating your local bench with app changes
To see changes in your application reflected in your currently used site, stop your server and run the following command from the root directory of your branch:


```
# Make sure you are using your desired site
$ bench use site_name
$ bench migrate
```

###### Note

bench migrate is permanent! Please ensure you want to add the new set of DocTypes to your site. Frappe and bench do not support reverse migrations! For example, say you have developed a set of DocTypes and migrate these changes into your site. You then decide to switch back into a branch that does not have these DocTypes and attempt to migrate this branch app into you site. These migrations will not remove (or reverse migrate) the DocTypes that have been migrated into the site's database. It is advisable to run feature branches of the app in a new site and maintain a separate set of sites that reflect the develop branch and master branch.


#### Backup/Restore Sites and MariaDb

The bench CLI is capable of backing up your sites and dumping your MariaDb data. This can be useful for sharing and testing local site configurations and testing production data locally, if need be.

##### Backups

To run a backup of the current site in use, use the following bench command:

```

$ bench use {site_you_want_to_back_up}
$ bench backup --with-files
```

bench backup will create a .sql.gz file in the sites/site_name/private/backups diretory. This file can be used to restore the database definitions for a particular site. Please note that if you have an existing site, you cannot restore that site while it exists. You must re-create the site locally otherwise you will get a name conflict with your site's db name and the db name of the backup.

The '--with-files' option will backup in a .tar file which will store all user uploaded files as a backup. 

Don't forget to `bench use` with the site you want to go back to working on...

##### Restores

To run a restore of a site's MariaDb database definitions use the command:

```
$ bench restore SQL.GZ_FILE_PATH
```

To include public and/or private files use the additional options:

```
$ bench restore SQL.GZ_FILE_PATH --with-public-files TAR_FILE_PATH --with-private-files TAR_FILE_PATH
```

