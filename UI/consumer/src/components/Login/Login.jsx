import { useEffect, useState } from 'react'
import LoginRegister from './LoginRegister';
import { useNavigate } from 'react-router-dom';

const Login = ({setIsLoggedIn}) => {
    const API_URL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const [signIn, setIsSignIn] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [phone, setPhone] = useState(0);
    const [userType, setUserType] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [street, setStreet] = useState('');
    const [apartment, setApartment] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');
    const [country, setCountry] = useState('');
    useEffect(()=>{
      if(userType === 'Admin'){
        setIsAdmin(true);
      }
      else{
        setIsAdmin(false);
      }
    }, [])
    const handleLogin = async (e) => {
        e.preventDefault();
    
        // Send a POST request to your backend for user authentication
        try {
          const response = await fetch(`${API_URL}/api/v1/users/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });
    
          if (response.ok) {
            // User is successfully logged in
            const data = await response.json();
            const token = data.token;
            const userId = data.userId;
            localStorage.setItem('jwtToken', token);
            localStorage.setItem('userId', userId);
            setIsLoggedIn(true); // Set the state to true
            navigate('/home');
          } else {
            // Handle authentication error, show a message to the user, etc.
            console.error('Authentication failed');
          }
        } catch (error) {
          console.error('An error occurred:', error);
        }
      };
    const handleSignUp = async (e) => {
      e.preventDefault();
      try{
        const response = await fetch(`${API_URL}/api/v1/users/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: userName, email, password, phone, isAdmin, street, apartment, zip, city, country }),
        });
        if(!response.ok){
          console.err("Something went wrong! Contact developer");
        }
      }
      catch(err){
        console.error(err);
      }
    }
  return (
    <LoginRegister handleLogin={handleLogin} handleSignUp={handleSignUp} setEmail={setEmail} setPassword={setPassword} setUserName={setUserName} setUserType={setUserType}
    setStreet={setStreet} setApartment={setApartment} setCity={setCity} setZip={setZip} setCountry={setCountry} setPhone={setPhone} setIsAdmin={setIsAdmin} setIsSignIn={setIsSignIn} signIn={signIn}
    />
  )
}

export default Login