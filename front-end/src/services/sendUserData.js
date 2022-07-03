const sendUserData = async (state) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
    },
    body: JSON.stringify(state),
  };
  fetch('http://localhost:3001/sign-up', options)
    .then((data) => data.json())
    .then((data) => console.log(data))
    .catch((error) => console.log('ERROR:', error));
};

export default sendUserData;
