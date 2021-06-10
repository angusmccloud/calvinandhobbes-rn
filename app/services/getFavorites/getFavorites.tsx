import axios from 'axios';
import { baseUrl } from 'environment';
// import { checkAuthStatus } from 'utils';
import { iAuthStatus } from 'models';

const GetFavorites = async (authStatus: iAuthStatus): Promise<any[]> => {
  console.log('-- Getting List of Favorites --');
  // const authStatus = await checkAuthStatus();
  let comics: any[] = [];
  if (
    authStatus.isAuthed &&
    !authStatus.authPending &&
    authStatus.authDetails?.signInTokens.accessToken !== undefined
  ) {
    const config = {
      headers: {
        jwtheader: authStatus.authDetails.signInTokens.accessToken,
      },
    };

    const url = `${baseUrl}/favorites`;
    console.log('-- Getting from URL --', url);

    
    try {
      const response = await axios.get(url, config);
      comics = convertToFavoritesArray(response.data);
      console.log('-- Comics --', comics);
      return comics;
    } catch (error) {
      console.log('-- Error Getting Comics --', error);
      return comics;
    }
  }
  // console.log('-- Not Logged In --');
  return comics;
};

export default GetFavorites;

const convertToFavoritesArray = (inputData: any[]): any[]  => {
    const result: any[] = [];
    for(let i = 0; i < inputData.length; i++) {
        if(!result.includes(inputData[i].comicId)){
            result.push(inputData[i].comicId);
        }
    }
    return result;
}