/** 
 * Represents a geographic coordinate as a tuple of longitude and latitude. 
 * 用经度和纬度的元组表示地理坐标。
 */
export type Coordinate = [longitude: number, latitude: number];

/** 
 * The semi-major axis of the Earth, in meters. 
 * 地球的半长轴，以米为单位。
 */
const a: number = 6378245.0;

/** 
 * The square of the eccentricity of the Earth's ellipsoid. 
 * 地球椭球体离心率的平方。
 */
const ee: number = 0.00669342162296594323;

/** 
 * The mathematical constant pi. 
 * 数学常数 π。
 */
const pi: number = 3.1415926535897932384626;


/**
 * Transform latitude from WGS-84 to GCJ-02
 * 将纬度从WGS-84转换为GCJ-02
 * @param x longitude
 * @param y latitude
 */
function transformLat(x: number, y: number): number {
  let ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
  ret += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0;
  ret += (20.0 * Math.sin(y * pi) + 40.0 * Math.sin(y / 3.0 * pi)) * 2.0 / 3.0;
  ret += (160.0 * Math.sin(y / 12.0 * pi) + 320.0 * Math.sin(y * pi / 30.0)) * 2.0 / 3.0;
  return ret;
}

/**
 * Transform longitude from WGS-84 to GCJ-02
 * 将经度从WGS-84转换为GCJ-02
 * @param x longitude
 * @param y latitude
 */
function transformLon(x: number, y: number): number {
  let ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
  ret += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0;
  ret += (20.0 * Math.sin(x * pi) + 40.0 * Math.sin(x / 3.0 * pi)) * 2.0 / 3.0;
  ret += (150.0 * Math.sin(x / 12.0 * pi) + 300.0 * Math.sin(x / 30.0 * pi)) * 2.0 / 3.0;
  return ret;
}

/**
 * Convert from WGS-84 to GCJ-02.
 * 将WGS-84转换为GCJ-02。
 * WGS-84: standard world geodetic system 标准世界地理系统
 * GCJ-02: Chinese national standard used by AMap(高德), Tencent maps(腾讯地图), Google Maps in China etc. 中国国家标准，由高德、腾讯地图、中国谷歌地图等使用。
 */
export function wgs84_to_gcj02(coord: Coordinate): Coordinate {
  let [lng, lat] = coord;
  let dlat = transformLat(lng - 105.0, lat - 35.0);
  let dlon = transformLon(lng - 105.0, lat - 35.0);
  let radlat = lat / 180.0 * pi;
  let magic = Math.sin(radlat);
  magic = 1 - ee * magic * magic;
  let sqrtmagic = Math.sqrt(magic);
  dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * pi);
  dlon = (dlon * 180.0) / (a / sqrtmagic * Math.cos(radlat) * pi);
  let mglat = lat + dlat;
  let mglng = lng + dlon;
  return [mglng, mglat];
}

/**
 * Convert from GCJ-02 to WGS-84
 * 将GCJ-02转换为WGS-84
 * GCJ-02: Chinese national standard used by AMap(高德), Tencent maps(腾讯地图), Google Maps in China etc. 中国国家标准，由高德、腾讯地图、中国谷歌地图等使用。
 * WGS-84: standard world geodetic system 标准世界地理系统
 */
export function gcj02_to_wgs84(coord: Coordinate): Coordinate {
  let [lng, lat] = coord;
  let dlat = transformLat(lng - 105.0, lat - 35.0);
  let dlon = transformLon(lng - 105.0, lat - 35.0);
  let radlat = lat / 180.0 * pi;
  let magic = Math.sin(radlat);
  magic = 1 - ee * magic * magic;
  let sqrtmagic = Math.sqrt(magic);
  dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * pi);
  dlon = (dlon * 180.0) / (a / sqrtmagic * Math.cos(radlat) * pi);
  let mglat = lat - dlat;
  let mglng = lng - dlon;
  return [mglng, mglat];
}

/**
 * Convert from GCJ-02 to BD-09
 * GCJ-02: Chinese national standard used by AMap(高德), Tencent maps(腾讯地图), Google Maps in China etc.
 * BD-09: coordinate system used by Baidu Maps(百度地图)
 */
export function gcj02_to_bd09(coord: Coordinate): Coordinate {
  let [lng, lat] = coord;
  let z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * pi);
  let theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * pi);
  let bd_lng = z * Math.cos(theta) + 0.0065;
  let bd_lat = z * Math.sin(theta) + 0.006;
  return [bd_lng, bd_lat];
}

/**
 * Convert from BD-09 to GCJ-02
 * 将BD-09转换为GCJ-02
 * BD-09: coordinate system used by Baidu Maps(百度地图) 百度地图使用的坐标系
 * GCJ-02: Chinese national standard used by AMap(高德), Tencent maps(腾讯地图), Google Maps in China etc. 中国国家标准，由高德、腾讯地图、中国谷歌地图等使用。
 */
