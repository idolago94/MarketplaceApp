import styled from 'styled-components/native';

interface RowProps {
  align?: 'start' | 'end' | 'center';
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly';
  gap?: number;
}

export const Row = styled.View<RowProps>`
  flex-direction: row;
  align-items: ${props => props.align};
  justify-content: ${props => props.justify};
  gap: ${props => props.gap}px;
`;
