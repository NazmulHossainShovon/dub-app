'use client';

import { PropsWithChildren, createContext, useEffect, useReducer } from 'react';
import { AppState, User } from './types';
import { io, Socket } from 'socket.io-client';

const initialState: AppState = {
  userInfo: {
    _id: '',
    name: '',
    email: '',
    friends: [],
    receivedFriendReqs: [],
    sentFriendReqs: [],
    token: '',
    profileImage: '',
  },
  searchQuery: '',
};

let socket: Socket;
if (typeof window !== 'undefined') {
  socket = io(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000');
}

type Action =
  | { type: 'sign-in'; payload: User }
  | { type: 'sign-out' }
  | { type: 'new-friend-req'; payload: string };

const reducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'sign-in':
      if (typeof window !== 'undefined') {
        localStorage.setItem('user-info', JSON.stringify(action.payload));
        if (socket) {
          socket.emit('storeUser', action.payload.name);
        }
      }
      return { ...state, userInfo: action.payload };
    case 'sign-out':
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user-info');
        localStorage.removeItem('user-token');
      }
      return {
        ...state,
        userInfo: {
          _id: '',
          name: '',
          email: '',
          friends: [],
          receivedFriendReqs: [],
          sentFriendReqs: [],
          token: '',
          profileImage: '',
        },
      };
    case 'new-friend-req':
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          receivedFriendReqs: [
            ...state.userInfo.receivedFriendReqs,
            action.payload,
          ],
        },
      };
    default:
      return state;
  }
};

const defaultDispatch: React.Dispatch<Action> = () => initialState;

const Store = createContext({
  state: initialState,
  dispatch: defaultDispatch,
});

function StoreProvider(props: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUserInfo = localStorage.getItem('user-info');
      if (storedUserInfo) {
        dispatch({ type: 'sign-in', payload: JSON.parse(storedUserInfo) });
      }
    }
  }, []);

  return <Store.Provider value={{ state, dispatch }} {...props} />;
}

export { Store, StoreProvider, socket };
