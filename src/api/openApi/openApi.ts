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

export { getExhibitions };
