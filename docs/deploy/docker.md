# Docker

This project makes use of [Docker][docker] to create an "easy" way of running the whole solution. However the resulting [Docker][docker] image of this solution will not be uploaded to a public [Docker Hub][dockerHub]. Any images that claim to be of this project are fraudulent or forks of this project. If we decide to publish an _official_ [Docker][docker] image, this part of the documentation will be updated.

_While the front-end is a ~~simple~~ [SolidJS][solidjs] app, which we could host on GithubPages, it will be served up by KoaJS in the docker image_

## Why?

Docker makes it easy to run applications without having anything installed on the host machine (other than docker). 

## Developing

- Ensure that your `.env` is correct
- Run `docker compose watch`
  - This will run containers for the front-end and api
  - Any changes made will be synced to the container

## Build for production

Ensure that you have [Docker][docker] installed. Also check that you have created a `.env` file (based on the `.env.template file`) and that you have filled in the variables. 

> You can also create files like `.env.prod`, `.env.dev2`, etc. When running the `buildAndDeploy.sh` file you will be prompted for which file to load.

From the root directory of this project (where the `Dockerfile` is), run `sh ./scripts/docker/buildAndDeploy.sh`. This will get some info required from the `.env` that you should have created and start the process of building the image using [Docker][docker].

## Configure

If you want to tag and push this image to your own registry, you can simply change the properties that start with `DOCKER_` in the `.env`.

> [!IMPORTANT]
> Do not try to impersonate this project by pushing this image to a container image library like [docker hub][dockerhub] with the same name or similar.

<!-- Links used in the page -->

[nmsudWebsite]: https://nmsud.com
[docker]: https://www.docker.com
[dockerhub]: https://hub.docker.com
[solidjs]: https://www.solidjs.com
[discord]: https://discord.gg/jQrNeWeTwR