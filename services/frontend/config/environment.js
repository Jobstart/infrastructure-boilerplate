export const HOSTNAME = process.env.HOSTNAME || 'localhost';
export const WEBPACK_PORT = process.env.FRONTEND_WEBPACK_PORT;
export const PORT = process.env.PORT || process.env.FRONTEND_SERVER_PORT;
export const API_FQDN = process.env.API_FQDN;
export const ASSETS_FQDN = process.env.ASSETS_FQDN || `http://localhost:${WEBPACK_PORT}/`;
export const BUILD_STAMP = Date.now();
