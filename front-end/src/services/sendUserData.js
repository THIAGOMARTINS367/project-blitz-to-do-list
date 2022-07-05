const sendUserData = async (bodyData, url) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
    },
    body: JSON.stringify(bodyData),
  };
  const response = await fetch(url, options)
    .catch((error) => console.log('ERROR:', error));
  const data = await response.json();
  return data;
};

export default sendUserData;
