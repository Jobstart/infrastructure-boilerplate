// Source map support is for NodeJS source maps
// isomorphic-fetch is a polyfill for the Apollo Client on NodeJS
const banner = `
  require('source-map-support').install({
    environment: 'node'
  });
  require('isomorphic-fetch');
`;

export default banner;
