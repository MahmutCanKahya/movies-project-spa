import { Table, Layout } from 'antd'
import React, { Component } from 'react'
import { connect } from 'react-redux';
import movieActions from '../store/actions/MovieActions';
import moment from 'moment'
import { Link } from 'react-router-dom';
const { Content } = Layout;

const { movieFetch } = movieActions;
class Movie extends Component {
    state = {
        default: ":)))",
        columns: [
            {
                title: 'Title',
                dataIndex: 'Title',
                render: (text, record) => <Link to={"/movie/" + record.imdbID}>{text}</Link>,
            },
            {
                title: 'Year',
                dataIndex: 'Year',
                render: text => moment(text.replace("–", "")).format("yyyy"),
            },
            {
                title: 'ImdbID',
                dataIndex: 'imdbID',
            },


        ],
        data: this.props.movies
    }
    componentDidMount() {
        this.props.movieFetch();
    }

    render() {
        console.log(this.props)
        return (
            <Content style={{ padding: '0 50px' }}>
                <Table columns={this.state.columns} rowKey={p => p.imdbID} dataSource={this.props.movies} />
            </Content>

        )
    }
}

const mapStateToProps = state => {
    const { movies } = state.movie;
    return {
        movies
    }
};

export default connect(mapStateToProps, { movieFetch })(Movie)