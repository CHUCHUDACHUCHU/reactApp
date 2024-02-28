import React, { useEffect } from "react";

function CreateUser({ username, email, age, onChange, onCreate }) {
  useEffect(() => {
    console.log("createUser 렌더링");
  });
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
