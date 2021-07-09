import React, { useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, TouchableWithoutFeedback } from 'react-native';
import InputText from './InputText';

const DatePicker = ({handleGetDate, labelError, label, value}) => {
    const [date, setDate] = useState((value) ? new Date(value) : new Date());
    const [show, setShow] = useState(false);
    const [dateString, setdateString] = useState((value) ? value : '');

    const handleOnChange = (event, selectedDate) => {
        try {
            setShow(false);

            let day = selectedDate.getDate();
            let month = selectedDate.getMonth() + 1;
            let year = selectedDate.getFullYear();

            if (month < 10 && day < 10) {
                setdateString(`${year}-0${month}-0${day}`);
                handleGetDate(`${year}-0${month}-0${day}`);
            } else if (month < 10 ) {
                setdateString(`${year}-0${month}-${day}`);
                handleGetDate(`${year}-0${month}-${day}`);
            } else if (day < 10) {
                setdateString(`${year}-${month}-0${day}`);
                handleGetDate(`${year}-${month}-0${day}`);
            } else {
                setdateString(`${year}-${month}-${day}`);
                handleGetDate(`${year}-${month}-${day}`);
            }
            const currentDate = selectedDate || date;
            setDate(currentDate);
        } catch (e) {
        }   
    };

    return (
        <TouchableWithoutFeedback onPress={() => setShow(true)}>
            <View>
                <InputText
                    label={label}
                    labelError={labelError}
                    placeholder={'AAAA-DD-MM'}
                    nameIcon={"calendar-range"} 
                    editable={false} 
                    selectTextOnFocus={false}
                    value={dateString}
                />
                { show && (
                    <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="date"
                    is24Hour={true}
                    maximumDate={new Date()}
                    display="default"
                    onChange={handleOnChange} />
                )}
            </View>
        </TouchableWithoutFeedback>
    )
}

export default DatePicker;