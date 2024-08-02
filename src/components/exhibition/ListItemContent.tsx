import { useState } from 'react';
import Image from 'next/image';
import { Box, Divider, Typography } from '@mui/material';
import styled from 'styled-components';

const ListItemContent = ({ item }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ListItem key={item.id}>
      <Content>
        <Typography variant="h6" color={'#555'}>
          {item.venues[0].name}
        </Typography>
        <Typography variant="h5" gutterBottom fontWeight={600}>
          {item.title}
        </Typography>
        <Box display="inline-flex" alignItems="center" justifyContent="center" gap={1}>
          <Typography variant="body2" color={'#888'}>
            {item.venues[0].city}
          </Typography>
          <Divider orientation="vertical" flexItem />
          <Typography variant="body2" color={'#888'}>
            {item.venues[0].address1}
          </Typography>
        </Box>
      </Content>
      <ImageContainer>
        {item.primaryimageurl && (
          <Image src={item.primaryimageurl} alt={item.title} layout="intrinsic" width={380} height={380} />
        )}
      </ImageContainer>
    </ListItem>
  );
};

export default ListItemContent;

const ListItem = styled.li`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 0;
  border-bottom: 1px solid #ededed;
`;

const Content = styled.div`
  width: 100%;
`;

const ImageContainer = styled.div``;
