import movieActions from "../actions/MovieActions";

const initialState = {
    movies: [],
    totalMovie: 0,
    movie: {}
};

export const movieReducer = function (state = initialState, action) {
    console.log(action)
    switch (action.type) {
        case movieActions.MOVIE_FETCH_SUCCESS:
            return {
                ...state,
                movies: action.payload.movies,
                totalMovie: action.payload.totalMovie
            };
        case movieActions.MOVIE_FETCH_BY_ID_SUCCESS:
            return {
                ...state,
                movie: action.payload.movie
            }
        default:
            return state;
    }
};