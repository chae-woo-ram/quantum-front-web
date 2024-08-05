import axios from 'axios';

const getExhibitions = async ({ page = 1 }) => {
  const { data } = await axios.get('https://api.harvardartmuseums.org/exhibition', {
    params: {
      apikey: '6a7793b5-1088-42a1-9c0b-5c65f5bc5c82',
      title: 'rabbit',
      classification: 'Paintings',
      venue: 'HAM',
      primaryimageurl: '',
      page: page,
      size: 20,
    },
  });
  return data;
};
const getRijksMuseum = async () => {
  const { data } = await axios.get('https://www.rijksmuseum.nl/api/en/collection', {
    params: {
      key: 'Kb8osXJE',
      culture: 'en',
      p: 0,
      ps: 20,
    },
  });
  return data;
};
const getRijksMuseumItem = async () => {
  const { data } = await axios.get('http://www.rijksmuseum.nl/api/en/collection/SK-A-3580', {
    params: {
      key: 'Kb8osXJE',
      culture: 'en',
    },
  });
  return data;
};

export { getExhibitions, getRijksMuseum, getRijksMuseumItem };
