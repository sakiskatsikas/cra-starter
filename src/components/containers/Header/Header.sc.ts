import styled from '@emotion/styled/macro';

export const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    height: 20vmin;
    pointer-events: none;
  }

  @media (prefers-reduced-motion: no-preference) {
    img {
      animation: logo-spin infinite 20s linear;
    }
  }

  @keyframes logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
