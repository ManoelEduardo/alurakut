import styled from 'styled-components';
import Box from '../Box';

export const BoxRepository = styled(Box)`
  text-align: center;

  ul {
    display: inline-block;
    list-style: none;
  }
  ul li a {
    display: inline-block;
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    text-decoration: none;
    span {
      font-size: 16px;
      left: 0;
      bottom: 10px;
      z-index: 2;
      padding: 0 4px;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 100%;

    }
  }
`;