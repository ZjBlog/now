workflow "New workflow" {
  on = "push"
  resolves = ["Message"]
}

action "deploy" {
  uses = "actions/zeit-now@666edee2f3632660e9829cb6801ee5b7d47b303d"
  secrets = ["ZEIT_TOKEN"]
  args = "--public --no-clipboard deploy ./sc > $HOME/$GITHUB_ACTION.txt"
}

action "alias" {
  uses = "actions/zeit-now@666edee2f3632660e9829cb6801ee5b7d47b303d"
  needs = ["deploy"]
  secrets = ["ZEIT_TOKEN"]
  args = "alias `cat /github/home/deploy.txt` $GITHUB_SHA"
}

action "Filters for GitHub Actions" {
  uses = "actions/bin/filter@46ffca7632504e61db2d4cb16be1e80f333cb859"
  needs = ["alias"]
  args = "branch master"
}

action "release" {
  uses = "actions/zeit-now@666edee2f3632660e9829cb6801ee5b7d47b303d"
  needs = ["Filters for GitHub Actions"]
  secrets = ["ZEIT_TOKEN"]
  args = " -e API_KEY='0b2bdeda43b5688921839c8ecb20399b' alias --local-config=./sc/now.json"
}

action "Message" {
  uses = "ZjBlog/message@master"
  needs = ["release"]
  secrets = ["URL"]
  env = {
    MESSAGE = "now部署成功"
  }
}