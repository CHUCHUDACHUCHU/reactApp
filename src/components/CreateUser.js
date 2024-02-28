import React, { useEffect, useContext, useRef } from 'react';
import { UserDispatch } from '../App';
import useInputs from '../hooks/useInputs';

function CreateUser() {
  useEffect(() => {
    console.log('createUser 렌더링');
  });

  const [{ username, email, age }, onChange, reset] = useInputs({
    username: '',
    email: '',
    age: '',
  });

  const nextId = useRef(4);
  const dispatch = useContext(UserDispatch);
  const onCreate = () => {
    dispatch({
      type: 'CREATE_USER',
      user: {
        id: nextId.current,
        username,
        email,
        age,
      },
    });
    reset();
    nextId.current += 1;
  };

  return (
    <>
      <input
        name="username"
        placeholder="계정명"
        onChange={onChange}
        value={username}
      />
      <input
        name="email"
        placeholder="이메일"
        onChange={onChange}
        value={email}
      />
      <input name="age" placeholder="나이" onChange={onChange} value={age} />
      <button onClick={onCreate}>등록</button>
    </>
  );
}

export default React.memo(CreateUser);
