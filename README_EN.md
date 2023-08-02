# Mars Coord

[![中文 README](https://img.shields.io/badge/README-English-green)](./README.md) [![npm version](https://img.shields.io/npm/v/mars-coord.svg?style=flat)](https://www.npmjs.com/package/mars-coord) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This is a node library for converting China's Mars coordinates, written in TypeScript.

The supported coordinate systems are 'WGS84', 'GCJ02', 'BD09', and 'CGCS2000'.

It also provides aliases for AMAP (Amap Maps), QQ (QQ Maps), and BAIDU (Baidu Maps), which correspond to 'GCJ02', 'GCJ02', and 'BD09' respectively.

## Installation

```bash
npm install mars-coord
```

## Usage

```typescript
import { Coordinate, convertCoordinate } from 'mars-coord';

// Create a coordinate
const myCoordinate: Coordinate = [110.030774, 36.815854]; // For example, this is a 'WGS84' coordinate

// Convert the coordinate to other coordinate systems
const result = convertCoordinate(myCoordinate, 'WGS84');

console.log('WGS84:', result.WGS84);
console.log('GCJ02:', result.GCJ02);
console.log('AMAP:', result.AMAP); // Coordinate system used by Amap Maps
console.log('QQ:', result.QQ); // Coordinate system used by  Tencent Maps
console.log('BD09:', result.BD09);
console.log('BAIDU:', result.BAIDU); // Coordinate system used by Baidu Maps
console.log('CGCS2000:', result.CGCS2000);
```

## Usage with JavaScript Location API

```typescript
import { convertCoordinate } from 'mars-coord';

function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    } else {
      reject(new Error('Geolocation is not supported by this browser.'));
    }
  });
}

async function getConvertedCoordinates() {
  try {
    const position = await getCurrentLocation();
    const myCoordinate = [position.coords.longitude, position.coords.latitude];
    const result = convertCoordinate(myCoordinate, 'WGS84');

    console.log('WGS84:', result.WGS84);
    console.log('GCJ02:', result.GCJ02);
    console.log('AMAP:', result.AMAP); // Coordinate system used by Amap Maps
    console.log('QQ:', result.QQ); // Coordinate system used by QQ Maps
    console.log('BD09:', result.BD09);
    console.log('BAIDU:', result.BAIDU); // Coordinate system used by Baidu Maps
    console.log('CGCS2000:', result.CGCS2000);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// Call the function to execute the code
getConvertedCoordinates();
```

## Coordinate Picker

Mostly in Chinese.

- [Amap Maps Coordinate Picker](https://lbs.amap.com/tools/picker)
- [Baidu Maps Coordinate Picker](https://api.map.baidu.com/lbsapi/getpoint/index.html)
- [Tencent Maps Coordinate Picker](https://lbs.qq.com/getPoint/)
- [Map Coordinate System Conversion Tool](https://tool.lu/coordinate/)

## License

This project is licensed under the terms of the [MIT license](./LICENSE).