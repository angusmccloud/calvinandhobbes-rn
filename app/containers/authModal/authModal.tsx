import React, { useState, useRef } from 'react';
import { View, TouchableWithoutFeedback, TextInput, ScrollView } from 'react-native';
import * as Keychain from 'react-native-keychain';
import { Auth } from 'aws-amplify';
import Modal from 'react-native-modal';
import { eIcons, iAuthStatus } from 'models';
import { Colors, Styles, Typography, calcDimensions } from 'styles';
import { Icon, Text, Button, ActivityIndicator } from 'components';
import { checkAuthStatus } from 'utils';

const AuthModal = (): React.ReactElement => {
  const [initialLoad, setInitialLoad] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const emptyAuth: iAuthStatus = { isAuthed: false, authPending: false };
  const [authStatus, setAuthStatus] = useState(emptyAuth);
  const [currentView, setCurrentView] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [authInProgress, setAuthInProgress] = useState(false);
  const [error, setError] = useState('');
  const [confirmationPending, setConfirmationPending] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');

  const dimensions = calcDimensions();

  const openModal = () => {
    console.log('-- Open Modal --');
    setShowModal(true);
    getAuthStatus();
    // Whatever other shit has to happen...
  };

  const closeModal = () => {
    console.log('-- Close Modal --');
    setShowModal(false);
    setAuthInProgress(false);
    setCurrentView('login');
    setError('');
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setConfirmationCode('');
    setInitialLoad(true);
  };

  const processSignIn = async () => {
    console.log(' -- onSignInPress --');
    setAuthInProgress(true);
    if (username.length === 0 || password.length === 0) {
      setError('Email and Password are required');
      setAuthInProgress(false);
    }
    try {
      await Auth.signIn(username, password);
      await Keychain.setInternetCredentials('auth', username, password);
      console.log(' -- It Worked!! --');
      closeModal();
    } catch ({ code }) {
      setAuthInProgress(false);
      console.log(" -- Didn't Work --", code);
      if (code === 'UserNotConfirmedException') {
        setError('Account not verified yet');
      } else if (code === 'PasswordResetRequiredException') {
        setError('Existing user found. Please reset your password');
      } else if (code === 'NotAuthorizedException') {
        // setUserInfo(values)
        setError('Forgot Password?');
      } else if (code === 'UserNotFoundException') {
        setError('User does not exist!');
      } else {
        setError(code);
      }
    }
  };

  const processCreateAccount = async () => {
    setAuthInProgress(true);
    if (
      username.length === 0 ||
      password.length === 0 ||
      confirmPassword.length === 0
    ) {
      setError('Email, Password, and Confirmed Password are required');
      setAuthInProgress(false);
    } else if (password !== confirmPassword) {
      setError('Password and Confirmed Password do not match');
      setAuthInProgress(false);
    } else {
      try {
        const userObj = {
          username,
          password,
          attributes: {
              email: username
          }
        };
        const user = await Auth.signUp(userObj);
        console.log('-- Created User --', user);
        await Keychain.setInternetCredentials('auth', username, password);
        setConfirmationPending(true);
        setAuthInProgress(false);
        console.log('successfully signed up');
      } catch (err) {
        console.log('error signing up...', err);
        setError('There was an error creating your account');
        setAuthInProgress(false);
      }
    }
  };

  const logoutPressHandler = async () => {
    try {
      await Auth.signOut();
      Keychain.resetInternetCredentials('auth');
      console.log('successfully Signed Out');
      closeModal();
    } catch (err) {
      console.log('error signing out...', err);
      setError('There was an error signing out');
    }
  };

  const submitConfirmationCode = async () => {
    const credentials = await Keychain.getInternetCredentials('auth');
    if(credentials) {
        setAuthInProgress(true);
        try {
            console.log('-- Submit Confirmation --', confirmationCode);
            Auth.confirmSignUp(credentials.username, confirmationCode);
            console.log('Code Confirmed');
            closeModal();
            setAuthInProgress(false);
          } catch (err) {
            console.log('error confirming code out...', err);
            setError('There was an error confirming your confirmation code');
            setAuthInProgress(false);
          }
    } else {
        Keychain.resetInternetCredentials('auth');
        setConfirmationPending(false);
        setAuthInProgress(false);
    }
  };

  const resendConfirmationCode = async () => {
    const credentials = await Keychain.getInternetCredentials('auth');
    if(credentials) {
        setAuthInProgress(true);
        try {
            console.log('-- Resend Confirmation --', credentials.username);
            Auth.resendSignUp(credentials.username);
            console.log('Code Sent');
            setAuthInProgress(false);
          } catch (err) {
            console.log('error resending code...', err);
            setError('There was an error sending new confirmation code');
            setAuthInProgress(false);
          }
    } else {
        Keychain.resetInternetCredentials('auth');
        setConfirmationPending(false);
        setAuthInProgress(false);
    }
  };

  const changeViews = (newView: string) => {
    setError('');
    setCurrentView(newView);
    setConfirmPassword('');
  };

  const getAuthStatus = async (): Promise<void> => {
    const auth = await checkAuthStatus();
    setAuthStatus(auth);
    setInitialLoad(false);
    setConfirmationPending(auth.authPending);
    console.log('-- AUTH STATUS --', auth);
  };

  const ref_loginPassword = useRef();
  const ref_createPassword = useRef();
  const ref_createPasswordConfirm = useRef();

  return (
    <>
      <TouchableWithoutFeedback onPress={() => openModal()}>
        <View>
          <Icon
            icon={eIcons.user}
            color="white"
            iconSize={Typography.fontSizeXXL}
            containerStyle={{ paddingRight: 10 }}
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal
        avoidKeyboard={true}
        // coverScreen={true}
        propagateSwipe={true}
        backdropColor={Colors.black}
        deviceHeight={dimensions.height}
        deviceWidth={dimensions.width}
        isVisible={showModal}
        onBackdropPress={() => {
          setShowModal(false);
        }}
        onBackButtonPress={() => {
          setShowModal(false);
        }}
        useNativeDriver={true}
        supportedOrientations={['portrait', 'landscape']}
        >
        <View style={Styles.modalBody}>
          <View style={Styles.modalHeader}>
            <View style={{ flex: 1, alignItems: 'flex-start' }}>
              <Button
                buttonStyle={'hollow'}
                text="Cancel"
                onPress={() => closeModal()}
                size="Small"
              />
            </View>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text
                color={Colors.white}
                bold
                size="XL"
                fontFamily="Calvin and Hobbes">
                Login
              </Text>
            </View>
            <View style={{ flex: 1 }}></View>
          </View>
          <ScrollView>
            {initialLoad && (
              <View
                style={{
                  padding: 20,
                  marginTop: 10,
                  marginBottom: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <ActivityIndicator size={40} />
              </View>
            )}
            {authStatus.isAuthed && !initialLoad && (
              <View
                style={{
                  padding: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Button
                  text="Logout"
                  buttonStyle="primary"
                  onPress={() => logoutPressHandler()}
                  disabled={authInProgress}
                />
              </View>
            )}
            {confirmationPending && !initialLoad && (
              <View style={{ padding: 10, alignItems: 'center' }}>
                <Text>Enter Confirmation Code (Sent to your Email)</Text>
                <TextInput
                  clearButtonMode="always"
                  maxLength={10}
                  returnKeyType="done"
                  placeholder="Confirmation"
                  value={confirmationCode}
                  placeholderTextColor={Colors.grayMedium}
                  enablesReturnKeyAutomatically={true}
                  autoCompleteType="off"
                  textContentType="oneTimeCode"
                  keyboardType="number-pad"
                  style={{
                    fontSize: Typography.fontSizeM,
                    fontWeight: Typography.fontWeightRegular,
                    fontFamily: Typography.fontFamilyRegular,
                    padding: 10,
                    marginTop: 10,
                    marginBottom: 10,
                    borderColor: Colors.borderColor,
                    borderWidth: 1,
                    borderRadius: 5,
                    backgroundColor: Colors.white,
                    minWidth: '50%',
                  }}
                  onChangeText={(text) => setConfirmationCode(text)}
                  onSubmitEditing={() => submitConfirmationCode()}
                />
                {error !== '' && (
                  <Text style={{ marginBottom: 10 }}>{error}</Text>
                )}
                <Button
                  text="Submit"
                  buttonStyle="primary"
                  onPress={() => submitConfirmationCode()}
                  disabled={authInProgress}
                />
                <View style={{ marginTop: 10 }}>
                  <Button
                    text="Resend Code"
                    buttonStyle="hollow"
                    onPress={() => resendConfirmationCode()}
                  />
                </View>
              </View>
            )}
            {!authStatus.isAuthed &&
              !initialLoad &&
              currentView === 'login' &&
              !confirmationPending && (
                <View style={{ padding: 10, alignItems: 'center' }}>
                  <Text bold style={{ marginBottom: 10 }}>
                    Login to track your favorite comics
                  </Text>
                  <TextInput
                    clearButtonMode="always"
                    maxLength={50}
                    returnKeyType="next"
                    placeholder="Email Address"
                    value={username}
                    placeholderTextColor={Colors.grayMedium}
                    enablesReturnKeyAutomatically={true}
                    autoCompleteType="email"
                    textContentType="emailAddress"
                    keyboardType="email-address"
                    style={{
                      fontSize: Typography.fontSizeM,
                      fontWeight: Typography.fontWeightRegular,
                      fontFamily: Typography.fontFamilyRegular,
                      padding: 10,
                      borderColor: Colors.borderColor,
                      borderWidth: 1,
                      borderRadius: 5,
                      backgroundColor: Colors.white,
                      minWidth: '50%',
                    }}
                    onChangeText={(text) => setUsername(text)}
                    onSubmitEditing={() => ref_loginPassword.current.focus()}
                  />
                  <TextInput
                    onChangeText={(text) => setPassword(text)}
                    onSubmitEditing={() => processSignIn()}
                    placeholder="Password"
                    autoCompleteType="password"
                    clearButtonMode="always"
                    enablesReturnKeyAutomatically={true}
                    maxLength={50}
                    placeholderTextColor={Colors.grayMedium}
                    returnKeyType="go"
                    secureTextEntry={true}
                    textContentType="password"
                    value={password}
                    style={{
                      fontSize: Typography.fontSizeM,
                      fontWeight: Typography.fontWeightRegular,
                      fontFamily: Typography.fontFamilyRegular,
                      padding: 10,
                      marginTop: 10,
                      marginBottom: 10,
                      borderColor: Colors.borderColor,
                      borderWidth: 1,
                      borderRadius: 5,
                      backgroundColor: Colors.white,
                      minWidth: '50%',
                    }}
                    ref={ref_loginPassword}
                  />
                  {error !== '' && (
                    <Text style={{ marginTop: 10, marginBottom: 10 }}>
                      {error}
                    </Text>
                  )}
                  <Button
                    text="Login"
                    buttonStyle="primary"
                    onPress={() => processSignIn()}
                    disabled={authInProgress}
                  />
                  <View style={{ marginTop: 10 }}>
                    <Button
                      text="Create New Account"
                      buttonStyle="hollow"
                      onPress={() => changeViews('create')}
                    />
                  </View>
                </View>
              )}
            {!authStatus.isAuthed &&
              !initialLoad &&
              currentView === 'create' &&
              !confirmationPending && (
                <View style={{ padding: 10, alignItems: 'center' }}>
                  <Text bold style={{ marginBottom: 10 }}>
                    Create a new account to track your favorite comics
                  </Text>
                  <TextInput
                    clearButtonMode="always"
                    maxLength={50}
                    returnKeyType="next"
                    placeholder="Email Address"
                    value={username}
                    placeholderTextColor={Colors.grayMedium}
                    enablesReturnKeyAutomatically={true}
                    autoCompleteType="email"
                    textContentType="emailAddress"
                    keyboardType="email-address"
                    style={{
                      fontSize: Typography.fontSizeM,
                      fontWeight: Typography.fontWeightRegular,
                      fontFamily: Typography.fontFamilyRegular,
                      padding: 10,
                      borderColor: Colors.borderColor,
                      borderWidth: 1,
                      borderRadius: 5,
                      backgroundColor: Colors.white,
                      minWidth: '50%',
                    }}
                    onChangeText={(text) => setUsername(text)}
                    onSubmitEditing={() => ref_createPassword.current.focus()}
                  />
                  <TextInput
                    onChangeText={(text) => setPassword(text)}
                    placeholder="Password"
                    autoCompleteType="password"
                    clearButtonMode="always"
                    enablesReturnKeyAutomatically={true}
                    maxLength={50}
                    placeholderTextColor={Colors.grayMedium}
                    returnKeyType="go"
                    secureTextEntry={true}
                    textContentType="password"
                    value={password}
                    style={{
                      fontSize: Typography.fontSizeM,
                      fontWeight: Typography.fontWeightRegular,
                      fontFamily: Typography.fontFamilyRegular,
                      padding: 10,
                      marginTop: 10,
                      borderColor: Colors.borderColor,
                      borderWidth: 1,
                      borderRadius: 5,
                      backgroundColor: Colors.white,
                      minWidth: '50%',
                    }}
                    ref={ref_createPassword}
                    onSubmitEditing={() => ref_createPasswordConfirm.current.focus()}
                  />
                  <TextInput
                    onChangeText={(text) => setConfirmPassword(text)}
                    onSubmitEditing={() => processCreateAccount()}
                    placeholder="Confirm Password"
                    autoCompleteType="password"
                    clearButtonMode="always"
                    enablesReturnKeyAutomatically={true}
                    maxLength={50}
                    placeholderTextColor={Colors.grayMedium}
                    returnKeyType="go"
                    secureTextEntry={true}
                    textContentType="password"
                    value={confirmPassword}
                    style={{
                      fontSize: Typography.fontSizeM,
                      fontWeight: Typography.fontWeightRegular,
                      fontFamily: Typography.fontFamilyRegular,
                      padding: 10,
                      marginTop: 10,
                      marginBottom: 10,
                      borderColor: Colors.borderColor,
                      borderWidth: 1,
                      borderRadius: 5,
                      backgroundColor: Colors.white,
                      minWidth: '50%',
                    }}
                    ref={ref_createPasswordConfirm}
                  />
                  {error !== '' && (
                    <Text style={{ marginTop: 10, marginBottom: 10 }}>
                      {error}
                    </Text>
                  )}
                  <Button
                    text="Create Account"
                    buttonStyle="primary"
                    onPress={() => processCreateAccount()}
                    disabled={authInProgress}
                  />
                  <View style={{ marginTop: 10 }}>
                    <Button
                      text="Login to Existing Account"
                      buttonStyle="hollow"
                      onPress={() => changeViews('login')}
                    />
                  </View>
                </View>
              )}
          </ScrollView>
        </View>
      </Modal>
    </>
  );
};

export default AuthModal;




