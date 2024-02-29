import React, { useContext, useEffect } from 'react';
import { UserDispatch } from '../App';

const User = React.memo(function User({ user }) {
  useEffect(() => {
    console.log('User 렌더링');
  });

  const dispatch = useContext(UserDispatch);

  return (
    <div>
      <b
        style={{
          cursor: 'pointer',
          color: user.active ? 'green' : 'black',
        }}
        onClick={() => {
          dispatch({
            type: 'TOGGLE_USER',
            id: user.id,
          });
        }}
      >
        {user.username}
      </b>
      &nbsp;
      <span>({user.email})</span>
      <span>({user.age})</span>
      <button
        onClick={() => {
          dispatch({
            type: 'REMOVE_USER',
            id: user.id,
          });
        }}
      >
        삭제
      </button>
    </div>
  );
});

function UserList({ users }) {
  useEffect(() => {
    console.log('UserList 렌더링');
  });
  return (
    <>
      {users.map((user) => (
        <User user={user} key={user.id} />
      ))}
    </>
  );
}

export default React.memo(UserList);

//뭐야 왜 깃헙 잔디밭..!!!
