# Mars Coord

[![English README](https://img.shields.io/badge/README-English-green)](./README_EN.md) [![npm version](https://img.shields.io/npm/v/mars-coord.svg?style=flat)](https://www.npmjs.com/package/mars-coord) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


这是一个用于转换火星坐标系的工具库。它使用 TypeScript 编写。

支持的坐标系统有 'WGS84'，'GCJ02'，'BD09'，以及 'CGCS2000'。

同时提供了AMAP（高德地图），QQ（腾讯地图），和BAIDU（百度地图）这几个别名，分别对应 'GCJ02'，'GCJ02'，和 'BD09'。


| 类型键    | 坐标标准  | 适用地图服务  |
|----------|-----------|--------------|
| WGS84    | WGS84     | 国际标准坐标系 |
| GCJ02    | GCJ-02    | 高德、腾讯地图 |
| AMAP     | GCJ-02    | 高德地图      |
| QQ       | GCJ-02    | 腾讯地图      |
| BD09     | BD-09     | 百度地图      |
| BAIDU    | BD-09     | 百度地图      |
| CGCS2000 | CGCS2000  | 中国大地      |


## 安装

```bash
npm install mars-coord
```

## 使用方法

```typescript
import { Coordinate, convertCoordinate } from 'mars-coord';

// 创建一个坐标
const myCoordinate: Coordinate = [110.030774, 36.815854]; // 例如，这是一个 'WGS84' 坐标

// 将坐标转换为其他坐标系
const result = convertCoordinate(myCoordinate, 'WGS84');

console.log('WGS84:', result.WGS84);
console.log('GCJ02:', result.GCJ02);
console.log('AMAP:', result.AMAP); // 高德地图使用的坐标系
console.log('QQ:', result.QQ); // 腾讯地图使用的坐标系
console.log('BD09:', result.BD09);
console.log('BAIDU:', result.BAIDU); // 百度地图使用的坐标系
console.log('CGCS2000:', result.CGCS2000);
```

## 在前端中使用

```typescript
import { convertCoordinate } from 'mars-coord';

// 定义一个函数，获取当前位置，并返回一个Promise
function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    } else {
      reject(new Error('此浏览器不支持地理位置。'));
    }
  });
}

// 定义一个异步函数，获取并转换坐标
async function getConvertedCoordinates() {
  try {
    // 等待获取当前位置
    const position = await getCurrentLocation();
    const myCoordinate = [position.coords.longitude, position.coords.latitude];

    // 使用mars-coord将坐标转换为其他坐标系
    const result = convertCoordinate(myCoordinate, 'WGS84');

    console.log('WGS84:', result.WGS84); // 输出WGS84坐标
    console.log('GCJ02:', result.GCJ02); // 输出GCJ02坐标
    console.log('AMAP:', result.AMAP); // 输出高德地图使用的坐标
    console.log('QQ:', result.QQ); // 输出QQ地图使用的坐标
    console.log('BD09:', result.BD09); // 输出BD09坐标
    console.log('BAIDU:', result.BAIDU); // 输出百度地图使用的坐标
    console.log('CGCS2000:', result.CGCS2000); // 输出CGCS2000坐标
  } catch (error) {
    // 处理任何错误
    console.error('发生错误：', error);
  }
}

// 调用函数执行代码
getConvertedCoordinates();

```

## 坐标拾取器

- [高德地图坐标拾取器](https://lbs.amap.com/tools/picker)
- [百度地图坐标拾取器](https://api.map.baidu.com/lbsapi/getpoint/index.html)
- [腾讯地图坐标拾取器](https://lbs.qq.com/getPoint/)
- [地图坐标系转换工具](https://tool.lu/coordinate/)

## License

This project is licensed under the terms of the [MIT license](./LICENSE).
