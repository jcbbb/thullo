type IAuthReducer =
    | { type: 'SET_USER', payload: any }


const authReducer = <T>(state: T, action: IAuthReducer) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.payload,
            }
        default:
            throw new Error(`Unsupported action type`)
    }
}

export default authReducer;
