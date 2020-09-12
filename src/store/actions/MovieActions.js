import Axios from "axios";

const movieActions = {
    MOVIE_FETCH_SUCCESS: 'MOVIE_FETCH_SUCCESS',
    movieFetch: () => {
        return dispatch => {
            Axios.get("http://www.omdbapi.com/?apikey=d0cc69a&s=pokemon")
                .then(res => {
                    console.log(res)
                    movieActions.movieFetchSuccess(dispatch,res.data.Search)
                })
        }
    },
    movieFetchSuccess: (dispatch, movies) => {
        return dispatch({
            type: movieActions.MOVIE_FETCH_SUCCESS,
            payload: movies,
        });
    },
}

export default movieActions;