export const recordReducer = ( state, action ) => {

    switch ( action.type ) {

        case 'setRecords':
            return {
                ...state,
                clinicalRecords: action.payLoad
            }

        case 'setLoading':
            return {
                ...state,
                loading: action.payLoad
            }
        
        case 'cleanData':
            return {
                ...state,
                clinicalRecords: []
            }

        case 'setCurrentRecord':
            return {
                ...state,
                currentRecord: action.payLoad
            }
            
        default:
            return state;
    }

}