import { createStore, applyMiddleware } from 'redux';
import root_reducer from '../../redux/reducers/root_reducer';
import thunk from 'redux-thunk';


import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';


export default function configureStore() {

    const persistConfig = {
        key: 'root',
        keyPrefix: '',
        storage: AsyncStorage,
        timeout: 0,
        whitelist: [ 'user_auth']
        
      }
      
      const persistedReducer = persistReducer(persistConfig, root_reducer)
      let store = createStore(persistedReducer, {}, applyMiddleware(thunk))
    // let store = createStore(root_reducer, applyMiddleware(thunk))
    return store
}