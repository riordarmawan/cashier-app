import React, { Component } from 'react'
import {Navbar, Container, Nav} from 'react-bootstrap'
import { API_URL } from '../utils/constants'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils, faCoffee, faCheese } from '@fortawesome/free-solid-svg-icons'

const Icons = ({myIcon}) => {
  if(myIcon === "Makanan") return <FontAwesomeIcon icon={faUtensils} className="mr-2" />
  if(myIcon === "Minuman") return <FontAwesomeIcon icon={faCoffee} className="mr-2" />
  if(myIcon === "Cemilan") return <FontAwesomeIcon icon={faCheese} className="mr-2" />

  return <FontAwesomeIcon icon={faUtensils} className="mr-2" />
}

export default class NavbarComponent extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       categories: [],
    }
  }

  componentDidMount() {
    axios.get(API_URL+"categories")
      .then(res => {
        // console.log("Response : ", res);
        const categories = res.data;
        this.setState({ categories });
      }) 
      //Jika gagal
      .catch(error => {
        console.log("PAGE NOT FOUND " , error);
      })
  }

  render() {
    // console.log("Categories : ", this.state.categories)
    const {categories} = this.state
    const { changeMenu, menuDipilih } = this.props
    return (
      <Navbar expand="lg" className="fixed-top">
      <Container>
        <Navbar.Brand href="#home" className='nav-brand'><strong>Warung Makan</strong></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* jika categories ada isinya maka mapping categories-nya */}
          {categories && categories.map((category) => ( 
            <Nav className='nav-link' key={category.id}>
                <Nav.Link href="#link" className={menuDipilih === category.nama && "nav-active"} 
                onClick={() => changeMenu(category.nama)}> 
                <Icons icon={category.myIcon} /> {category.nama} 
                </Nav.Link>
            </Nav>
          ))}
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )
  }
}
