export default {
  siteName: 'SEAFAIR',
  siteIcon: 'ion-flash',
  footerText: `ISOMORPHIC @ ${new Date().getFullYear()} Created by RedQ, Inc`,
  enableAnimatedRoute: false,
  apiUrl: 'http://localhost:8080/api',
  // apiUrl: 'http://165.22.46.4/api',
  // apiUrl: 'http://104.131.48.136/api',
  weatherApiUrl:
    'https://api.stormglass.io/v2/weather/point?lat=25.772320&lng=-80.185490&params=airTemperature,pressure,cloudCover,currentDirection,currentSpeed,gust,humidity,precipitation,seaLevel,swellDirection,swellHeight,swellPeriod,visibility,waterTemperature,waveDirection,waveHeight,wavePeriod,windDirection,windSpeed',
  // weatherApiKey:'6a959b82-7bc9-11eb-b2a7-0242ac130002-6a959c18-7bc9-11eb-b2a7-0242ac130002', // me
  weatherApiKey:
    'cc07cc62-6fc3-11eb-958b-0242ac130002-cc07cce4-6fc3-11eb-958b-0242ac130002',
  google: {
    analyticsKey: 'UA-xxxxxxxxx-1',
  },
  dashboard: '/dashboard',
};
