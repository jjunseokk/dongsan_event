


function getData(point) {
    return(dispatch) => {
        dispatch({
            type: "GET_POINT_DATA",
            payload: {
                data: point,
            },
        })
    }
};

export const pointAction = {
    getData
};