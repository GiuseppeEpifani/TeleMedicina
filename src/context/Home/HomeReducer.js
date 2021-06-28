export const homeReducer = ( state, action ) => {

    switch ( action.type ) {
        case 'setPatient':
            return {
                ...state,
                patient: action.payLoad,
                loading: false,
                disabled: false
            }

        case 'setListPatient':
            return {
                ...state,
                listPatient: action.payLoad.listPatient,
                numberPage: action.payLoad.numberPage,
                totalPage: action.payLoad.totalPage,
            }

        case 'setLoading':
            return {
                ...state,
                loading: action.payLoad,
                disabled: action.payLoad
            }
            
        default:
            return state;
    }

}