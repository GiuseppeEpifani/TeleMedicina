export const formatDate = (date) => {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if (month < 10 && day < 10) {
        return `0${day}-0${month}-${year}`;
    } else if (month < 10 ) {
        return `${day}-0${month}-${year}`;
    } else if (day < 10) {
        return `0${day}-${month}-${year}`;
    } else {
        return `${day}-${month}-${year}`;
    }
}