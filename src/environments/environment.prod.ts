export const environment = {
	production: true,
	isMockEnabled: true, // You have to switch this, when your real back-end is done
	authTokenKey: 'authce9d77b308c149d5992a80073637e4d5',
  // API_GATEWAY_ENDPOINT: 'https://toiec-online-be.herokuapp.com/api/',
  API_GATEWAY_ENDPOINT: 'http://18.142.48.108:8686/api/',
  timer: 120, // seconds
  ROLE: {
    // admin
    ADMIN: 'ROLE_ADMIN', // qua ly
    GV: 'ROLE_GV', // giao vien
    SV: 'ROLE_SV', // giao vien bo mon
  }
};
