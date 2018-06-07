TIME=10
kubectl create -f test-storefront-catalog.yml
sleep $TIME
kubectl create -f test-storefront-catalog-pvc.yml
sleep $TIME
kubectl create -f test-storefront-imagecache.yml
sleep $TIME
kubectl create -f test-storefront-imagecache-pvc.yml
sleep $TIME
kubectl create -f test-storefront-redis.yml
sleep $TIME
kubectl create -f test-storefront-redis-pvc.yml