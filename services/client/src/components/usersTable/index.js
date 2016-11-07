import React from 'react';
import withStyles from 'isomorph-style-loader/lib/withStyles';
import { withApollo } from 'react-apollo';
import { graphql } from 'react-apollo';
import PureComponent from 'components/common/pure';
import { propTypes, defaultProps } from 'lib/decorators/generic';
import gql from 'graphql-tag';

import UserRow from 'components/userRow';

import style from 'components/usersTable/index.css';

const SUBSCRIPTION_QUERY = gql`
  subscription onUpdateUser($query: UpdateUserSubscriptionQuery!){
    updateUser(query: $query){
      id
      ...UserRow
    }
  }
`;

@graphql(gql`
  query Users ($query: UsersQuery!){
    users: getUsersByID (query: $query) {
      id
      ...UserRow
    }
  }
`, {
  options: ({ location: { query: { userIds = '1' } } }) => ({
    fragments: UserRow.fragments.entry.fragments(),
    variables: {
      query: {
        ids: userIds.replace(/\D/g, '').split(',').map((n) => parseInt(n))
      }
    }
  }),
  props: (props) => {
    const { loading, users = []} = props.data;
    return { loading, users };
  }
})
@withStyles(style)
@withApollo
@propTypes(({ bool, arrayOf, shape, func}) => ({
  loading: bool.isRequired,
  users: arrayOf(UserRow.fragments.entry.propType),
  client: shape({
    subscribe: func.isRequired
  }).isRequired
}))
export default class UsersTable extends PureComponent {
  constructor (props, context) {
    super(props, context);
  }
  componentDidMount () {
    if (__CLIENT__) {
      this.subscription = this.props.client.subscribe({
        query: SUBSCRIPTION_QUERY,
        fragments: UserRow.fragments.entry.fragments(),
        variables: {
          query: {
            id: 123
          }
        }
      }).subscribe({
        next: (data) => console.log(data),
        error: (err) => console.trace(err)
      });
    }
  }
  render () {
    const { users, loading } = this.props;
    return (
      <div className={style.usersTableContainer}>
        {loading ? 'Loading' : users.map((user, i) => <UserRow key={i} user={user}/>)}
      </div>
    );
  }
}
