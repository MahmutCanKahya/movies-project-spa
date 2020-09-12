import movieActions from "../actions/MovieActions";

const initialState = {
    movies: [],
};

export const movieReducer = function (state = initialState, action) {
    console.log(action)
    switch (action.type) {
        case movieActions.MOVIE_FETCH_SUCCESS:
            return {
                ...state,
                movies: action.payload,
            };

        default:
            return state;
    }
};