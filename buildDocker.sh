version=$(cat  package.json | grep \"version\" | cut -d'"' -f 4)
dockerTagName=$(cat  package.json | grep \"dockerTagName\" | cut -d'"' -f 4)

# echo $version
# echo $dockerTagName

docker build --no-cache -t $dockerTagName -f Dockerfile --build-arg BUILD_VERSION=$version .

# ----------------------- Tag and push to remote -----------------------
docker tag $dockerTagName registry.local.khaoznet.xyz/$dockerTagName:$version
docker tag $dockerTagName registry.local.khaoznet.xyz/$dockerTagName:latest

docker push registry.local.khaoznet.xyz/$dockerTagName:$version
docker push registry.local.khaoznet.xyz/$dockerTagName:latest

