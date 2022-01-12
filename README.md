# bored_ape_update

## Pull the active listings for a collection from opensea.io via the events API

## QuickStart

This is a Docker based TypeScript Project.  Start the project by running the shell script `run.sh` from the command line.   Or invoke docker directly. 

Please visit `.env` file, a *hidden* file:

| environment | description |
| ---- | ---- |
| MAXIMUM_DAY | The maximum number of days data to retrieve.  The starting time will be the current time this many days ago |
| COLLECTION_NAME | The name of the collection_slug used on opensea |
| DISPLAY_LIMIT | This is limited to 300 by opensea |
| API_URL | The api url, for testing rinkeby is a good choice |

For test purposes I used `mutant-forest-v4` on rinkeby with the AUCTION_TYPE commented out.   This worked well on rinkeby as dutch auctions seem less common on testnet.

After everything is configured as desired:

```
$ sh run.sh
```
or

```
$ docker build . -t bored_ape_update:1 && docker run -v ${PWD}/output:/output --rm -i -t bored_ape_update:1
```

## From Visual Studio Code 

1. clone the repo
2. Open the bored_ape_update folder
3. Reopen in container

