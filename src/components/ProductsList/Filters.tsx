import styled from 'styled-components/native';
import { Row } from '../shared';
import { useMemo } from 'react';
import { FlatList } from 'react-native';
import AsyncView from '../AsyncView';
import { useGetCategoriesQuery } from '../../store/api';
import { Category } from '../../store/api/types';

const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number,
): ((...args: Parameters<T>) => void) => {
  let timeoutId: number;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

interface FiltersProps {
  onSearchChange(txt: string): void;
  onCategoryPress(category: Category): void;
  selectedCategory?: string;
}

export default function Filters({
  onSearchChange,
  onCategoryPress,
  selectedCategory,
}: FiltersProps) {
  const { isLoading, error, data } = useGetCategoriesQuery();

  const onSearchChangeDebounce = useMemo(
    () =>
      debounce((search: string) => {
        onSearchChange(search);
      }, 1000),
    [onSearchChange],
  );

  return (
    <>
      <Row align="center" gap={4}>
        <SearchInput
          onChangeText={onSearchChangeDebounce}
          placeholder="Search..."
        />
      </Row>
      <AsyncView
        isLoading={isLoading}
        error={
          error || !data
            ? error?.message ?? 'Failed to get categories'
            : undefined
        }
      >
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data}
          renderItem={({ item }) => (
            <CategoryButton
              onPress={() => onCategoryPress(item)}
              selected={selectedCategory === item}
            >
              <CategoryButtonText selected={selectedCategory === item}>
                {item}
              </CategoryButtonText>
            </CategoryButton>
          )}
        />
      </AsyncView>
    </>
  );
}

const SearchInput = styled.TextInput`
  border-width: 1px;
  flex: 1;
  padding: 4px;
  border-radius: 4px;
`;

const CategoryButton = styled.TouchableOpacity<{ selected: boolean }>`
  margin-right: 4px;
  margin-top: 4px;
  border-width: 1px;
  border-radius: 8px;
  padding: 2px 8px;
  background-color: ${props => (props.selected ? 'black' : 'white')};
`;

const CategoryButtonText = styled.Text<{ selected: boolean }>`
  color: ${props => (props.selected ? 'white' : 'black')};
`;
