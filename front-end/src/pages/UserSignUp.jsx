import React, { useContext } from 'react';
import Context from '../context/Context';
import sendUserData from '../services/sendUserData';
import LabelAndInput from '../components/LabelAndInput';
import LabelAndSelect from '../components/LabelAndSelect';

function UserSignUp() {
  const {
    state,
    setState,
    stateSignUpResponse,
    setStateSignUpResponse,
  } = useContext(Context);
  return (
    <section>
      <h1>SIGN-UP</h1>
      <form>
        <LabelAndInput
          labelContent="Nome"
          inputId="input1"
          inputType="text"
          onChangeEvent={({
            target,
          }) => setState({ ...state, firstName: target.value })}
        />

        <br />
        <br />
        <LabelAndInput
          labelContent="Sobrenome"
          inputId="input2"
          inputType="text"
          onChangeEvent={({
            target,
          }) => setState({ ...state, lastName: target.value })}
        />

        <br />
        <br />

        <LabelAndInput
          labelContent="Email"
          inputId="input3"
          inputType="email"
          onChangeEvent={({
            target,
          }) => setState({ ...state, email: target.value })}
        />

        <br />
        <br />

        <LabelAndInput
          labelContent="Senha"
          inputId="input4"
          inputType="password"
          onChangeEvent={({
            target,
          }) => setState({ ...state, password: target.value })}
        />

        <br />
        <br />

        <LabelAndSelect
          labelContent="Você é um administrador ?"
          selectId="select-admin"
          optionsContent={[
            { optionContent: 'NÃO', optionValue: 'false' },
            { optionContent: 'SIM', optionValue: 'true' },
          ]}
          onChangeEvent={({ target }) => setState({ ...state, admin: target.value === 'true' })}
        />

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
