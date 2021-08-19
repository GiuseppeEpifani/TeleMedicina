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

        case 'setLoadingMorePatient':
            return {
                ...state,
                LoadingMorePatient: action.payLoad,
                disabled: action.payLoad
            }
            
        case 'setMessage':
            return {
                ...state,
                message: action.payLoad
            }

        case 'setLoadingPatients':
            return {
                ...state,
                loadingPatients: action.payLoad
            }

        case 'cleanDebounce':
            return {
                ...state,
                isCleanDebounce: action.payLoad
            }

        default:
            return state;
    }

}