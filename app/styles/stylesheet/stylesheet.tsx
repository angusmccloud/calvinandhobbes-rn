import {StyleSheet, Dimensions} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {Colors} from 'styles';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height - getStatusBarHeight(true);

// This is all mock data from the placeholder app, can be deleted once the placeholder app.tsx is removed
const Styles = StyleSheet.create({
  bedSummaryWrapper: {
    backgroundColor: Colors.appBackground,
    flexDirection: 'row',
    height: 68,
    justifyContent: 'flex-start',
    overflow: 'hidden',
    padding: 10,
  },
  body: {
    backgroundColor: Colors.appBackground,
    height: '100%',
    width: deviceWidth,
  },
  calculatorRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingBottom: 10,
  },
  centerAll: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBackground: {
    backgroundColor: 'rgba(52, 52, 52, 0.6)',
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  modalBody: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    justifyContent: 'center',
    marginBottom: '10%',
    marginLeft: '20%',
    marginRight: '20%',
    marginTop: '10%',
    maxHeight: '80%',
    overflow: 'hidden',
    width: '60%',
  },
  modalHeader: {
    backgroundColor: Colors.blueBackground,
    borderBottomColor: Colors.blueLight,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  sectionSeparatorLine: {
    backgroundColor: Colors.sectionLine,
    flex: 1,
    height: 1,
    marginBottom: 36,
    marginTop: 36,
  },
  sectionSeparatorLineSmallMargin: {
    backgroundColor: Colors.sectionLine,
    flex: 1,
    height: 1,
    marginBottom: 16,
    marginTop: 16,
  },
  sectionWrapper: {
    backgroundColor: Colors.tileBackground,
    borderRadius: 8,
    marginTop: 0,
    margin: 10,
    padding: 10,
    shadowColor: Colors.borderShadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 3,
  },
  textOnlyWrapper: {
    paddingLeft: deviceWidth * 0.1,
    paddingRight: deviceWidth * 0.4,
    paddingTop: deviceHeight * 0.15,
  },
});

export default Styles;
