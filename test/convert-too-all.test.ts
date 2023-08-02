import { Coordinate, convertCoordinate } from './../src/index';
let testCoordinate: Coordinate = [110.030774, 36.815854];

// WGS84
const result = convertCoordinate(testCoordinate, 'WGS84');
console.log('WGS84:', result);

// GCJ02
const GCJ02Result = convertCoordinate(result.GCJ02, 'GCJ02');
console.log('GCJ02:', GCJ02Result);

// AMAP
const AMAPResult = convertCoordinate(result.AMAP, 'AMAP');
console.log('AMAP:', AMAPResult);

// QQ
const QQResult = convertCoordinate(result.QQ, 'QQ');
console.log('QQ:', QQResult);

// BD09
const BD09Result = convertCoordinate(result.BD09, 'BD09');
console.log('BD09:', BD09Result);

// BAIDU
const BAIDUResult = convertCoordinate(result.BAIDU, 'BAIDU');
console.log('BAIDU:', BAIDUResult);

// CGCS2000
const CGCS2000Result = convertCoordinate(result.CGCS2000, 'CGCS2000');
console.log('CGCS2000:', CGCS2000Result);

