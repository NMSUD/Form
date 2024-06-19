# New Release

When creating a new release, there are a few things to remember

## To create a new version

- Change the version number in the `package.json` file
- Update the `CHANGELOG.md` with all the changes
- Create a [pull request](https://github.com/NMSUD/Form/compare/main...develop) in the Github Repo

## Deploying the new version

- SSH into the machine
- run `docker pull <registry>/<tagName>`
- run `docker compose up -d --force-recreate`

<!-- markdownlint-capture -->
<!-- markdownlint-disable -->
<div align="center">

### OR

</div>
<!-- markdownlint-restore -->

Use the file [pullLatestAndRecreate.sh](https://github.com/NMSUD/Form/blob/main/scripts/docker/pullLatestAndRecreate.sh)

::: details View contents

```bash
<!--@include: @scripts/docker/pullLatestAndRecreate.sh-->
```

:::
