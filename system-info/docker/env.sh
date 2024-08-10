echo "Replacing env variables in JS files"

for file in /usr/share/nginx/html/static/js/*.js; do
  echo "Processing $file ..."
  echo ${BACK_BASE_URI}

  sed -i 's|BACK_BASE_URI|'${BACK_BASE_URI}'|g' $file

done

echo "Replacement complete"