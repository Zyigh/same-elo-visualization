# same-elo-visualization

If you never wondered how the elo rating of chess players would have changed within a tournament if they all started 
at the same elo, you are normal.

Nevertheless, this project can make you visualize it, round by round, and allows you to change the K value to accentuate
the differences

## Project setup

You can use docker such as

```bash
docker build -t elovisu .
docker run -it --rm -p 8080:80 --name EloVisu elovisu
```

or you may use yarn

```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
