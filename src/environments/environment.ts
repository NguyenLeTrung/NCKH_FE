export const environment = {
  production: false,
  isMockEnabled: true, // You have to switch this, when your real back-end is done
  authTokenKey: 'authce9d77b308c149d5992a80073637e4d5',

  // AUTH_SERVER: 'http://localhost:8080',
  // API_GATEWAY_ENDPOINT: 'http://localhost:8080/api/',
  // API_GATEWAY_ENDPOINT: 'https://toiec-online-be.herokuapp.com/api/',
  API_GATEWAY_ENDPOINT: 'http://18.142.48.108:8686/api/',
  // timer: 120, // seconds,
  ROLE: {
    // admin
    ADMIN: 'ROLE_ADMIN', // qua ly
    GV: 'ROLE_GV', // giao vien
    SV: 'ROLE_SV', // giao vien bo mon
  }
};
