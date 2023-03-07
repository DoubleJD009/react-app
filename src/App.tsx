import styled from "styled-components";
import React, { useState } from "react";

function App() {
  const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: ${(props) => props.theme.bgColor};
  `;
  const [value, setValue] = useState("");
  const onChage = (event: React.FormEvent<HTMLInputElement>) => {
    //const value = event.currentTarget.value
    const {
      currentTarget: { value },
    } = event;
    setValue(value);
    // console.log(event.currentTarget.value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("hello", value);
  };
  return (
    <Container>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChage}
          type="text"
          placeholder="username"
          value={value}
        />
        <button>Log in</button>
      </form>
    </Container>
  );
}

export default App;
