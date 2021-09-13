import { useState } from "react"

export const useForm = ( fields ) => {
    
    const [values, setValues] = useState(fields);

    const handleInputChange = ( value, name ) => {
        
        let isComplete = (value.trim().length > 1);
     
        setValues({
            ...values,
            [ name ]: { value, isComplete }
        });

    }

    return [values, handleInputChange];
}