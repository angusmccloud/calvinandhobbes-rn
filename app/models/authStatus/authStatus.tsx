export interface iAuthStatus {
    isAuthed: boolean;
    authPending: boolean;
    authDetails?: {
        id: string;
        signInTokens: {
          accessToken: string;
          refreshToken: string;
          idToken: string;
          accessTokenExp: string;
        }
    }
  };