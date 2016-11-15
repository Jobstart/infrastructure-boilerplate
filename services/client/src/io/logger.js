import debug from 'debug';

const log = debug('client:log');
const warn = debug('client:warn');

function trace () {
  console.trace.apply(console, arguments);
}

export {
  log,
  warn,
  trace
}
