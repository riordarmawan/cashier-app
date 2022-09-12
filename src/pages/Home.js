import React, { Component } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import {
  NavbarComponent,
  HeroImage,
  Menu,
  Checkout,
  Menus
} from '../components';
import { API_URL } from '../utils/constants';
import axios from 'axios';
import swal from 'sweetalert';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      menuDipilih: 'Makanan',
      keranjangs: []
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + 'products?category.nama=' + this.state.menuDipilih)
      .then((res) => {
        // console.log("Response : ", res);
        const menus = res.data;
        this.setState({ menus });
      })
      //Jika gagal
      .catch((error) => {
        console.log('PAGE NOT FOUND ', error);
      });

    this.getListKeranjang();
  }

  // auto refresh setiap kali ada update (perubahan)
  // componentDidUpdate(prevState) {
  //   if (this.state.keranjangs !== prevState.keranjangs) {
  //     axios
  //       .get(API_URL + 'keranjangs')
  //       .then((res) => {
  //         const keranjangs = res.data;
  //         this.setState({ keranjangs });
  //       })
  //       //Jika gagal
  //       .catch((error) => {
  //         console.log('PAGE NOT FOUND ', error);
  //       });
  //   }
  // }

  getListKeranjang = () => {
    axios
      .get(API_URL + 'keranjangs')
      .then((res) => {
        const keranjangs = res.data;
        this.setState({ keranjangs });
      })
      //Jika gagal
      .catch((error) => {
        console.log('PAGE NOT FOUND ', error);
      });
  };

  changeMenu = (value) => {
    this.setState({
      menuDipilih: value,
      menus: []
    });
    axios
      .get(API_URL + 'products?category.nama=' + value)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      //Jika gagal
      .catch((error) => {
        console.log('PAGE NOT FOUND ', error);
      });
  };

  addToCarts = (value) => {
    // console.log("Menu", value)

    axios
      .get(API_URL + 'keranjangs?product.id=' + value.id)
      .then((res) => {
        // jika datanya ga ada / 0
        if (res.data.length === 0) {
          const cart = {
            jumlah: 1,
            total_harga: value.harga,
            product: value
          };

          axios
            .post(API_URL + 'keranjangs', cart)
            .then((res) => {
              this.getListKeranjang();
              swal({
                title: 'Berhasil!',
                text:
                  'Pesanan ' +
                  cart.product.nama +
                  ' Masuk ke Halaman Checkout!',
                icon: 'success'
              });
            })
            //Jika gagal
            .catch((error) => {
              console.log('PAGE NOT FOUND ', error);
            });
          // tetapi jika ada data-nya
        } else {
          const cart = {
            jumlah: res.data[0].jumlah + 1,
            total_harga: res.data[0].total_harga + value.harga,
            product: value
          };

          axios
            .put(API_URL + 'keranjangs/' + res.data[0].id, cart)
            .then((res) => {
              swal({
                title: 'Berhasil!',
                text:
                  'Pesanan ' +
                  cart.product.nama +
                  ' Masuk ke Halaman Checkout!',
                icon: 'success'
              });
            })
            //Jika gagal
            .catch((error) => {
              console.log('PAGE NOT FOUND ', error);
            });
        }
      })
      //Jika gagal
      .catch((error) => {
        console.log('PAGE NOT FOUND ', error);
      });
  };

  render() {
    // console.log(this.state.menus);
    const { menus, menuDipilih, keranjangs } = this.state;
    return (
      <div className="Home">
        <NavbarComponent
          changeMenu={this.changeMenu}
          menuDipilih={menuDipilih}
        />
        <HeroImage />
        <div className="mt-3">
          <Container fluid>
            <Row>
              <Col>
                <Menu />
                <Row className="overflow-auto menu">
                  {/* jika menus ada isinya maka mapping menus-nya */}
                  {menus &&
                    menus.map((menu) => (
                      <Menus
                        key={menu.id}
                        menu={menu}
                        addToCarts={this.addToCarts}
                      />
                    ))}
                </Row>
              </Col>
              <Checkout
                keranjangs={keranjangs}
                {...this.props}
                getListKeranjang={this.getListKeranjang}
              />
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
