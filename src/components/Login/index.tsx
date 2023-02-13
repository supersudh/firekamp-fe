import { useState } from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import './Login.scss';

interface ILogin {
  onPerformLogin: (args: any) => void;
}

export default function Login({ onPerformLogin }: ILogin) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  return (
    <div className="login-container">
      <div className="login-container__inner">
        <p>Login into existing Account:</p>

        <div className="signup-inputs">
          <TextField
            required
            id="outlined-required"
            label="Required"
            placeholder="Email"
            value={email}
            onChange={evt => setEmail(evt.target.value)}
          />
          <br />
          <br />
          <br />
          <TextField
            required
            id="outlined-required"
            label="Required"
            placeholder="Password"
            type="password"
            value={password}
            onChange={evt => setPassword(evt.target.value)}
          />
          <br />
          <br />
          <Button
            variant="outlined"
            disabled={!email || !password}
            onClick={() => onPerformLogin({ email, password })}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}