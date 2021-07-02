#!/bin/bash

env="window._env_={"

# Read each line in .env file
# Each line represents key=value pairs
while read -r line || [[ -n "$line" ]];
do
  # Initialize variables
  varName=''
  value=''

  # Split env variables by character `=`
  if printf '%s\n' "$line" | grep -e '=' ; then
    varName=$(printf '%s\n' "$line" | sed -e 's/=.*//')

    # Read value of current variable if exists as Environment variable
    value=$(printf '%s\n' "${!varName}")

    # Append configuration property to JS file
    if [[ ${varName} ]] && [[ ${value} ]] ; then
      env="$env$varName:\"$value\","
    fi

  fi
done < .env

env="${env%*,}}"
echo ${env}

# shellcheck disable=SC2164
cd dist

# 备份 index.html 文件
if [[ ! -e index.html.bak ]] ; then
  cp -a index.html index.html.bak
fi
cp -a index.html.bak index.html

# 替换环境变量到 index.html 文件
# shellcheck disable=SC2038
find . -type f -name 'index.html' | \
xargs perl -pi -e "s|<script type=text/javascript id=app-env-script></script>|<script type=text/javascript id=app-env-script>${env}</script>|g"

if [[ ${RUN_SERVER_HOST} ]] && [[ ${RUN_SERVER_PORT} ]] ; then
  echo "打开 http://${RUN_SERVER_HOST}:2${RUN_SERVER_PORT} 访问 ${VUE_APP_NAME} Docker"
fi
