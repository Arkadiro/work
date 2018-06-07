TIME=10
kubectl create -f persistent-prod-storefront-elastic1.yml
sleep $TIME
kubectl create -f persistent-prod-storefront-elastic1-pvc.yml
sleep $TIME
kubectl create -f persistent-prod-storefront-elastic2.yml
sleep $TIME
kubectl create -f persistent-prod-storefront-elastic2-pvc.yml
sleep $TIME
kubectl create -f prod-storefront-imagecache.yml
sleep $TIME
kubectl create -f prod-storefront-imagecache-pvc.yml
sleep $TIME
kubectl create -f prod-storefront-redis.yml
sleep $TIME
kubectl create -f prod-storefront-redis-pvc.yml