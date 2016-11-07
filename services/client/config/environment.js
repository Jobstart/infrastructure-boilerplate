export const HOSTNAME = process.env.HOSTNAME || 'localhost';
export const WEBPACK_PORT = process.env.CLIENT_WEBPACK_PORT;
export const PORT = process.env.PORT || process.env.CLIENT_SERVER_PORT;
export const GRAPHQL_FQDN = process.env.GRAPHQL_FQDN;
export const BROWSER_GRAPHQL_FQDN = process.env.BROWSER_GRAPHQL_FQDN || GRAPHQL_FQDN;
export const WS_FQDN = BROWSER_GRAPHQL_FQDN.indexOf('https') !== -1 ? BROWSER_GRAPHQL_FQDN.replace('https', 'wss') : BROWSER_GRAPHQL_FQDN.replace('http', 'ws');
export const ASSETS_FQDN = process.env.ASSETS_FQDN || `http://localhost:${WEBPACK_PORT}`;

// Build stuff
export const BUILD_STAMP = process.env.BUILD_STAMP || 'test';
export const S3_ACCESS_KEY_ID = process.env.S3_ACCESS_KEY_ID || null;
export const S3_SECRET_ACCESS_KEY = process.env.S3_SECRET_ACCESS_KEY || null;
export const S3_REGION = process.env.S3_REGION || null;
export const S3_BUCKET = process.env.S3_BUCKET || null;
export const CF_DISTRIBUTION_ID = process.env.CF_DISTRIBUTION_ID || null;
