import React, { useMemo, useReducer } from "react";
import Counter from "./components/Counter";
import UserList from "./components/UserList";
import CreateUser from "./components/CreateUser";
import produce from "immer";

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
  const { user, id } = action;
  console.log("리듀서 호출!", action);
  switch (action.type) {
    case "CREATE_USER":
      return produce(state, (draft) => {
        draft.users.push(user);
      });
    case "TOGGLE_USER":
      return produce(state, (draft) => {
        const user = draft.users.find((user) => user.id === id);
        user.active = !user.active;
      });
    case "REMOVE_USER":
      return produce(state, (draft) => {
        const idx = draft.users.findIndex((user) => user.id === id);
        draft.users.splice(idx, 1);
      });
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
