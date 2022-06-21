const initialState = {
  user: {
    userId: '',
    firstName: '',
    secondName: '',
    role: '',
  },
};

const CHANGE_USER = 'CHANGE_USER';

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
}

export const changeUserAction = (payload) => ({type: CHANGE_USER, payload});
