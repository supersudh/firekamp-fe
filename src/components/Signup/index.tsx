import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import './Signup.scss';
import { useState } from 'react';

interface ISignup {
  onPerformRegister: (args: any) => void;
}

export default function Signup({ onPerformRegister }: ISignup) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="signup-container">
      <div className="signup-container__inner">
        <p>Signup for a New Account:</p>

        <div className="signup-inputs">
          <TextField
            required
            id="outlined-required"
            label="Required"
            placeholder="Full Name"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
          />
          <br />
          <br />
          <TextField
            required
            id="outlined-required"
            label="Required"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <br />
          <br />
          <TextField
            required
            id="outlined-required"
            label="Required"
            placeholder="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <br />
          <br />
          <Button
            variant="outlined"
            onClick={() => onPerformRegister({ fullName, email, password })}
            disabled={!email || !fullName || !password}
          >
            Register New User
          </Button>
        </div>
      </div>
    </div>
  );
}