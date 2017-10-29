react-infinite-scroll-waypoint
==============

[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][downloads-url]

Highly configurable infinite scroll React component. After working on a client project using React without Webpack and no ES6 module support, I created this component from scratch inspired from the various similar NPM plugins available.

Demo will soon be available [here](#)

### Features

* Highly configurable
* Customize all class names, html tags, labels 
* Enable a CTA button to manually load more results instead of loading on scroll
* Disable built in spinner and use external spinner instead

### Installation

```
$ npm i react-infinite-scroll-waypoint  --save
```

### Usage

Detailed docs coming shortly with info on all available props

```JavaScript

import InfiniteScroll from 'react-infinite-scroll-waypoint';

<InfiniteScroll {...{ props }}>
  items inside...
</InfiniteScroll>
```

**Run example**

```
$ git clone https://github.com/tctc91/react-infinite-scroll-waypoint.git
$ cd src
$ cd app
$ npm i
$ npm start
```

** run tests**

```
$ cd app
$ npm run test
```

[npm-image]: https://img.shields.io/npm/v/react-infinite-scroll-waypoint.svg?style=flat-square
[npm-url]: https://npmjs.org/package/react-infinite-scroll-waypoint
[downloads-image]: http://img.shields.io/npm/dm/react-infinite-scroll-waypoint.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/react-infinite-scroll-waypoint