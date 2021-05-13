import axios from 'axios';
import { baseUrl } from 'environment';
import { checkAuthStatus } from 'utils';

const AddFavorite = async (comicId: string): Promise<void> => {
  console.log('-- Adding a Favorite --', comicId);
  const authStatus = await checkAuthStatus();
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

    const url = `${baseUrl}/favorites/${comicId}`;
    console.log('-- Posting to URL --', url);
    console.log('-- Config --', config);

    try {
      const response = await axios.post(url, undefined, config);
      console.log('-- Add Completed --', response.data);
    } catch (error) {
        console.log('-- Error Adding Favorite --', error);
    }
  }
};

export default AddFavorite;
