#!/usr/bin/env bash
kubectl delete configmap balancer-nginx-config --from-file=./configMaps/nginx
kubectl create configmap balancer-nginx-config --from-file=./configMaps/nginx