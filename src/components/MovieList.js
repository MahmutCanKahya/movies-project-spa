import { Table, Layout, Pagination, Input, Row, Col, DatePicker, Select } from 'antd'
import React, { Component } from 'react'
import { connect } from 'react-redux';
import movieActions from '../store/actions/MovieActions';
import moment from 'moment'
import { Link } from 'react-router-dom';

const { Content } = Layout;
const { Option } = Select;
const { movieFetch } = movieActions;

class Movie extends Component {
    state = {
        columns: [
            {
                title: 'Title',
                dataIndex: 'Title',
                render: (text, record) => <Link to={"/movie/" + record.imdbID}>{text}</Link>,
            },
            {
                title: 'Year',
                dataIndex: 'Year',
                render: text => moment(text.replace("–", "")).format("yyyy") !== "Invalid date" ? moment(text.replace("–", "")).format("yyyy") : text,
            },
            {
                title: 'ImdbID',
                dataIndex: 'imdbID',
            },


        ],
        movieNameFilter: undefined,
        currentPage: 1,
        yearFilter: undefined,
        type: undefined,
    }
    componentDidMount() {
        this.props.movieFetch();
    }

    paginationOnChange = (pageNumber) => {
        this.props.movieFetch(this.state.movieNameFilter, pageNumber, this.state.yearFilter, this.state.type);
        this.setState({
            currentPage: pageNumber
        })
        console.log('Page: ', pageNumber);
    }
    movieNameFilter = (e) => {
        this.setState({
            currentPage: 1,
            movieNameFilter: e.target.value === "" ? undefined : e.target.value
        })
        console.log(e.target.value)
        this.props.movieFetch(e.target.value === "" ? undefined : e.target.value, 1, this.state.yearFilter, this.state.type);
    }
    yearFilter = (date, dateString) => {
        this.setState({
            currentPage: 1,
            yearFilter: dateString
        })
        this.props.movieFetch(this.state.movieNameFilter, this.state.currentPage, dateString, this.state.type);
    }
    typeChange = (value) => {
        console.log(value)
        this.setState({
            currentPage: 1,
            type: value === "alltype" ? undefined : value
        })
        this.props.movieFetch(this.state.movieNameFilter, this.state.currentPage, this.state.yearFilter, value === "alltype" ? undefined : value);
    }

    render() {
        return (
            <Layout className="layout" style={{ minHeight: '100vh' }}>
                <Content style={{ padding: '0 50px', margin: 0, position: "absolute", top: "50%", transform: "translateY(-50%)", width: "100%" }}  >
                    <Row style={{ marginBottom: "16px" }} >
                        <Col span={8} >
                            <Input style={{ width: "50%" }} allowClear placeholder="Movie name" onChange={this.movieNameFilter} />
                        </Col>
                        <Col span={8} >
                            <DatePicker onChange={this.yearFilter} picker="year" />
                        </Col>
                        <Col span={8}>
                            <Select defaultValue={"alltype"} style={{ width: 120 }} onChange={this.typeChange}>
                                <Option value="alltype" >AllType</Option>
                                <Option value="movie">Movie</Option>
                                <Option value="series">Series</Option>
                                <Option value="episode" >Episode</Option>
                            </Select>
                        </Col>
                    </Row>
                    <Table columns={this.state.columns} rowKey={p => p.imdbID} dataSource={this.props.movies} pagination={false} />
                    <Pagination style={{ textAlign: "center", marginTop: "16px" }} current={this.state.currentPage} defaultCurrent={1} total={this.props.totalMovie} showSizeChanger={false} onChange={this.paginationOnChange} />
                </Content>
            </Layout>

        )
    }
}

const mapStateToProps = state => {
    const { movies, totalMovie } = state.movie;
    return {
        movies,
        totalMovie
    }
};

export default connect(mapStateToProps, { movieFetch })(Movie)