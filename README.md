# bored_ape_update

## QuickStart

This is a Docker based TypeScript Project.  Start the project by running the shell script `run.sh` from the command line.   Or invoke docker directly. 

Please visit `.env` file and then start:

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

