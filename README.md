### Payments Data Dashboard

#### Installation
`git clone git@github.com:inconduit/circle-payments.git`

`cd circle-payments`

`yarn install`

#### Running

Start the Payments Data Server (not included in this repo)

`yarn dev`

Open a browser at [http://localhost:3000](http://localhost:3000)

Commit history can be viewed at [https://github.com/inconduit/circle-payments/commits/main](https://github.com/inconduit/circle-payments/commits/main) for a demonstration of development flow; feature branches and semantic commit messages


#### Notes on Payment Form:

- fully validated inline, client side
- sender / receiver being the same are *not* validated client side intentionally to demonstrate showing server error responses
- retry happens on failed POST 503 as per spec, a 1000ms delay is set between retries to simulate latency
