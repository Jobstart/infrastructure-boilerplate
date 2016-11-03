export const HOSTNAME = process.env.HOSTNAME || 'localhost';
export const WEBPACK_PORT = process.env.FRONTEND_WEBPACK_PORT;
export const PORT = process.env.PORT || process.env.FRONTEND_SERVER_PORT;
export const API_FQDN = process.env.API_FQDN;
export const BROWSER_API_FQDN = process.env.BROWSER_API_FQDN || API_FQDN;
export const WS_FQDN = BROWSER_API_FQDN.indexOf('https') !== -1 ? BROWSER_API_FQDN.replace('https', 'wss') : BROWSER_API_FQDN.replace('http', 'ws');
export const ASSETS_FQDN = process.env.ASSETS_FQDN || `http://localhost:${WEBPACK_PORT}`;

// Build stuff
export const BUILD_STAMP = process.env.BUILD_STAMP || 'test';
export const S3_ACCESS_KEY_ID = process.env.S3_ACCESS_KEY_ID || null;
export const S3_SECRET_ACCESS_KEY = process.env.S3_SECRET_ACCESS_KEY || null;
export const S3_REGION = process.env.S3_REGION || null;
export const S3_BUCKET = process.env.S3_BUCKET || null;
export const CF_DISTRIBUTION_ID = process.env.CF_DISTRIBUTION_ID || null;
