import axios from 'axios';
import { baseUrl } from 'environment';
// import { checkAuthStatus } from 'utils';
import { iAuthStatus } from 'models';

const DeleteFavorite = async (comicId: string, authStatus: iAuthStatus): Promise<void> => {
  console.log('-- Deleting a Favorite --', comicId);
  // const authStatus = await checkAuthStatus();
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
    console.log('-- Deleting to URL --', url);

    try {
      const response = await axios.delete(url, config);
      console.log('-- Delete Completed --', response.data);
    } catch (error) {
        console.log('-- Error Removing Favorite --', error);
    }
  }
};

export default DeleteFavorite;
