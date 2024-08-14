import { Fragment } from 'react';
import { ellipsisTextStyle } from '@/styles/common';
import { Button } from '@mui/material';
import styled from 'styled-components';

const FavoritesList = ({ favorites, onNavigate }) => {
  return (
    <List>
      {favorites.map(({ objectNumber, webImageUrl, longTitle, subTitle, physicalMedium }, index) => (
        <Fragment key={index}>
          <ProductInfo onClick={() => onNavigate(objectNumber)}>
            <Image src={webImageUrl} alt="" />
            <Section>
              <TextWrapper>
                <Title>{longTitle}</Title>
                <SubTitle>
                  {physicalMedium} / {subTitle}
                </SubTitle>
              </TextWrapper>
              <Button variant="outlined" color="error">
                삭제
              </Button>
            </Section>
          </ProductInfo>
        </Fragment>
      ))}
    </List>
  );
};

export default FavoritesList;

const List = styled.ul`
  width: 100%;
  padding-top: 50px;
`;

const ProductInfo = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  gap: 20px;
  align-items: center;
  margin-bottom: 10px;
  border: rgba(0, 0, 0, 0.23) 1px solid;
  border-radius: 5px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
`;

const Section = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 150px);
`;

const TextWrapper = styled.div`
  width: 80%;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 600;
  ${ellipsisTextStyle}
`;

const SubTitle = styled.div`
  font-size: 16px;
  color: #a2abad;
  margin-top: 5px;
`;
