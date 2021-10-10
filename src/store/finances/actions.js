export const SET_OPEN = "SET_OPEN";
export const setOpen = data => ({
    type: SET_OPEN,
    payload: data
});

export const SET_PAGINATION = "SET_PAGINATION";
export const setPagination = data => ({
    type: SET_PAGINATION,
    payload: data
});

export const SET_DATA = "SET_DATA";
export const setData = data => ({
    type: SET_DATA,
    payload: data
});

export const CREATED_ROW = "CREATED_ROW";
export const createdRow = data => ({
    type: CREATED_ROW,
    payload: data
});
