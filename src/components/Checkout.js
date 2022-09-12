import React, { Component } from 'react';
import { Badge, Col, ListGroup, Row, Card } from 'react-bootstrap';
import { numberWithCommas } from '../utils/utils';
import ModalCart from './ModalCart';
import TotalBayar from './TotalBayar';
import { API_URL } from '../utils/constants';
import axios from 'axios';
import swal from 'sweetalert';

export default class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      keranjangDetail: false,
      jumlah: 0,
      keterangan: '',
      totalHarga: 0
    };
  }

  handleShow = (listKeranjang) => {
    this.setState({
      showModal: true,
      keranjangDetail: listKeranjang,
      jumlah: listKeranjang.jumlah,
      keterangan: listKeranjang.keterangan,
      totalHarga: listKeranjang.total_harga
    });
  };

  handleClose = () => {
    this.setState({
      showModal: false
    });
  };

  // Function agar tombol Plus dan Minus bisa di klik
  // Tombol Tambah Pesanan
  buttonPlus = () => {
    this.setState({
      jumlah: this.state.jumlah + 1,
      totalHarga:
        this.state.keranjangDetail.product.harga * (this.state.jumlah + 1)
    });
  };

  // Tombol Kurangi Pesanan
  buttonMinus = () => {
    // jika pesanan berjumlah 1 maka tidak bisa dikurangi lagi
    if (this.state.jumlah !== 1) {
      this.setState({
        jumlah: this.state.jumlah - 1,
        totalHarga:
          this.state.keranjangDetail.product.harga * (this.state.jumlah - 1)
      });
    }
  };

  // Function Untuk Keterangan
  changeHandler = (event) => {
    this.setState({
      keterangan: event.target.value
    });
  };

  // Function untuk submit di Form
  handleSubmit = (event) => {
    event.preventDefault(); // berfungsi utk tidak ke reload, biasanya form itu ketika di klik submit akan ke reload.
    // console.log('Hello', this.state.keterangan);

    this.handleClose();

    const data = {
      jumlah: this.state.jumlah,
      total_harga: this.state.totalHarga,
      product: this.state.keranjangDetail.product,
      keterangan: this.state.keterangan
    };

    axios
      .put(API_URL + 'keranjangs/' + this.state.keranjangDetail.id, data)
      .then((res) => {
        this.props.getListKeranjang();
        swal({
          title: 'Berhasil!',
          text: 'Pesanan ' + data.product.nama + ' Berhasil di Upadate!',
          icon: 'success'
        });
      })
      //Jika gagal
      .catch((error) => {
        console.log('PAGE NOT FOUND ', error);
      });
  };

  // Funtion tombol Hapus Pesanan
  hapusPesanan = (id) => {
    this.handleClose();

    axios
      .delete(API_URL + 'keranjangs/' + id)
      .then((res) => {
        this.props.getListKeranjang();
        swal({
          title: 'Pesanan Terhapus!',
          text:
            'Pesanan ' +
            this.state.keranjangDetail.product.nama +
            ' Telah Terhapus!',
          icon: 'warning'
        });
      })
      //Jika gagal
      .catch((error) => {
        console.log('PAGE NOT FOUND ', error);
      });
  };

  render() {
    const { keranjangs } = this.props;
    return (
      <Col md={4} mt="3" className="checkout">
        <h2>Checkout</h2>
        <hr />
        {keranjangs.length !== 0 && (
          <Card className="overflow-auto checkout">
            <ListGroup variant="flush">
              {keranjangs.map((listKeranjang) => (
                <ListGroup.Item
                  key={listKeranjang.id}
                  onClick={() => this.handleShow(listKeranjang)}
                >
                  <Row>
                    <Col xs={2}>
                      <h4>
                        {/* <h6>Jumlah</h6> */}
                        <Badge bg="success">{listKeranjang.jumlah}</Badge>
                      </h4>
                    </Col>
                    <Col>
                      {/* <h6>Produk</h6> */}
                      <h5> {listKeranjang.product.nama} </h5>
                      <p>
                        Rp. {numberWithCommas(listKeranjang.product.harga)}{' '}
                      </p>
                    </Col>
                    <Col>
                      {/* <h6>Harga</h6> */}
                      <strong className="float-right">
                        {' '}
                        Rp. {numberWithCommas(listKeranjang.total_harga)}{' '}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}

              <ModalCart
                handleClose={this.handleClose}
                {...this.state}
                buttonPlus={this.buttonPlus}
                buttonMinus={this.buttonMinus}
                changeHandler={this.changeHandler}
                handleSubmit={this.handleSubmit}
                hapusPesanan={this.hapusPesanan}
              />
            </ListGroup>
          </Card>
        )}
        <TotalBayar keranjangs={keranjangs} {...this.props} />
      </Col>
    );
  }
}
