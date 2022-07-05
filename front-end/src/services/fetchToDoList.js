const fetchToDoList = async (url, userToken) => {
  const options = {
    method: 'GET',
    headers: {
      'Cache-Control': 'no-cache',
      authorization: userToken,
    },
  };
  const response = await fetch(url, options)
    .catch((error) => console.log('ERROR:', error));
  const data = await response.json();
  return data;
};

export default fetchToDoList;
