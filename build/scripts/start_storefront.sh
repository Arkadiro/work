#!/bin/bash
cd /repo/build/configs/generate
./generate.sh generate_storefront
sed -i "s/'/\"/g" /repo/storefront/config/local.json
cd /repo/storefront
yarn run build
yarn run start
