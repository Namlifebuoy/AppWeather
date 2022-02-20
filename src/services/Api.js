const getApi = () => {
  return 1;
};

const getProvince = async () => {
  let res = await fetch('https://vapi.vnappmob.com/api/province/', {
    method: 'GET',
  });
  let resJson = await res.json();
  return resJson.results;
};

const getDistrict = async id => {
  let res = await fetch(
    `https://vapi.vnappmob.com/api/province/district/${id}`,
    {
      method: 'GET',
    },
  );
  let resJson = await res.json();
  return resJson.results;
};
const getWard = async id => {
  let res = await fetch(`https://vapi.vnappmob.com/api/province/ward/${id}`, {
    method: 'GET',
  });
  let resJson = await res.json();
  console.log('resJson', resJson);
  return resJson.results;
};

module.exports = {
  getApi,
  getProvince,
  getDistrict,
  getWard,
};
