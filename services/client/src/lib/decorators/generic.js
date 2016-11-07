import React, { PropTypes, Component } from 'react';
import hoistStatics from 'hoist-non-react-statics';

export function propTypes (propTypesCb) {
  return Component => {
    Component.propTypes = propTypesCb(PropTypes);
    return Component;
  };
}

export function childContextTypes (childContextTypesCb, propName = 'context') {
  return Component => {
    Component.childContextTypes = childContextTypesCb(PropTypes);
    return Component;
  };
}

export function defaultProps (defaultPropsCb) {
  return Component => {
    Component.defaultProps = defaultPropsCb();
    return Component;
  };
}

export function parseProps (parsePropsCb) {
  return WrappedComponent => {
    class ParsePropsDecorator extends Component {
      constructor (props, context) {
        super(props, context);
      }
      render () {
        return (
          <WrappedComponent {...parsePropsCb(this.props)}/>
        );
      }
    }

    const HoistedComponent = hoistStatics(ParsePropsDecorator, WrappedComponent);

    HoistedComponent.WrappedComponent = WrappedComponent;

    return HoistedComponent;
  };
}
