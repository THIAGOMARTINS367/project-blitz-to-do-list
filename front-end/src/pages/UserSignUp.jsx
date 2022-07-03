import React, { useContext } from 'react';
import Context from '../context/Context';
import sendUserData from '../services/sendUserData';

function UserSignUp() {
  const {
    state,
    setState,
    stateSignUpResponse,
    setStateSignUpResponse,
  } = useContext(Context);
  return (
    <section>
      <h1>Sign-Up</h1>
      <form>
        <label htmlFor="input1">
          NOME
          <br />
          <input
            type="text"
            id="input1"
            onChange={({ target }) => setState({ ...state, firstName: target.value })}
          />
        </label>

        <br />
        <br />

        <label htmlFor="input2">
          SOBRENOME
          <br />
          <input
            type="text"
            id="input2"
            onChange={({ target }) => setState({ ...state, lastName: target.value })}
          />
        </label>

        <br />
        <br />

        <label htmlFor="input3">
          EMAIL
          <br />
          <input
            type="text"
            id="input3"
            onChange={({ target }) => setState({ ...state, email: target.value })}
          />
        </label>

        <br />
        <br />

        <label htmlFor="input4">
          SENHA
          <br />
          <input
            type="password"
            id="input4"
            onChange={({ target }) => setState({ ...state, password: target.value })}
          />
        </label>

        <br />
        <br />

        <label htmlFor="select-admin">
          VOCÊ É UM ADMINISTRADOR?
          <br />
          <select
            id="select-admin"
            onChange={({ target }) => setState({ ...state, admin: target.value })}
          >
            <option value="false">NÃO</option>
            <option value="true">SIM</option>
          </select>
        </label>

        <br />
        <br />

      </form>
      {
        Object.keys(stateSignUpResponse).includes('message')
          ? <div>{stateSignUpResponse.message}</div> : false
      }
      <button
        type="button"
        onClick={async () => {
          setStateSignUpResponse(await sendUserData(state));
        }}
      >
        CADASTRAR
      </button>
    </section>
  );
}

export default UserSignUp;
