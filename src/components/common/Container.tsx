import { ReactNode } from 'react';
import styled, { css } from 'styled-components';

interface ContainerPropsType {
  children?: ReactNode;
  title?: string;
  fullWidth?: boolean;
  padding?: string;
}

const Container = ({ children, title, fullWidth = false, padding }: ContainerPropsType) => {
  return (
    <StyledContainer $fullWidth={fullWidth} $padding={padding}>
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

const StyledContainer = styled.div<{ $fullWidth: boolean; $padding: string }>`
  ${({ theme, $fullWidth, $padding = '50px 16px 0' }) => {
    const { colors } = theme;
    return css`
      width: ${$fullWidth ? '100%' : '1024px'};
      min-height: calc(100vh - 100px);
      margin: 0 auto;
      padding: ${$padding};
    `;
  }}
`;

const TitleBox = styled.div`
  ${({ theme }) => {
    const { colors } = theme;
    return css`
      font-size: 32px;
      margin-bottom: 30px;
      padding-left: 16px;
    `;
  }}
`;

const Title = styled.div`
  ${({ theme }) => {
    const { colors } = theme;
    return css`
      font-size: 32px;
    `;
  }}
`;
