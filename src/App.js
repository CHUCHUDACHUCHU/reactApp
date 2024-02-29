import React, { useEffect, useMemo, useReducer, useState } from 'react';
import Counter from './components/Counter';
import UserList from './components/UserList';
import CreateUser from './components/CreateUser';
import produce from 'immer';
import styled, { ThemeProvider } from 'styled-components';
import Button from './components/Button';
import Dialog from './components/Dialog';

const AppBlock = styled.div`
  width: 512px;
  margin: 0 auto;
  margin-top: 4rem;
  border: 1px solid black;
  padding: 1rem;
`;

const ButtonGroup = styled.div`
  & + & {
    margin-top: 1rem;
  }
`;

const initialState = {
  inputs: {
    username: '',
    email: '',
    age: '',
  },
  users: [
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
      age: 20,
      active: true,
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
      age: 21,
      active: false,
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
      age: 30,
      active: false,
    },
  ],
};

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...');
  return users.filter((user) => user.active).length;
}

function reducer(state, action) {
  const { user, id, type } = action;
  console.log('리듀서 호출!', action);
  switch (type) {
    case 'CREATE_USER':
      return produce(state, (draft) => {
        draft.users.push(user);
      });
    case 'TOGGLE_USER':
      return produce(state, (draft) => {
        const user = draft.users.find((user) => user.id === id);
        user.active = !user.active;
      });
    case 'REMOVE_USER':
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
  useEffect(() => {
    console.log('App 렌더링!');
  });
  const [state, dispatch] = useReducer(reducer, initialState);
  const { users } = state;
  const activeCount = useMemo(() => countActiveUsers(users), [users]);
  const [dialog, setDialog] = useState(false);

  const onClick = () => {
    setDialog(true);
  };

  const onConfirm = () => {
    console.log('확인');
    setDialog(false);
  };
  const onCancel = () => {
    console.log('취소');
    setDialog(false);
  };

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

      <ThemeProvider
        theme={{
          palette: {
            blue: '#228be6',
            gray: '#495057',
            pink: '#f06595',
          },
        }}
      >
        <AppBlock>
          <ButtonGroup>
            <Button size="large">BUTTON</Button>
            <Button>BUTTON</Button>
            <Button size="small">BUTTON</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button color="gray" size="large">
              BUTTON
            </Button>
            <Button color="gray">BUTTON</Button>
            <Button color="gray" size="small">
              BUTTON
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button color="pink" size="large">
              BUTTON
            </Button>
            <Button color="pink">BUTTON</Button>
            <Button color="pink" size="small">
              BUTTON
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button size="large" outline>
              BUTTON
            </Button>
            <Button color="gray" outline>
              BUTTON
            </Button>
            <Button color="pink" size="small" outline>
              BUTTON
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button size="large" fullWidth>
              BUTTON
            </Button>
            <Button size="large" color="gray" fullWidth>
              BUTTON
            </Button>
            <Button size="large" color="pink" fullWidth onClick={onClick}>
              삭제
            </Button>
          </ButtonGroup>
        </AppBlock>
        <Dialog
          title="정말로 삭제하시겠습니까?"
          confirmText="삭제"
          cancelText="취소"
          onCancel={onCancel}
          onConfirm={onConfirm}
          visible={dialog}
        >
          데이터를 정말로 삭제하시겠습니까?
        </Dialog>
      </ThemeProvider>
    </>
  );
}

export default App;
