import React from 'react';
import { childContextTypes, propTypes } from 'lib/decorators/generic';

import PureComponent from 'components/common/pure';

export default (context) => {
  @childContextTypes(({ func, any }) => ({
    insertCss: func.isRequired,
    _styles: any,
    getCssString: func
  }))
  @propTypes(({func, shape, element}) => ({
    children: element.isRequired
  }))
  class App extends PureComponent {
    constructor (props, context) {
      super(props, context);
    }
    getChildContext () {
      return context;
    }
    render () {
      return React.Children.only(this.props.children);
    }
  };

  return App;
};
