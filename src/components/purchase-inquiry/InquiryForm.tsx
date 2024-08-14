'use client';

import { ChangeEvent, FormEvent } from 'react';
import dynamic from 'next/dynamic';
import { pretendard } from '@/styles/localFonts.fonts';
import { Box, Button, Checkbox, Divider, FormControlLabel, TextField, Typography } from '@mui/material';
import { styled } from 'styled-components';

// 동적 로딩을 사용하여 서버 사이드 렌더링 비활성화
const DynamicReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const modules = {
  toolbar: {
    container: [['image'], [{ header: [1, 2, 3, 4, 5, false] }], ['bold', 'underline']],
  },
};

interface InquiryFormProps {
  formData: { name: string; phone: string; email: string; content: string };
  agree: boolean;
  handleCheckboxChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent) => void;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleQuillChange: (value: string) => void;
  handleGotoBack: () => void;
}

const InquiryForm = ({
  formData,
  agree,
  handleCheckboxChange,
  handleSubmit,
  handleInputChange,
  handleQuillChange,
  handleGotoBack,
}: InquiryFormProps) => {
  return (
    <StyledForm component="form" onSubmit={handleSubmit}>
      <TextField label="이름" name="name" value={formData.name} onChange={handleInputChange} fullWidth />
      <TextField label="휴대폰 번호" name="phone" value={formData.phone} onChange={handleInputChange} fullWidth />
      <TextField label="이메일" name="email" value={formData.email} onChange={handleInputChange} fullWidth />
      <Divider />
      {/* 문의 내용 입력  */}
      <StyledReactQuill value={formData.content} onChange={handleQuillChange} placeholder="" modules={modules} />
      {/* 개인정보동의 체크박스 */}
      <FormControlLabel
        control={<Checkbox checked={agree} onChange={handleCheckboxChange} />}
        label={
          <Typography variant="body2">
            개인 정보 취급 동의합니다.
            <br />
            입력하신 이름, 휴대폰 번호, 이메일 등은 문의 내용 처리를 위해 사용됩니다.
          </Typography>
        }
      />
      <ButtonGroup>
        <Button variant="contained" color="secondary" onClick={handleGotoBack}>
          뒤로가기
        </Button>
        <Button type="submit" variant="contained" color="primary">
          문의하기
        </Button>
      </ButtonGroup>
    </StyledForm>
  );
};

export default InquiryForm;

const StyledForm = styled(Box)`
  display: flex;
  gap: 10px;
  flex-direction: column;
  padding-bottom: 40px;
`;

const StyledReactQuill = styled(DynamicReactQuill)(({ theme }) => ({
  height: '300px',
  marginBottom: '50px',
  '&& .ql-container': {
    fontFamily: pretendard.style.fontFamily,
    fontSize: 16,
  },
}));

const SubTitle = styled.div`
  font-size: 16px;
  color: #a2abad;
  margin-top: 5px;
`;

const ButtonGroup = styled.div`
  display: inline-flex;
  justify-content: flex-end;
  gap: 10px;
`;
