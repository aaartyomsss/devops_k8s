# This is DevOps with K8S course submission repo

## Part 1 notes

Honestly, don't know where to start, but some how locally, with my .yaml file specifying `imagePullPolicy: Never`, it still wasn't able to find local image. As a work-around have to push image to my docker hub and use policy `imagePullPolicy: ifNotPresent`

## Part 2

Encryption, considering that I am on windows works without using quotes aka:

```bash
sops --encrypt --age <public_key> --encrypted-regex ^(data)$ secret.yaml > secret.enc.yaml
```

## Part 3

Shortcuts for cluster creation and deletion

```bash
gcloud container clusters create dwk-cluster --zone=europe-north1-b --cluster-version=1.29 --disk-size=32 --num-nodes=3 --machine-type=e2-micro

gcloud container clusters delete dwk-cluster --zone=europe-north1-b
```
