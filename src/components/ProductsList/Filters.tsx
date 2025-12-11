import styled from 'styled-components/native';
import { Row } from '../shared';
import { useMemo } from 'react';
import { Button, FlatList } from 'react-native';
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
        error={error || !data ? 'Failed to get categories' : undefined}
      >
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data}
          renderItem={({ item }) => (
            <Button
              title={item}
              onPress={() => onCategoryPress(item)}
              color={selectedCategory === item ? 'blue' : 'black'}
            />
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