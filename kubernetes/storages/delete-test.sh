TIME=1
kubectl delete -f test-storefront-catalog.yml
sleep $TIME
kubectl delete -f test-storefront-catalog-pvc.yml
sleep $TIME
kubectl delete -f test-storefront-imagecache.yml
sleep $TIME
kubectl delete -f test-storefront-imagecache-pvc.yml
sleep $TIME
kubectl delete -f test-storefront-redis.yml
sleep $TIME
kubectl delete -f test-storefront-redis-pvc.yml