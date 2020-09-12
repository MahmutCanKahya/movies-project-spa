import React, { Component } from 'react'

export default class MovieDetail extends Component {
    componentDidMount() {
        const imdbID = this.props.match.params.imdbID;
        console.log(imdbID)
    }
    render() {
        return (
            <div>
                xxx
            </div>
        )
    }
}
