import debug from 'debug';

const log = debug('graphql:log');
const warn = debug('graphql:warn');

function trace () {
  console.trace.apply(console, arguments);
}

export {
  log,
  warn,
  trace
}
