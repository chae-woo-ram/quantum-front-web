'use client';

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { userState } from '@/recoil/user/atom';
import Container from '@/components/common/Container';
import Toast from '@/components/common/Toast';
import InquiryForm from '@/components/purchase-inquiry/InquiryForm';
import useToast from '@/hooks/useToast';
import { useGetRijksMuseumItem } from '@/api/openApi/openApii.query';
import { ellipsisTextStyle } from '@/styles/common';
import { styled } from 'styled-components';
import supabase from '../utils/supabase/client';

// FormData 타입 정의
interface FormData {
  name: string;
  phone: string;
  email: string;
  content: string;
}

const PurchaseInquiry = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data, refetch, isFetching } = useGetRijksMuseumItem(searchParams.get('id'));
  const { openToast, severity, messageToast, closeToast, showToast } = useToast();

  const { artObject } = data || {};
  const { webImage, longTitle, physicalMedium, subTitle } = artObject || {};

  const user = useRecoilValue(userState);

  const [formData, setFormData] = useState<FormData>({
    name: user?.user_metadata?.full_name || '',
    phone: '',
    email: user?.user_metadata?.email || '',
    content: '',
  });

  const [agree, setAgree] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleQuillChange = (value: string) => {
    setFormData({
      ...formData,
      content: value,
    });
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAgree(e.target.checked);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!isFormValid()) {
      showToast('error', '모든 필수 입력란을 작성해주세요.');
      return;
    }

    if (!agree) {
      showToast('error', '개인 정보 취급 동의에 체크해주세요.');
      return;
    }
    try {
      // 데이터 저장
      const { error } = await supabase.from('purchase_inquiry').insert([{ ...formData, user_id: user.id }]);
      if (error) throw error;

      showToast('success', '작품 구매 문의가 등록되었습니다. 답변은 1-3일 정도 소요됩니다.');
      setTimeout(() => {
        handleGotoBack();
      }, 1000);
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('데이터를 등록하는 동안 오류가 발생했습니다.');
    }
  };

  const isFormValid = () => {
    return (
      formData.name.trim() !== '' &&
      formData.phone.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.content.trim() !== ''
    );
  };

  const handleGotoBack = () => {
    router.back();
  };

  useEffect(() => {
    if (searchParams.get('id')) {
      refetch();
    }
  }, [searchParams, refetch]);

  return (
    <Container title="작품 구매 상담">
      <ProductInfo>
        <Image src={webImage?.url} alt="" />
        <TextWrapper>
          <Title>{longTitle}</Title>
          <SubTitle>
            {physicalMedium} / {subTitle}
          </SubTitle>
        </TextWrapper>
      </ProductInfo>
      <InquiryForm
        formData={formData}
        agree={agree}
        handleCheckboxChange={handleCheckboxChange}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        handleQuillChange={handleQuillChange}
        handleGotoBack={handleGotoBack}
      />
      <Toast open={openToast} severity={severity} message={messageToast} closeToast={closeToast} />
    </Container>
  );
};

export default PurchaseInquiry;

const ProductInfo = styled.div`
  display: flex;
  height: 100px;
  gap: 20px;
  align-items: center;
  margin-bottom: 40px;
  border: rgba(0, 0, 0, 0.23) 1px solid;
  border-radius: 5px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
`;

const TextWrapper = styled.div`
  width: 100%;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 600;
  ${ellipsisTextStyle}
  width: calc(100% - 150px);
`;

const SubTitle = styled.div`
  font-size: 16px;
  color: #a2abad;
  margin-top: 5px;
`;
