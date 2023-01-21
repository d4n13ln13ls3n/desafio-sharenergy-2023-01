import axios from 'axios';


export default class CatService {
  
  getPictureByCode = async (code: string) => {
    try {
      const result = await axios.get(`https://http.cat/${code}`);
      const catPicture = `https://http.cat/${code}.jpg`;
      console.log('cat object:', catPicture);
      return catPicture;
    } catch (err) {
      return null;
    }
  }

}
