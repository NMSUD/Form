# This solution was designed to run in a Docker container

_While the front-end is a ~simple~ SolidJS app, which we could host on GithubPages, it will be served up by KoaJS in the docker image_

### Why?

Docker makes it easy to run applications without having anything installed on the host machine (other than docker). 

### Build

Ensure that you have [Docker][docker] installed. Also check that you have created a `.env` file (based on the [.env.template file](../.env.template)) and that you have filled in the variables. 

From the root directory of this project (where the [Dockerfile](../Dockerfile) is), run `sh ./scripts/buildDocker.sh`. This will get some info required from the `.env` that you should have created and start the process of building the image using [Docker][docker].

### Configure

If you want to tag and push this image to your own registry, you can simply change the properties that start with `DOCKER_` in the `.env`.

> [!IMPORTANT]
> Do not try to impersonate this project by pushing this image to a container image library like [dockerhub][dockerhub] with the same name or similar.

<br />
<br />
<br />

<!-- Links used in the page -->

[nmsudWebsite]: https://nmsud.com
[docker]: https://www.docker.com
[dockerhub]: https://hub.docker.com
[dockerHub]: https://hub.docker.com
[discord]: https://discord.gg/jQrNeWeTwR