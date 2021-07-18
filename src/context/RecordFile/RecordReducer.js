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

        case 'setDimension':
            let currentRecord = state.currentRecord;
            let therIsDmension = currentRecord.clinical_interview.some(dimension => dimension._id === action.payLoad._id);

            if (therIsDmension) {
                let newDimension = currentRecord.clinical_interview.map(dimension => {
                    if (dimension._id === action.payLoad._id) {
                        return action.payLoad;
                    } else {
                        return dimension;
                    }
                });
                currentRecord.clinical_interview = newDimension;
            } else {
                currentRecord.clinical_interview.push(action.payLoad);
            }

            console.log(currentRecord)

            return {
                ...state,
                currentRecord
            }
            
        default:
            return state;
    }

}