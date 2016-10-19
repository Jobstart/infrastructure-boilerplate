import sourceMapSupport from 'source-map-support';

sourceMapSupport.install({
  environment: 'node',
  hookRequire: true
});

/*

new webpack.BannerPlugin('require("source-map-support").install({environment: "node", hookRequire: true});',
                           { raw: true, entryOnly: false })

*/
