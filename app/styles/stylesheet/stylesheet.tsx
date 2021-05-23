import { StyleSheet, Dimensions } from 'react-native';
import { Colors, calcDimensions } from 'styles';

const dimensions = calcDimensions();

// This is all mock data from the placeholder app, can be deleted once the placeholder app.tsx is removed
const Styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.appBackground,
    height: '100%',
    width: '100%',
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
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: '10%',
    maxHeight: '80%',
    overflow: 'hidden',
    minWidth: '40%',
    maxWidth: '90%',
  },
  modalHeader: {
    backgroundColor: Colors.calvinRed,
    borderBottomColor: Colors.blueLight,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
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
  comicWrapper: {
    backgroundColor: Colors.tileBackground,
    borderRadius: 8,
    marginTop: 5,
    marginBottom: 5,
    padding: 5,
    shadowColor: Colors.borderShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 3,
  },
});

export default Styles;
