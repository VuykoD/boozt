import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../scc/images.css';
import '../scc/main.css';

export default class Card extends Component {
    static propTypes = {
        product: PropTypes.shape({})
    }
    constructor(props) {
        super(props);

        this.state = {
            showSortModal: false
        };
    }

    render() {
        const { product }  = this.props || {};
        const { brand, model, price, discount, img }  = product;
        const priceWithDiscount = price * (100 - discount) / 100;

        return (
            <div>
                <Image src={require(`../images/products/${img}.jpg`)} alt="" className="img"/>
                <div className="product" children={brand} />
                <div className="product" children={model} />
                <div className="bold">
                    <span children={`${priceWithDiscount} €`} />
                    {discount > 0 &&
                        <span
                            className="lineThrough"
                            children={`${price} €`}
                        />
                    }
                </div>
            </div>
        );
    }
}
