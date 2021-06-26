export const authReducer = ( state, action ) => {

    switch ( action.type ) {
        case 'signIn':
            return {
                ...state,
                isLoggedIn: true,
                status: 'authenticated',
                token: action.payLoad.token,
                username: action.payLoad.email,
                loading: false
            }

        case 'logout':
            return {
                ...state,
                isLoggedIn: false,
                status: 'not-authenticated',
                token: null,
                username: null,
            }

        case 'refreshToken':
            return {
                ...state,
                isLoggedIn: true,
                status: 'authenticated',
                token: action.payLoad
            }

        case 'notAuthenticated':
            return {
                ...state,
                isLoggedIn: false,
                status: 'not-authenticated',
                token: null,
                username: null,
                loading: false
            }

        case 'addError':
            return {
                ...state,
                isLoggedIn: false,
                status: 'not-authenticated',
                token: null,
                username: null,
                loading: false,
                errorMessage: action.payLoad
            }

        case 'removeError':
            return {
                ...state,
                errorMessage: ''
            }

        case 'setLoading':
            return {
                ...state,
                loading: true
            }

        default:
            return state;
    }

}