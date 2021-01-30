export const initialState = {
    cover: false,
    task: null,
    team: 'd86b76f5-b87e-4246-a9b0-cf5d2004e594',
    user: 'f8427b0e-78d7-4d4d-819a-9dd0d2ae19f2'
}

const reducer = (state, action) => {
    console.log(action)
    switch(action.type) {
        case 'UPDATE_COVER':
            return { 
                ...state,
                cover: action.item
            }
        case 'UPDATE_TASK':
            return { 
                ...state,
                task: action.item
            }    
        default:
            return state  
    }
}

export default reducer