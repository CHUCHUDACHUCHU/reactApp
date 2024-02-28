import React, { useMemo, useReducer } from "react";
import Counter from "./components/Counter";
import UserList from "./components/UserList";
import CreateUser from "./components/CreateUser";

const initialState = {
  inputs: {
    username: "",
    email: "",
    age: "",
  },
  users: [
    {
      id: 1,
      username: "velopert",
      email: "public.velopert@gmail.com",
      age: 20,
      active: true,
    },
    {
      id: 2,
      username: "tester",
      email: "tester@example.com",
      age: 21,
      active: false,
    },
    {
      id: 3,
      username: "liz",
      email: "liz@example.com",
      age: 30,
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

export const UserDispatch = React.createContext(null);

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { users } = state;
  const activeCount = useMemo(() => countActiveUsers(users), [users]);

  return (
    <>
      <Counter />
      <br />
      <br />
      <UserDispatch.Provider value={dispatch}>
        <CreateUser />
        <br />
        <UserList users={users} />
        <div>활성사용자 수 : {activeCount}</div>
      </UserDispatch.Provider>
    </>
  );
}

export default App;
