
let initialState = {
    data: {},
}


function getDataReducer(state = initialState, action) {
    let { type, payload } = action
    switch (type) {
        case "GET_POINT_DATA":
            return{
                ...state,
                data: payload.data,
            }
        default:
            return { ...state }
    }
}


export default getDataReducer;