export function bd09_to_gcj02(coord: Coordinate): Coordinate {
  let [lng, lat] = coord;
  let x = lng - 0.0065, y = lat - 0.006;
  let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * pi);
  let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * pi);
  let gg_lng = z * Math.cos(theta);
  let gg_lat = z * Math.sin(theta);
  return [gg_lng, gg_lat];
}

// CGCS2000 and WGS-84 are very similar, with typical errors of less than 1 meter, so they can be considered equivalent here
// CGCS2000和WGS-84非常相似，典型误差小于1米，因此可以在这里被认为是等效的
/** 
 * Convert from CGCS2000 to WGS-84 
 * 将CGCS2000转换为WGS-84
 */
export const cgcs2000_to_wgs84 = (coord: Coordinate): Coordinate => coord;

/** 
 * Convert from WGS-84 to CGCS2000
 * 将WGS-84转换为CGCS2000
 */
export const wgs84_to_cgcs2000 = (coord: Coordinate): Coordinate => coord;

/** 
 * Convert from GCJ-02 to CGCS2000 
 * 将GCJ-02转换为CGCS2000
 */
export const gcj02_to_cgcs2000 = wgs84_to_cgcs2000;

/** 
 * Convert from CGCS2000 to GCJ-02 
 * 将CGCS2000转换为GCJ-02
 */
export const cgcs2000_to_gcj02 = gcj02_to_wgs84;

/** 
 * Convert from BD-09 to CGCS2000 
 * 将BD-09转换为CGCS2000
 */
export const bd09_to_cgcs2000 = (coord: Coordinate): Coordinate => wgs84_to_cgcs2000(gcj02_to_wgs84(bd09_to_gcj02(coord)));

/** Convert from CGCS2000 to BD-09 */
export const cgcs2000_to_bd09 = (coord: Coordinate): Coordinate => gcj02_to_bd09(wgs84_to_gcj02(cgcs2000_to_wgs84(coord)));

/**
 * All supported coordinate types
 * 所有支持的坐标类型
 */
export type CoordinateType = 'WGS84' | 'GCJ02' | 'AMAP' | 'QQ' | 'BD09' | 'BAIDU' | 'CGCS2000';

/**
 * All Coordinates
 * 所有坐标
 */
export interface CoordinatesObject {
  WGS84: Coordinate;
  GCJ02: Coordinate;
  AMAP: Coordinate;
  QQ: Coordinate;
  BD09: Coordinate;
  BAIDU: Coordinate;
  CGCS2000: Coordinate;
}

export type CoordinateObject = {
  longitude: number;
  latitude: number;
  type?: CoordinateType;
}

export const coordinateToObject = (coord: Coordinate, type?: CoordinateType): CoordinateObject => {
  let [longitude, latitude] = coord;
  return {
    longitude,
    latitude,
    type: type,
  };
}


/**
 * Convert coordinates from one type to all
 * 将坐标从一种类型转换为所有类型
 * @param coord Coordinates to convert 需要转换的坐标
 * @param coordType Type of coordinates 坐标类型
 * @returns All coordinates 所有坐标
 */
export function convertCoordinate(coord: Coordinate, coordType: CoordinateType): CoordinatesObject {
  let WGS84: Coordinate;
  let GCJ02: Coordinate;
  let BD09: Coordinate;
  let CGCS2000: Coordinate;

  switch (coordType) {
    case 'WGS84':
      WGS84 = coord;
      GCJ02 = wgs84_to_gcj02(coord);
      BD09 = gcj02_to_bd09(GCJ02);
      CGCS2000 = wgs84_to_cgcs2000(coord);
      break;
    case 'GCJ02':
    case 'AMAP':
    case 'QQ':
      GCJ02 = coord;
      WGS84 = gcj02_to_wgs84(coord);
      BD09 = gcj02_to_bd09(coord);
      CGCS2000 = gcj02_to_cgcs2000(coord);
      break;
    case 'BD09':
    case 'BAIDU':
      BD09 = coord;
      GCJ02 = bd09_to_gcj02(coord);
      WGS84 = gcj02_to_wgs84(GCJ02);
      CGCS2000 = bd09_to_cgcs2000(coord);
      break;
    case 'CGCS2000':
      CGCS2000 = coord;
      WGS84 = cgcs2000_to_wgs84(coord);
      GCJ02 = cgcs2000_to_gcj02(coord);
      BD09 = cgcs2000_to_bd09(coord);
      break;
  }

  return {
    WGS84,
    GCJ02,
    AMAP: GCJ02,
    QQ: GCJ02,
    BD09,
    BAIDU: BD09,
    CGCS2000,
  };
}
