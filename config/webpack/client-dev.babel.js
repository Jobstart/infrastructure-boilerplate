import sourceMapSupport from 'source-map-support';
import webpack from 'webpack';
import base from './client.babel';

sourceMapSupport.install({
  environment: 'node',
  hookRequire: true
});

/*

new webpack.BannerPlugin('require("source-map-support").install({environment: "node", hookRequire: true});',
                           { raw: true, entryOnly: false })

*/
