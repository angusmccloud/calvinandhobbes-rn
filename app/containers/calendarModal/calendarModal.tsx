import React, { useState, useEffect } from 'react';
import { View, TouchableWithoutFeedback, Modal } from 'react-native';
import { Calendar } from 'react-native-calendario';
// import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
// import CalendarPicker from 'react-native-calendar-picker';
import { Colors, Styles, Typography, calcDimensions } from 'styles';
import { Icon, Text, Button } from 'components';
import { displayDate } from 'utils';

interface CalendarModalProps {
  showModal: boolean;
  setShowModal: (status: boolean) => void;
  minDate: Date;
  maxDate: Date;
  currentDate: Date;
  setSelectedDate: (dt: Date) => void;
}

const CalendarModal = ({
  showModal,
  setShowModal,
  minDate,
  maxDate,
  currentDate,
  setSelectedDate,
}: CalendarModalProps): React.ReactElement => {
  const [selectedDt, setSelectedDt] = useState(currentDate);
  const [dimensions, setDimensions] = useState(calcDimensions());

  useEffect(() => {
    setSelectedDt(currentDate);
  }, [showModal]);

  const closeModal = () => {
    console.log('-- Close Modal --');
    setShowModal(false);
  };

  const submitDate = () => {
    setSelectedDate(selectedDt);
    closeModal();
  }

  const onDateChange = (dt) => {
    console.log("-- Date Change!! --", dt);
    setSelectedDt(new Date(dt.startDate));
  }

  const startMonth = `${minDate.getFullYear()}-${minDate.getMonth() + 1 < 10 ? '0' : ''}${minDate.getMonth() + 1}-${minDate.getDate() < 10 ? '0' : ''}${minDate.getDate()}`
  const numberOfMonths = ((maxDate.getFullYear() - minDate.getFullYear()) * 12) + (- minDate.getMonth() + 1) + (maxDate.getMonth());

  return (
    <>
      <Modal
        animationType="slide"
        transparent
        visible={showModal}
        presentationStyle="overFullScreen"
        supportedOrientations={['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right']}
        onRequestClose={() => {
          setShowModal(false);
        }}>
        <TouchableWithoutFeedback onPress={() => closeModal()}>
          <View style={Styles.modalBackground} />
        </TouchableWithoutFeedback>
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
                size="L"
                fontFamily="Calvin and Hobbes">
                Jump to Date
              </Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Button
                buttonStyle={'hollow'}
                text="Go"
                onPress={() => submitDate()}
                size="Small"
              />
            </View>
          </View>
          <View>
            <View style={{height: 500, maxHeight: dimensions.height * .8}}>
              <Calendar
                onChange={(range) => onDateChange(range)}
                minDate={minDate}
                maxDate={maxDate}
                startDate={selectedDt}
                disableRange={true}
                startingMonth={startMonth}
                numberOfMonths={numberOfMonths}
                theme={{
                  monthTitleTextStyle: {
                    color: Colors.calvinRed,
                    fontWeight: Typography.fontWeightBold,
                    fontSize: Typography.fontSizeM,
                    fontFamily: Typography.fontFamilyBold,
                  },
                  weekColumnStyle: {
                    paddingVertical: 10,
                  },
                  weekColumnTextStyle: {
                    color: Colors.textDefault,
                    fontSize: Typography.fontSizeS,
                    fontFamily: Typography.fontFamilyRegular,
                  },
                  dayTextStyle: {
                    color: Colors.textDefault,
                    fontWeight: Typography.fontWeightRegular,
                    fontSize: Typography.fontSizeS,
                    fontFamily: Typography.fontFamilyRegular
                  },
                  activeDayContainerStyle: {
                    backgroundColor: Colors.calvinRed,
                  },
                  activeDayTextStyle: {
                    color: Colors.white,
                    fontWeight: Typography.fontWeightBold
                  },
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default CalendarModal;
