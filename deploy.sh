git add -A
git add -u
git commit -am "changes"
git push
git checkout stage
git merge develop
git push
git checkout master
git merge stage
git push
git checkout develop

