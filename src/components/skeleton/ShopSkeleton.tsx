import { Grid, Skeleton } from '@mui/material';
import styled from 'styled-components';

const ShopSkeleton = () => {
  return (
    <>
      {Array.from(new Array(12)).map((_, index) => (
        <Grid item xs={12} sm={6} key={index}>
          <Content>
            <Skeleton variant="text" width={200} height={40} />
            <Skeleton variant="text" width={120} height={30} />
          </Content>
          <Skeleton variant="rectangular" width={'100%'} height={250} />
        </Grid>
      ))}
    </>
  );
};

export default ShopSkeleton;

const Content = styled.div`
  width: 100%;
  margin-bottom: 10px;
`;
