@hoprnet/hopr-cover-traffic-daemon / [Exports](modules.md)

## CT node

```sh
$ node ./lib/index.js --help
Options:
  --help        Show help  [boolean]
  --version     Show version number  [boolean]
  --provider    A provider url for the network this node shall operate on  [default: "https://still-patient-forest.xdai.quiknode.pro/f0cdbd6455c0b3aea8512fc9e7d161c1c0abf66a/"]
  --privateKey  A private key to be used for the node  [string]
```

Example

```sh
DEBUG="hopr*" node ./lib/index.js --privateKey 0xcb1e5d91d46eb54a477a7eefec9c87a1575e3e5384d38f990f19c09aa8ddd332
```

## CT Dashboard

```sh
$ node ./lib/dashboard.js --help
Options:
  --help        Show help  [boolean]
  --version     Show version number  [boolean]
  --provider    A provider url for the network this node shall operate on  [default: "https://still-patient-forest.xdai.quiknode.pro/f0cdbd6455c0b3aea8512fc9e7d161c1c0abf66a/"]
  --privateKey  A private key to be used for the node  [string]
```

Example:

```sh
node ./lib/dashboard.js --privateKey 0x5d09dea41b9d7510f1bd40099da3ac524f9f3e674d03c78a9c4bec742587cbd3
```