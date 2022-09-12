import React from 'react'
import {Col, Card} from 'react-bootstrap'
import { numberWithCommas } from '../utils/utils'

const Menus = ({ menu, addToCarts }) => {
  return (
    <Col md={4} xs={6} className="mb-4" >
      <Card className='list-menu' onClick={() => addToCarts(menu)} >
      <Card.Img variant="top" src={"assets/img/"+menu.category.nama.toLowerCase()+"/"+menu.gambar} height="250" />
      <Card.Body>
        <Card.Title className='title'>{menu.nama} <strong>{menu.kode}</strong></Card.Title>
        <Card.Text>
          Rp. {numberWithCommas(menu.harga)}
          </Card.Text>
      </Card.Body>
    </Card>
    </Col>
  )
}

export default Menus