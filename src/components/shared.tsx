import styled from 'styled-components/native';

interface RowProps {
  align?: 'start' | 'end' | 'center';
  gap?: number;
}

export const Row = styled.View<RowProps>`
  flex-direction: row;
  align-items: ${props => props.align};
  gap: ${props => props.gap}px;
`;