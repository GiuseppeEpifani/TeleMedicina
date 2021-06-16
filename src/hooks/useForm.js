import { useState } from "react"

export const useForm = ( { fields, validate } ) => {
    
    const [values, setValues] = useState(fields);
    const [validateForm, setValidateForm] = useState(validate);

    let keys = Object.keys(fields);
    let key, field, isSubmit;

    for (let i = 0; i < keys.length; i++) {
        key = keys[i];
        field = values[key];

        if (field.value.length > 0) {
            if (key == 'email') {
                const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
                isSubmit = emailRegex.test(field.value);

                if (!isSubmit) {
                    break;
                }
            } else {
                isSubmit = true;
            }
        } else {
            isSubmit = false;
            break;
        }
    }
  
    const handleInputChange = ( value, name ) => {
        
        let isComplete;
        if (value.length > 0) {
            isComplete = true;
        } else {
            isComplete = false;
        }

        let isValid = true;
        if (name == 'email') {
            const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
            isValid = emailRegex.test(value);
            isSubmit = isValid;
        } 

        setValues({
            ...values,
            [ name ]: { value, isValid, isComplete }
        });

    }

    return [ values, handleInputChange, validateForm, setValidateForm, isSubmit];
}