import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { styled } from 'styled-components';

interface LoginFormProps {
  email: string;
  password: string;
  message: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const LoginForm = ({ email, password, message, setEmail, setPassword, handleSubmit }: LoginFormProps) => {
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        paddingBottom: 2,
      }}
    >
      <Typography variant="h5" color={'#fff'}>
        로그인
      </Typography>
      <Typography variant="h6" color={'#999'} fontWeight={400} marginBottom={'20px'}>
        이메일과 비밀번호를 입력하세요
      </Typography>
      <StyledTextField
        variant="outlined"
        placeholder="이메일"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <StyledTextField
        variant="outlined"
        placeholder="패스워드"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />

      <Button type="submit" variant="contained" fullWidth size="large">
        로그인
      </Button>
      {message && <Typography color="error">{message}</Typography>}
    </Box>
  );
};

export default LoginForm;

const StyledTextField = styled(TextField)`
  & .MuiOutlinedInput-root {
    color: #fff;

    & .MuiOutlinedInput-notchedOutline {
      border-color: #999;
    }

    &:hover .MuiOutlinedInput-notchedOutline {
      border-color: #999; /* 유지할 색상 */
    }
  }
  & .MuiInputLabel-outlined {
    color: #999;
  }
`;
