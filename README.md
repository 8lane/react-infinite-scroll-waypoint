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
$ cd app
$ npm i
$ npm start
```

**Run tests**

```
$ cd app
$ npm run test
```

**Available Props**

| Prop Name | Type | Required | Default Value | Description
|-----------|-----------|:-----------:|-----------|-----------|
| scrollElementName | string |✓|| The class name of the element in which contains the srollable content. E.g. the element which should have a scrollbar |
| loading  | bool || false | Indicates that new content is fetching |
| hasMore  | bool || true | Prevents the onUpdate callback from firing when no more content is available |
| currentPage  | number || 1 | Incremented on each onUpdate callback |
| className  | string || infinite-scroll | Class name of the scroll element |
| componentTagName  | string || div | HTML tag for the scroll element |
| waypointTagName  | string || span | HTML tag for the invisible waypoint used for scroll detection |
| waypointClassName  | string || infinite-scroll__waypoint | Class name of the invisible waypoint |
| clickToUpdate | bool || false | Adds a button forcing users to click to load more content. Disables scrolling functionality |
| clickToUpdateBtnClassName  | string || infinite-scroll__update-cta | Class name of the update CTA button |
| clickToUpdateBtnLabel  | string || Load more... | Text to appear on the button |
| externalSpinner | bool || false | Enable this to disable the built in spinner
| onUpdate  | function | ✓ | Fires each time the user scrolls to the bottom of the scroll area |


[npm-image]: https://img.shields.io/npm/v/react-infinite-scroll-waypoint.svg?style=flat-square
[npm-url]: https://npmjs.org/package/react-infinite-scroll-waypoint
[downloads-image]: http://img.shields.io/npm/dm/react-infinite-scroll-waypoint.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/react-infinite-scroll-waypoint