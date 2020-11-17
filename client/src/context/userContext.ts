import makeStore from '../utils/makeStore';
import userReducer from '../reducers/userReducer'

const initalState = {
    user: null,
}

const [UserProvider, useUserStore, useUserDispatch] = makeStore(userReducer, initalState)


export { UserProvider, useUserStore, useUserDispatch }
