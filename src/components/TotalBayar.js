import axios from 'axios';
import React, { Component } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { BrowserRouter, Link } from 'react-router-dom';
import { API_URL } from '../utils/constants';
import { numberWithCommas } from '../utils/utils';
// import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

export default class TotalBayar extends Component {
  submitTotalBayar = (totalBayar) => {
    const pesanan = {
      total_bayar: totalBayar,
      menus: this.props.keranjangs
    };

    axios.post(API_URL + 'pesanans', pesanan).then((res) => {
      this.props.history.push('/success');
    });
  };

  render() {
    const totalBayar = this.props.keranjangs.reduce(function (result, item) {
      return result + item.total_harga;
    }, 0);
    return (
      <>
        {/* Desktop Web */}
        <div className="fixed-bottom d-none d-md-block">
          <Row>
            <Col md={{ span: 4, offset: 8 }} className="px-4">
              <h4>
                Total Harga{' '}
                <strong className="ms-auto">
                  Rp. {numberWithCommas(totalBayar)}
                </strong>{' '}
              </h4>
              <div className="d-grid gap-2 btn-bayar">
                <BrowserRouter forceRefresh={true}>
                  <Button
                    variant="primary"
                    size="md mb-2"
                    fixed="bottom"
                    onClick={() => this.submitTotalBayar(totalBayar)}
                    as={Link}
                    to="/"
                  >
                    {/* <FontAwesomeIcon icon={faShoppingCart} /> */}
                    <strong>Bayar</strong>
                  </Button>
                </BrowserRouter>
              </div>
            </Col>
          </Row>
        </div>

        {/* Mobile Web */}
        <div className="d-sm-block d-md-none bayar">
          <Row>
            <Col md={{ span: 4, offset: 8 }} className="px-4">
              <h4>
                Total Harga{' '}
                <strong className="ms-auto">
                  Rp. {numberWithCommas(totalBayar)}
                </strong>{' '}
              </h4>
              <div className="d-grid gap-2 btn-bayar">
                <BrowserRouter forceRefresh={true}>
                  <Button
                    variant="primary"
                    size="md mb-2"
                    fixed="bottom"
                    onClick={() => this.submitTotalBayar(totalBayar)}
                    as={Link}
                    to="/"
                  >
                    {/* <FontAwesomeIcon icon={faShoppingCart} /> */}
                    <strong>Bayar</strong>
                  </Button>
                </BrowserRouter>
              </div>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}
