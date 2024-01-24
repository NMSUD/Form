#!/bin/sh

# Credits: http://stackoverflow.com/a/750191

git filter-branch -f --env-filter "
    GIT_AUTHOR_NAME='Kurt Lourens'
    GIT_AUTHOR_EMAIL='hi@kurtlourens.com'
    GIT_COMMITTER_NAME='Kurt Lourens'
    GIT_COMMITTER_EMAIL='hi@kurtlourens.com'
  " HEAD