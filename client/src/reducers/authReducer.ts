type IAuthReducer =
    | {type: 'LOGIN'}
    | {type: 'LOGOUT'}
    | {type: never}


const authReducer = <T>(state: T, action: IAuthReducer) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isAuthenticated: true
            }
        case 'LOGOUT':
            return {
                ...state,
                isAuthenticated: false
            }
        default:
            throw new Error(`Unsupported action type ${action.type}`)
    }
}

export default authReducer;
