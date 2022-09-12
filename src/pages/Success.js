import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { API_URL } from '../utils/constants';
import axios from 'axios';

export default class Success extends Component {
  componentDidMount() {
      axios
      .get(API_URL + 'keranjangs')
      .then((res) => {
        const keranjangs = res.data;
        keranjangs.map(function (item) {
          return axios
          .delete(API_URL + 'keranjangs/' + item.id)
          .then((res) => console.log(res))
          .catch((error) => console.log(error))
        });
      }) 
      //Jika gagal
      .catch((error) => {
        console.log("PAGE NOT FOUND " , error);
      })
    }

  render() {
    return (
      <div className='mt-4 text-center' >
        <h2>Sukses</h2>
        <p>Terimakasih Pesanan Anda Akan Diproses</p>
        <BrowserRouter forceRefresh={true} >
        <Button variant='success' as={Link} to="/">Kembali</Button>
        </BrowserRouter>
      </div>
    )
  }
}
