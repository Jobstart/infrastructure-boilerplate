import React from 'react';
import withStyles from 'isomorph-style-loader/lib/withStyles';
import { graphql } from 'react-apollo';
import PureComponent from 'components/common/pure';
import { propTypes, defaultProps } from 'lib/decorators/generic';
import gql from 'graphql-tag';

import UserRow from 'components/userRow';

import style from 'components/usersTable/index.css';

@graphql(gql`
  query Users ($query: UsersQuery!){
    getUsersByID (query: $query) {
      ...UserRow
    }
  }
`, {
  options: ({ location: { query: { userIds = '580b14d41e276e5c43570430' } } } ) => ({
    fragments: UserRow.fragments.entry.fragments(),
    variables: {
      query: {
        _ids: userIds.replace(/\s/g, '').split(',')
      }
    },
    forceFetch: true
  }),
  props: (props) => {
    console.log(props.data);
    const { loading, users = []} = props.data;
    return { loading, users };
  }
})
@propTypes((PropTypes) => ({
  loading: React.PropTypes.bool.isRequired,
  users: PropTypes.arrayOf(UserRow.fragments.entry.propType)
}))
@withStyles(style)
export default class UsersTable extends PureComponent {
  constructor (props, context) {
    super(props, context);
  }
  render () {
    console.log(this.props.users);
    const { users, loading } = this.props;
    return (
      <div className={style.usersTableContainer}>
        {loading ? 'Loading' : users.map((user, i) => <UserRow key={i} user={user}/>)}

      </div>
    );
  }
}
