## react-awesome-countdowntimer
An awesome countdowntimer only developed for react, but coded so nicely can be understood and used for other libraries too. Basically a tick() function that runs when component mounts with an interval of 1000ms ``` setInterval(this.tick, 1000) ```.

## Table of Contents

- [Installation](#installation)
- [Dependencies](#dependencies)
- [Properties](#properties)
- [Example](#example)
- [Example App](#example-app)


### Installation
```bash
npm install --save react-awesome-countdowntimer
```
##### Dependencies
* [moment.js](https://momentjs.com) - This component depends on momen.js library so you should have this installed in you project!

##### Properties
|    Property    | Type |          Description          | Working           | Example |
| -------------  | ---- |          -----------          | -------          | ------- |
| endDate  | object | Takes date & time when timer has to end | Yes | endDate(moment('06/18/2018 15:00:00'))

### Example
```js
import React from 'react';
import moment from 'moment';
import CountdownTimer from 'react-awesome-countdowntimer';

class SimpleComponent extends React.Component {
    return (
        <CountdownTimer endDate={moment('06/12/2018 12:00:00', 'DD/MM/YYYY hh:mm:ss')}/>
    );
  }
}

```

### Example App
```bash
cd example-app/
```

then
```bash
yarn
```
```bash
yarn start
```
