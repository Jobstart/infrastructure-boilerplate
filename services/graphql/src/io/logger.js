function log () {
  console.log.apply(console, arguments);
}

function trace () {
  console.trace.apply(console, arguments);
}

export default {
  log,
  trace
}
