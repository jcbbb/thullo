import makeStore from '../utils/makeStore';
import authReducer from '../reducers/authReducer'

const initalState = {
    isAuthenticated: false
}

const [AuthProvider, useAuthStore, useAuthDispatch] = makeStore(authReducer, initalState)


export {AuthProvider, useAuthStore, useAuthDispatch}
