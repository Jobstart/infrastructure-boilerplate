import rucksack from 'rucksack-css';
import variables from 'postcss-simple-vars';
import nested from 'postcss-nested';
import forLoops from 'postcss-for';
import calc from 'postcss-calc';
import mixins from 'postcss-mixins';
import assets from 'postcss-assets';
import clearfix from 'postcss-clearfix';
import colors from 'postcss-color-function';
import fontMagician from 'postcss-font-magician';
import cssVars from './cssVars';

const mixinsDir = `${process.cwd()}/src/styles/mixins`;
const basePath = `${process.cwd()}/src/`;
const loadPaths = ['assets/', 'assets/fonts', 'assets/images'];

const config = [
  forLoops(),
  variables({
    unknown: (node, name, result) => node.warn(result, 'Unknown variable ' + name),
    variables: () => cssVars,
  }),
  colors(),
  clearfix(),
  calc(),
  nested(),
  mixins({
    mixinsDir
  }),
  assets({
    basePath,
    loadPaths
  }),
  fontMagician(),
  rucksack({
    autoprefixer: true
  })
]

export default config;
