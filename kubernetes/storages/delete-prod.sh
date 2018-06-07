TIME=1
kubectl delete -f persistent-prod-storefront-elastic1.yml
sleep $TIME
kubectl delete -f persistent-prod-storefront-elastic1-pvc.yml
sleep $TIME
kubectl delete -f persistent-prod-storefront-elastic2.yml
sleep $TIME
kubectl delete -f persistent-prod-storefront-elastic2-pvc.yml
sleep $TIME
kubectl delete -f prod-storefront-imagecache.yml
sleep $TIME
kubectl delete -f prod-storefront-imagecache-pvc.yml
sleep $TIME
kubectl delete -f prod-storefront-redis.yml
sleep $TIME
kubectl delete -f prod-storefront-redis-pvc.yml