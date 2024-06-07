import React, { useState, useContext, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // replace with the actual path

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

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!username || !password) {
      alert('Please fill in all fields');
      return;
    }
    else {
      // Here you would typically send a request to your backend to authenticate the user
      // If the authentication is successful, you can set the user in the AuthContext
      const user: User = { username, password }; // replace with the actual user object returned from your backend
      setUser(user);
      navigate('/dashboard');
    }
    // handle the login logic here
  };

  return (
    <div>
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <input type="submit" value="Log in" />
      </form>
    </div>
  );
}

export default Login;