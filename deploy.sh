read -p "Are you sure gulp is off? " -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then

git add -A
git commit -am $1
git push


git checkout stage
git merge develop
git commit -am $1
git push
git checkout develop

fi
