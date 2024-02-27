import React, { useRef, useMemo, useCallback, useReducer } from "react";
import Counter from "./components/Counter";
import UserList from "./components/UserList";
import CreateUser from "./components/CreateUser";
import useInputs from "./hooks/useInputs";

const initialState = {
  inputs: {
    username: "",
    email: "",
  },
  users: [
    {
      id: 1,
      username: "velopert",
      email: "public.velopert@gmail.com",
      active: true,
    },
    {
      id: 2,
      username: "tester",
      email: "tester@example.com",
      active: false,
    },
    {
      id: 3,
      username: "liz",
      email: "liz@example.com",
      active: false,
    },
  ],
};

function countActiveUsers(users) {
  console.log("활성 사용자 수를 세는중...");
  return users.filter((user) => user.active).length;
}

function reducer(state, action) {
  const { users } = state;
  const { user, id } = action;
  switch (action.type) {
    case "CREATE_USER":
      return {
        inputs: initialState.inputs,
        users: users.concat(user),
      };
    case "TOGGLE_USER":
      return {
        ...state,
        users: users.map((user) =>
          user.id === id ? { ...user, active: !user.active } : user
        ),
      };
    case "REMOVE_USER":
      return {
        ...state,
        users: users.filter((user) => user.id !== id),
      };
    default:
      return state;
  }
}

function App() {
  const [{ username, email }, onChange, reset] = useInputs({
    username: "",
    email: "",
  });
  const [state, dispatch] = useReducer(reducer, initialState);
  const nextId = useRef(4);
  const { users } = state;
  const activeCount = useMemo(() => countActiveUsers(users), [users]);

  const onCreate = useCallback(() => {
    dispatch({
      type: "CREATE_USER",
      user: {
        id: nextId.current,
        username,
        email,
      },
    });
    reset();
    nextId.current += 1;
  }, [username, email, reset]);

  const onToggle = useCallback((id) => {
    dispatch({
      type: "TOGGLE_USER",
      id,
    });
  }, []);

  const onRemove = useCallback((id) => {
    dispatch({
      type: "REMOVE_USER",
      id,
    });
  }, []);

  return (
    <>
      <Counter />
      <br />
      <br />
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <br />
      <UserList users={users} onToggle={onToggle} onRemove={onRemove} />
      <div>활성사용자 수 : {activeCount}</div>
    </>
  );
}

export default App;
