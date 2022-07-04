import React, { useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Context from '../context/Context';
import sendUserData from '../services/sendUserData';
import LabelAndInput from '../components/LabelAndInput';
import { URL_POST_USER_LOGIN } from '../constants';

function UserLogin() {
  const {
    stateLogin,
    setStateLogin,
    stateLoginResponse,
    setStateLoginResponse,
    setStateUserToken,
  } = useContext(Context);
  const history = useHistory();
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
          const userData = await sendUserData(stateLogin, URL_POST_USER_LOGIN);
          setStateLoginResponse(userData);
          if (userData.token) {
            setStateUserToken(userData.token);
            localStorage.setItem('userToken', userData.token);
            history.push('/to-do-list');
          }
        }}
      >
        Login
      </button>
      <br />
      <br />
      <div>
        <Link to="/to-do-list/sign-up">Criar Conta</Link>
      </div>
    </section>
  );
}

export default UserLogin;
