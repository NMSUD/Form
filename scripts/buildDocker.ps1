$json = Get-Content './package.json' | Out-String | ConvertFrom-Json

$dockerTagName = "nmsud-form"
$version = $json."version"

# Write-Output $version

cd ..

docker build --no-cache -t $dockerTagName -f Dockerfile --build-arg BUILD_VERSION=$version .

# ----------------------- Tag and push to remote -----------------------
# docker tag $dockerTagName registry.local.khaoznet.xyz/${dockerTagName}:$version
# docker tag $dockerTagName registry.local.khaoznet.xyz/${dockerTagName}:latest

# docker push registry.local.khaoznet.xyz/${dockerTagName}:$version
# docker push registry.local.khaoznet.xyz/${dockerTagName}:latest
