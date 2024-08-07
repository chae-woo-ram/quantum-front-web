'use client';

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import styled from 'styled-components';

const BookCard = ({ img1, img2, name, year }) => {
  return (
    <CardContentWrapper>
      <CardWrapper>
        <Card sx={{ overflow: 'visible', boxShadow: 'none', backgroundColor: '#e5effc' }}>
          <CardMedia
            component="img"
            image={img1}
            sx={{
              width: 150,
              height: 200,
              borderRadius: '0 20px 20px 0',
              boxShadow: '0 20px 30px rgba(0, 0, 0, 0.5), 0 10px 20px rgba(0, 0, 0, 0.3)',
              display: 'block',
            }}
            className="img1"
          />
          <CardMedia
            component="img"
            image={img2}
            sx={{
              width: 150,
              height: 200,
              borderRadius: '0 20px 20px 0',
              boxShadow: '0 20px 30px rgba(0, 0, 0, 0.5), 0 10px 20px rgba(0, 0, 0, 0.3)',
              display: 'none',
            }}
            className="img2"
          />
        </Card>
      </CardWrapper>

      <TextWrapper>
        <p>{name}</p>
        <p>{year}</p>
      </TextWrapper>
    </CardContentWrapper>
  );
};

export default BookCard;

const CardWrapper = styled.div`
  background-color: #e5effc;
  border-radius: 10px;
  width: 250px;
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  &:hover {
    .img1 {
      display: none;
    }

    .img2 {
      display: block;
      width: 220px;
      height: 150px;
      border-radius: 0px;
    }
  }
`;

const CardContentWrapper = styled.div`
  padding: 20px;
  height: 380px;
  border-radius: 10px;
  background-color: white;
`;

const TextWrapper = styled.div`
  margin-top: 20px;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  p:nth-child(1) {
    line-height: 1.2;
  }

  p:nth-child(2) {
    font-size: 15px;
    color: darkgray;
  }
`;
