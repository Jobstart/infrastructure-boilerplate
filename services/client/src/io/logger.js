function log () {
  console.log.apply(console, arguments);
}

function warn () {
  console.warn.apply(console, arguments);
}

function trace () {
  console.trace.apply(console, arguments);
}

export default {
  log,
  warn,
  trace
}
