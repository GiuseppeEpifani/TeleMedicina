import React, { useEffect, useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, TouchableWithoutFeedback } from 'react-native';
import InputText from './InputText';

const DatePicker = ({handleGetDate, labelError, label}) => {
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [dateString, setdateString] = useState('');

    useEffect(() =>  handleGetDate(dateString), [dateString]);

    const handleOnChange = (event, selectedDate) => {
        try {
            setShow(false);
            const currentDate = selectedDate || date;
            setDate(currentDate);

            let day = selectedDate.getDate();
            let month = selectedDate.getMonth() + 1;
            let year = selectedDate.getFullYear();

            if (month < 10 && day < 10) {
                setdateString(`0${day}-0${month}-${year}`);
            } else if (month < 10 ) {
                setdateString(`${day}-0${month}-${year}`);
            } else if (day < 10) {
                setdateString(`0${day}-${month}-${year}`);
            } else {
                setdateString(`${day}-${month}-${year}`);
            }
        } catch (e) {
        }   
    };

    return (
        <TouchableWithoutFeedback onPress={() => setShow(true)}>
            <View>
                <InputText
                    label={label}
                    labelError={labelError}
                    placeholder={'DD-MM-AAAA'}
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