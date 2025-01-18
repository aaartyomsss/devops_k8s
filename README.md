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

### Exercise 3.06: DBaaS vs DIY

**Customisation**

When it comes to DIY solutions it is obvious that the developers have full control of the system, which in some cases is needed depending on the requirements of the systems. However, this comes at a cost and that is maybe the time needed to set things up. In a lot of the cases, recent DBaaS solutions provide a lot of customisation out-of-the-box and will be a suitable solution for majority of the project. On top of it DBaaS is faster and easier to set up.

**Upkeep**

The upkeep of DIY solutions also comes at a cost, as it requires a lot of attention and work. Everything from the security, software updates as well as backups is needed to be done by the team of developers, when all of those things are done by DBaaS provider in other case.

**Scalibility**

Scalibility of the DIY solution is also at question. Generally, DIY solutions are hosted on a single machine with limited resources, making scaling of this very difficult. And even if there is access to multiple machines - self management of distributed systems is a big task.

On the other hand DBaaS solution are generally built in distributed fashion allowing to auto-scale effectively. All it takes is specifying the upper and lower limits of resources being used.

**Conclusion**

In general, DBaaS solution is the way to go unless there is a very good reason to do otherwise as DBaaS provides good solutions out of the box that will ease the life of development team and make them focus on actual development rather than management of complex systems.
