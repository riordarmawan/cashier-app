import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { numberWithCommas } from '../utils/utils';

const ModalCart = ({
  showModal,
  handleClose,
  keranjangDetail,
  jumlah,
  keterangan,
  buttonPlus,
  buttonMinus,
  changeHandler,
  handleSubmit,
  totalHarga,
  hapusPesanan
}) => {
  if (keranjangDetail) {
    return (
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {' '}
            {keranjangDetail.product.nama}{' '}
            <strong>{numberWithCommas(keranjangDetail.product.harga)}</strong>{' '}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Total Harga : </Form.Label>
              <strong>
                <p> Rp. {numberWithCommas(totalHarga)} </p>
              </strong>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Jumlah : </Form.Label>
              <strong>{jumlah}</strong>
              <br />
              <Button
                variant="primary"
                size="sm"
                className="btn-min"
                onClick={() => buttonMinus()}
              >
                <FontAwesomeIcon icon={faMinus} />
              </Button>
              <Button
                variant="primary"
                size="sm"
                className="btn-plus"
                onClick={() => buttonPlus()}
              >
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Keterangan :</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                name="keterangan"
                placeholder="Contoh : Pedas, Nasi setengah"
                value={keterangan}
                onChange={(event) => changeHandler(event)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            type="submit"
            onClick={(event) => handleSubmit(event)}
          >
            Simpan
          </Button>
          <Button
            variant="warning"
            onClick={() => hapusPesanan(keranjangDetail.id)}
          >
            <FontAwesomeIcon icon={faTrash} /> Hapus Pesanan
          </Button>
        </Modal.Footer>
      </Modal>
    );
  } else {
    return (
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Kosong </Modal.Title>
        </Modal.Header>
        <Modal.Body>Kosong</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
};

export default ModalCart;
