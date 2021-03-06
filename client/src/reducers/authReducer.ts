type IAuthReducer =
  | {type: 'LOGIN'}
  | {type: 'SIGNUP'}
  | {type: 'LOGOUT'}


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
    case 'SIGNUP': {
      return {
        ...state,
        isAuthenticated: true
      }
    }
    default:
      throw new Error(`Unsupported action type`)
  }
}

export default authReducer;
