export const HOSTNAME = process.env.HOSTNAME || 'localhost';
export const WEBPACK_PORT = process.env.FRONTEND_WEBPACK_PORT;
export const PORT = process.env.PORT || process.env.FRONTEND_SERVER_PORT;
export const API_FQDN = process.env.API_FQDN;
export const BROWSER_API_FQDN = process.env.BROWSER_API_FQDN || API_FQDN;
export const WS_FQDN = BROWSER_API_FQDN.indexOf('https') !== -1 ? BROWSER_API_FQDN.replace('https', 'wss') : BROWSER_API_FQDN.replace('http', 'ws');
export const ASSETS_FQDN = process.env.ASSETS_FQDN || `http://localhost:${WEBPACK_PORT}/`;
export const BUILD_STAMP = Date.now();
