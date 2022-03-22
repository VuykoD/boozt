import React, { Component } from 'react';
import map from 'lodash/map';
import sortBy from 'lodash/sortBy';
import {
    Button,
    Row,
    Col,
    Container,
    Image,
    Breadcrumb,
    Modal
} from 'react-bootstrap';
import Card from './components/card'
import products from './products.json';
import logo from './images/logo.jpg';

import 'bootstrap/dist/css/bootstrap.min.css';
import './scc/images.css';
import './scc/main.css';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showSortModal: false,
            sort: 'popular'
        };

    }

    showSortModal =()=> this.setState({ showSortModal: true });

    handleModalClose =()=> this.setState({ showSortModal: false });

    sortByPopular =()=> this.setState({ sort: 'popular', showSortModal: false });

    sortByPriceLowHigh =()=> this.setState({ sort: 'cheaper', showSortModal: false  });

    sortByPriceHighLow =()=> this.setState({ sort: 'expensive', showSortModal: false  });

    render() {
        const { showSortModal, sort } = this.state;
        const sortTxt = "Sort by ↑↓";
        const prWithDiscount = [];
        map(products, product => {
            const { price, discount } = product;
            prWithDiscount.push({
                ...product,
                priceWithDiscount: price * (100 - discount) / 100
            })
        })
        let sortedProducts = prWithDiscount;
        if (sort === 'popular') sortedProducts = sortBy(prWithDiscount, 'popular');
        if (sort === 'cheaper') sortedProducts = sortBy(prWithDiscount, 'priceWithDiscount');
        if (sort === 'expensive') sortedProducts = sortBy(prWithDiscount, 'priceWithDiscount').reverse();

        return (
            <Container>
                <Image src={logo} alt="" className="logo"/>
                <Breadcrumb className="breadcrumb center">
                    <Breadcrumb.Item href="#" children="Sport for Men" />
                    <Breadcrumb.Item href="#" children="Running" />
                    <Breadcrumb.Item href="#" children="Running Shoes" active/>
                </Breadcrumb>
                <h1 children="Running" className="h1 center"/>
                <Row className="mx-0">
                    <Col>
                        <Button
                            className="right"
                            variant="light"
                            onClick={this.showSortModal}
                            children={sortTxt}
                        />
                    </Col>
                </Row>
                <Modal show={showSortModal} onHide={this.handleModalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title children={sortTxt} />
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <Button
                                variant="light"
                                onClick={this.sortByPopular}
                                children="Popular"
                            />
                        </div>
                        <div>
                            <Button
                                variant="light"
                                onClick={this.sortByPriceLowHigh}
                                children="Price low-high"
                            />
                        </div>
                        <div>
                            <Button
                                variant="light"
                                onClick={this.sortByPriceHighLow}
                                children="Price high-low"
                            />
                        </div>
                    </Modal.Body>
                </Modal>
                <Row>
                    {map(sortedProducts, (product, key) => {
                        return(
                            <Col key={key} sm={3}>
                                <Card
                                    product={product}
                                />
                            </Col>
                        )
                    })}
                </Row>
            </Container>
        );
    }
}
