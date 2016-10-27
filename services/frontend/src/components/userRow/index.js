import React from 'react';
import withStyles from 'isomorph-style-loader/lib/withStyles';
import PureComponent from 'components/common/pure';
import { propTypes } from 'lib/decorators/generic';
import Fragment from 'graphql-fragments';
import gql from 'graphql-tag';

import style from 'components/userRow/index.css';

const fragments = {
  entry: new Fragment(gql`
    fragment UserRow on User {
      name,
      email,
      time_created
    }
  `)
};
@propTypes((PropTypes) => ({
  user: fragments.entry.propType
}))
@withStyles(style)
export default class UserRow extends PureComponent {
  static fragments = fragments;
  constructor (props, context) {
    super(props, context);
  }
  render () {
    const { name, email } = this.props.user;
    return (
      <div className={style.userRowContainer}>
        {name} - {email}
      </div>
    );
  }
}
