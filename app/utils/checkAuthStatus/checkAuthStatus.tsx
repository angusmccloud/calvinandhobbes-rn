import * as Keychain from 'react-native-keychain';
import { Auth } from 'aws-amplify';
import { iAuthStatus } from 'models';

const checkAuthStatus = async (): Promise<iAuthStatus> => {
    const unauthedReturn: iAuthStatus = {
        isAuthed: false,
        authPending: false,
    };
  try {
    const credentials = await Keychain.getInternetCredentials('auth');
    // console.log('---- credentials ----', credentials);

    if (credentials) {
      const { username, password } = credentials;
      const user = await Auth.signIn(username, password);
      console.log('-- User already logged in, forward them!');
      const authedUserObject: iAuthStatus = {
        isAuthed: true,
        authPending: false,
        authDetails: {
          id: user.attributes.sub,
          signInTokens: {
            accessToken: user.signInUserSession.accessToken.jwtToken,
            refreshToken: user.signInUserSession.refreshToken.token,
            idToken: user.signInUserSession.idToken.jwtToken,
            accessTokenExp: user.signInUserSession.accessToken.payload.exp,
          },
        },
      };
      // console.log('--- userObject ---', authedUserObject);
      return authedUserObject;
    } else {
      console.log('-- No Existing Credentials --');
      return unauthedReturn;
    }
  } catch (err) {
    console.log('error', err); // eslint-disable-line
    if(err.code === 'UserNotConfirmedException') {
      const authPending: iAuthStatus = {
        isAuthed: false,
        authPending: true,
      };
      return authPending;
    } else {
      return unauthedReturn;
    }
  }
};

export default checkAuthStatus;
