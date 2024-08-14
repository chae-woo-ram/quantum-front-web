import Lottie from 'react-lottie-player';
import loadingJson from 'public/json/loading.json';
import styled from 'styled-components';

/**
 * Loading 컴포넌트는 로딩 애니메이션을 보여주는 역할을 합니다.
 * Lottie 애니메이션 라이브러리를 사용하여 JSON 데이터를 렌더링합니다.
 */
const Loading = () => {
  return (
    <Container>
      <StyledLottie loop animationData={loadingJson} play />
    </Container>
  );
};

export default Loading;

const StyledLottie = styled(Lottie)`
  width: 150px;
  height: 150px;
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
