// Define the type for the dispatch function based on the store
type Action =
  | { type: 'sign-in'; payload: any }
  | { type: 'sign-out' }
  | { type: 'new-friend-req'; payload: string };

type Dispatch = (action: Action) => void;

export const handleLogout = (dispatch: Dispatch, router: any) => {
  dispatch({ type: 'sign-out' });
  router.push('/login');
};
