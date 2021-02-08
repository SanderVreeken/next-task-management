export const initialState = {
    cover: false,
    task: null,
    team: 'TEAM',
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
        case 'UPDATE_TEAM':
            return { 
                ...state,
                team: action.item
            }
        case 'UPDATE_USER':
            return { 
                ...state,
                user: action.item
            }        
        default:
            return state  
    }
}

export default reducer