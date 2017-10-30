react-infinite-scroll-waypoint
==============

[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][downloads-url]

Highly configurable infinite scroll React component. After working on a client project using React without Webpack and without ES6 module support, I ended up creating a component inspired from the various scroll plugins available on NPM. I've since re-written it and made it available on NPM with full test coverage and extra configuration options.

### Demo available [here](https://tctc91.github.io/react-infinite-scroll-waypoint/)

![alt text](https://i.imgur.com/bl0GCqC.png "Preview image")


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

<InfiniteScroll
  scrollElementName="classname-of-scroll-element"
  loading={false}
  currentPage={1}
  clickToUpdate={false}
  hasMore={true}
  onUpdate={page => console.log('call for more items!')}
>
  // map your results here
  // when onUpdate() is fired, merge your new results in
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

**Run tests**

```
$ cd app
$ npm run test
```

[npm-image]: https://img.shields.io/npm/v/react-infinite-scroll-waypoint.svg?style=flat-square
[npm-url]: https://npmjs.org/package/react-infinite-scroll-waypoint
[downloads-image]: http://img.shields.io/npm/dm/react-infinite-scroll-waypoint.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/react-infinite-scroll-waypoint