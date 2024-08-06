import { ReactNode } from 'react';
import styled, { css } from 'styled-components';

interface ContainerPropsType {
  children?: ReactNode;
  title?: string;
  fullWidth?: boolean;
}

const Container = ({ children, title, fullWidth = false }: ContainerPropsType) => {
  return (
    <StyledContainer $fullWidth={fullWidth}>
      {title && (
        <TitleBox>
          {/* <Divider textAlign="center"> */}
          <Title>{title}</Title>
          {/* </Divider> */}
        </TitleBox>
      )}
      {children}
    </StyledContainer>
  );
};

export default Container;

const StyledContainer = styled.div<{ $fullWidth: boolean }>`
  ${({ theme, $fullWidth }) => {
    const { colors } = theme;
    return css`
      width: ${$fullWidth ? '100%' : '1024px'};
      min-height: calc(100vh - 100px);
      margin: 0 auto;
      padding: 50px 16px 0; /* 좌우 여백을 추가할 수 있습니다 */
    `;
  }}
`;

const TitleBox = styled.div`
  ${({ theme }) => {
    const { colors } = theme;
    return css`
      font-size: 32px;
      margin-bottom: 30px;
    `;
  }}
`;

const Title = styled.div`
  ${({ theme }) => {
    const { colors } = theme;
    return css`
      font-size: 32px;
      /* margin-bottom: 2rem; */
    `;
  }}
`;
