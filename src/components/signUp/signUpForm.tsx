import React from 'react';
import { Box, Button, TextField, Typography, styled } from '@mui/material';

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
        alignItems: 'left',
        gap: 2,
        paddingBottom: 2,
      }}
    >
      <Typography variant="h5" component="h2" marginBottom={'20px'} color={'#fff'}>
        회원가입
      </Typography>
      <StyledTextField label="이메일" type="email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
      <StyledTextField
        label="비밀번호"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      <StyledTextField
        label="비밀번호 확인"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        fullWidth
      />
      {message && <Typography color="error">{message}</Typography>}
      <Button type="submit" variant="contained" fullWidth size="large">
        회원가입
      </Button>
    </Box>
  );
};

export default SignUpForm;

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

const StyledButton = styled(Button)`
  &.MuiButtonBase-root.MuiButton-root {
  }
`;
