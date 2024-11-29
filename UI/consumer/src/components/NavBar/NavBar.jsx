import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Button, Container, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import loginContext from '../Context/LoginContext';



const NavBar = () => {
    // const isLoggedIn = props.isLoggedIn;
    const {isLoggedIn, setIsLoggedIn} = useContext(loginContext);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

  return (
    <div className='w-full bg-body-tertiary fixed z-50'>
        <div className='flex justify-center'>
            <div className='w-full'>
                <Navbar className="">
                <Container fluid className={`w-full ${window.innerWidth<=640?'flex flex-col col-span-2':''}`}>
                    <Navbar.Brand href="#" as={Link} to="/">V-Shop</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0 w-full"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link href="#action1" as={Link} to="/">Home</Nav.Link>
                        <NavDropdown title="Address" id="navbarScrollingDropdown">
                        <NavDropdown.Item href="#action3">Address1</NavDropdown.Item>
                        <NavDropdown.Item href="#action4">Address2</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action5">
                            Add new Address
                        </NavDropdown.Item>
                        </NavDropdown>
                        <Form className="d-flex w-full" onSubmit={(e)=>{
                            e.preventDefault();
                            const query = e.target.elements.searchInput.value; 
                            navigate(`/products?minPrice=0&maxPrice=200000&search=${query}`);
                            }}
                        >
                            <Form.Control
                            id='searchInput'
                            type="search"
                            placeholder="Search"
                            className="me-2 w-4/5"
                            aria-label="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Button variant="outline-success" type='submit'>Search</Button>
                        </Form>
                    </Nav>
                    <Nav className='flex'>
                        <div className='flex items-center'>
                        <Link as={Link} to="/">
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
                        </Link>
                        {
                            isLoggedIn ?  (
                                <NavDropdown title="Account">
                                    <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                                    {/* <NavDropdown.Item as={Link}>My Orders</NavDropdown.Item> */}
                                    <NavDropdown.Item onClick={()=>{
                                            setIsLoggedIn(false);
                                            localStorage.removeItem('consumerEmail');
                                            localStorage.removeItem('consumerId');
                                            localStorage.removeItem('consumerName');
                                            localStorage.removeItem('consumerPhoto');
                                            localStorage.removeItem('googleId');

                                            navigate('/home');
                                            // window.location.reload();
                                        }
                                    }>Logout</NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            )
                        }
                        </div>
                        {
                            isLoggedIn ? (
                                <div className='flex'>
                                    <div className='flex items-center ml-4'>
                                        <Link as={Link} to="/cart">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>
                                            </Link>
                                        <Nav.Link as={Link} to="/cart">Cart</Nav.Link>
                                     </div>
                                    <div className='flex items-center ml-4'>
                                        <Link as={Link} to="/cart">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>
                                            </Link>
                                        <Nav.Link as={Link} to="/orders">Orders</Nav.Link>
                                     </div>
                                </div>
                            ) : (
                                <div className='w-0'> </div>
                            )
                        }
                    </Nav>
                    </Navbar.Collapse>
                </Container>
                </Navbar>
            </div>
        </div>
    </div>
  )
}

export default NavBar;