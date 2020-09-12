import Axios from "axios";

const movieActions = {
    MOVIE_FETCH_SUCCESS: 'MOVIE_FETCH_SUCCESS',
    MOVIE_FETCH_BY_ID_SUCCESS: 'MOVIE_FETCH_BY_ID_SUCCESS',
    movieFetch: (s = "pokemon", page = 1, y, type) => {
        return dispatch => {
            Axios.get("http://www.omdbapi.com/?apikey=d0cc69a", {
                params: {
                    s,
                    page,
                    y,
                    type
                }
            })
                .then(res => {
                    console.log(res)
                    movieActions.movieFetchSuccess(dispatch, res.data)
                })
        }
    },
    movieFetchById(i) {
        return dispatch => {
            Axios.get("http://www.omdbapi.com/?apikey=d0cc69a", {
                params: {
                    i
                }
            })
                .then(res => {
                    console.log(res)
                    movieActions.movieFetchByIdSuccess(dispatch, res.data)
                })
        }
    },
    movieFetchByIdSuccess: (dispatch, movie) => {
        return dispatch({
            type: movieActions.MOVIE_FETCH_BY_ID_SUCCESS,
            payload: {
                movie
            },
        });
    },
    movieFetchSuccess: (dispatch, data) => {
        return dispatch({
            type: movieActions.MOVIE_FETCH_SUCCESS,
            payload: {
                movies: data.Search,
                totalMovie: data.totalResults
            },
        });
    },
}

export default movieActions;