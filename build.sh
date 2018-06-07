#!/bin/bash
set +e
BRANCH=$1
DATE_WITH_TIME=`date "+%Y%m%d-%H%M%S"`
set -e
PWD=$( pwd )
dapp dimg build  --verbose --introspect-error
dapp dimg tag d.kt-team.de/trg

docker tag d.kt-team.de/trg/storefront d.kt-team.de/trg/storefront:$BRANCH$DATE_WITH_TIME
docker tag d.kt-team.de/trg/api d.kt-team.de/trg/api:$BRANCH$DATE_WITH_TIME

docker push d.kt-team.de/trg/api:latest
docker push d.kt-team.de/trg/storefront:latest

docker push d.kt-team.de/trg/api:$BRANCH$DATE_WITH_TIME
docker push d.kt-team.de/trg/storefront:$BRANCH$DATE_WITH_TIME

docker tag d.kt-team.de/trg/api:latest us.gcr.io/silken-setting-199612/api:latest
docker tag d.kt-team.de/trg/storefront:latest us.gcr.io/silken-setting-199612/storefront:latest
docker tag d.kt-team.de/trg/api:$BRANCH$DATE_WITH_TIME us.gcr.io/silken-setting-199612/api:$BRANCH$DATE_WITH_TIME
docker tag d.kt-team.de/trg/storefront:$BRANCH$DATE_WITH_TIME us.gcr.io/silken-setting-199612/storefront:$BRANCH$DATE_WITH_TIME

gcloud docker -- push us.gcr.io/silken-setting-199612/api:latest
gcloud docker -- push us.gcr.io/silken-setting-199612/storefront:latest
gcloud docker -- push us.gcr.io/silken-setting-199612/api:$BRANCH$DATE_WITH_TIME
gcloud docker -- push us.gcr.io/silken-setting-199612/storefront:$BRANCH$DATE_WITH_TIME

echo -n "us.gcr.io/silken-setting-199612/api:$BRANCH$DATE_WITH_TIME" > image_api
echo -n "us.gcr.io/silken-setting-199612/storefront:$BRANCH$DATE_WITH_TIME" > image_storefront
