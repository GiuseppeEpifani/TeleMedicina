import moment from 'moment';

export const formatDateHuman = (date, format_origin, format) => {
    format = format == undefined ? 'HH:mm:ss DD-MM-YYYY' : format;
    format_origin = format_origin == undefined ? 'YYYY-MM-DD HH:mm:ss' : format_origin;
    let momentDate = moment(date, format_origin).locale('es').format(format);

    return momentDate;
}