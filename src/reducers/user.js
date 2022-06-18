const initialState = {
    user: {
        userId:"",
        firstName:"",
        secondName:"",
        role:""
    }
}

export default function user(state = initialState, action){
    switch(action.type){
        case 'ChangeUser':
            return {
                ...state, user: action.payload
            }
        default:
            return state
    }
}