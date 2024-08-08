import { ReactNode } from 'react';
import styled, { css } from 'styled-components';

interface ContainerPropsType {
  children?: ReactNode;
  title?: string;
  fullWidth?: boolean;
  customPadding?: string;
  rightContent?: ReactNode;
}

const Container = ({ children, title, fullWidth, customPadding, rightContent }: ContainerPropsType) => {
  return (
    <StyledContainer $fullWidth={fullWidth} $customPadding={customPadding}>
      {title && (
        <TitleBox>
          <Title>{title}</Title>
          {rightContent && <RightContent>{rightContent}</RightContent>}
        </TitleBox>
      )}
      {children}
    </StyledContainer>
  );
};

export default Container;

const StyledContainer = styled.div<{ $fullWidth: boolean; $customPadding: string }>`
  ${({ theme, $fullWidth = false, $customPadding = '50px 16px 0' }) => {
    const { colors } = theme;
    return css`
      width: ${$fullWidth ? '100%' : '1024px'};
      min-height: calc(100vh - 100px);
      margin: 0 auto;
      padding: ${$customPadding};
    `;
  }}
`;
const TitleBox = styled.div`
  ${({ theme }) => {
    const { colors } = theme;
    return css`
      display: flex;
      justify-content: space-between;
      align-items: center;
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
    `;
  }}
`;

const RightContent = styled.div`
  display: flex;
  align-items: center;
`;
