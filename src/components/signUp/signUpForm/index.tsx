import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

interface SignUpFormProps {
  email: string;
  password: string;
  confirmPassword: string;
  message: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setConfirmPassword: (password: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const SignUpForm = ({
  email,
  password,
  confirmPassword,
  message,
  setEmail,
  setPassword,
  setConfirmPassword,
  handleSubmit,
}: SignUpFormProps) => {
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        maxWidth: 400,
        mx: 'auto',
        mt: 8,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" component="h2" marginBottom={'20px'}>
        회원가입
      </Typography>
      <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      <TextField
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Sign Up
      </Button>
      {message && <Typography color="error">{message}</Typography>}
    </Box>
  );
};

export default SignUpForm;
