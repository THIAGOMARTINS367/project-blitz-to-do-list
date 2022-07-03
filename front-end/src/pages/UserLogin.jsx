import React, { useContext } from 'react';
import Context from '../context/Context';
import sendUserData from '../services/sendUserData';
import LabelAndInput from '../components/LabelAndInput';

function UserLogin() {
  const {
    stateLogin,
    setStateLogin,
    stateLoginResponse,
    setStateLoginResponse,
  } = useContext(Context);
  return (
    <section>
      <h1>LOGIN</h1>
      <form>
        <LabelAndInput
          labelContent="Email"
          inputId="input3"
          inputType="email"
          onChangeEvent={({
            target,
          }) => setStateLogin({ ...stateLogin, email: target.value })}
        />

        <br />
        <br />

        <LabelAndInput
          labelContent="Senha"
          inputId="input4"
          inputType="password"
          onChangeEvent={({
            target,
          }) => setStateLogin({ ...stateLogin, password: target.value })}
        />
      </form>
      {
        Object.keys(stateLoginResponse).includes('message')
          ? <div>{stateLoginResponse.message}</div> : false
      }

      <br />

      <button
        type="button"
        onClick={async () => {
          setStateLoginResponse(await sendUserData(stateLogin, 'http://localhost:3001/login'));
        }}
      >
        Login
      </button>
    </section>
  );
}

export default UserLogin;
