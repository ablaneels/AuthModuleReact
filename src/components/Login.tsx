import React, { useState, useContext, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // replace with the actual path
import './Login.css';
interface User {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  
  const navigate = useNavigate();

  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const { setUser } = authContext;

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!username || !password) {
      alert('Please fill in all fields');
      return;
    }
    else {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: username, password }) // changed 'username' to 'name'
      });

      const data = await response.json();
      console.log(data);
      
      const user: User = { username, password }; // replace with the actual user object returned from your backend
      setUser(user);
      navigate('/dashboard');
    }
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className='mainContainer'>
      <div className='loginContainer'>
        <h2>Login Page</h2>
        <form className='' onSubmit={handleSubmit}>
          <label className='inputContainer'>
            Username:
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <label className='inputContainer'>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <input type="submit" value="Log in" />

          <button onClick={handleRegisterClick}>Register</button>
        </form>
      </div>
    </div>
  );
}

export default Login;