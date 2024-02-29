import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import { darken, lighten } from 'polished';

const colorStyles = css`
  ${({ theme, color }) => {
    const selected = theme.palette[color];
    return css`
      background: ${selected};
      &:hover {
        background: ${lighten(0.1, selected)};
      }
      &:active {
        background: ${darken(0.1, selected)};
      }
      ${(props) =>
        props.$outline &&
        css`
          color: ${selected};
          background: none;
          border: 1px solid ${selected};
          &:hover {
            background: ${selected};
            color: white;
          }
        `}
    `;
  }}
`;

const sizes = {
  large: {
    height: '3rem',
    fontSize: '1.25rem',
  },
  medium: {
    height: '2.25rem',
    fontSize: '1rem',
  },
  small: {
    height: '1.75rem',
    fontSize: '0.875rem',
  },
};

const sizeStyles = css`
  ${({ size }) => css`
    height: ${sizes[size].height};
    font-size: ${sizes[size].fontSize};
  `}
`;

const fullWidthStyles = css`
  ${(props) =>
    props.$fullWidth &&
    css`
      width: 100%;
      justify-content: center;

      /* 하지만 얘는 옆은 띄울 필요 없고 */
      /* 위를 1rem 띄워야지 */
      &:not(:first-child) {
        margin-left: 0;
        margin-top: 1rem;
      }
    `}
`;

const StyledButton = styled.button`
  /* 공통 스타일 */

  display: inline-flex;
  outline: none;
  border: none;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;
  align-items: center;

  /* 색상 */
  ${colorStyles}

  /* 사이즈 */
  ${sizeStyles}

  
  /* 기타 */
  /* 원래 이거 였음 */
  /* 근데 이거는 연속된 애들한테 다 넣어주겠다는 거임 */
  /* & + & {
    margin-left: 1rem;
  } */

  /* 그래서 이걸로 바꿈 */
  /* 첫번째 자식이 아닌 두번째 자식부터는 1rem띄워! */
  &:not(:first-child) {
    margin-left: 1rem;
  }

  /* 풀사이즈 */
  ${fullWidthStyles}
`;

function Button({ children, color, size, outline, fullWidth, ...rest }) {
  useEffect(() => {
    console.log('Button 렌더링!!!');
  });
  return (
    <StyledButton
      color={color}
      size={size}
      $outline={outline}
      $fullWidth={fullWidth}
      {...rest}
    >
      {children}
    </StyledButton>
  );
}

Button.defaultProps = {
  color: 'blue',
  size: 'medium',
};

export default Button;
