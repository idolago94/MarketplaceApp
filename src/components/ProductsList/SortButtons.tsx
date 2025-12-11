import { memo, useCallback, useEffect, useState } from 'react';
import { SortOption } from '../../store/api/types';
import styled from 'styled-components/native';
import { FlatList, ListRenderItem } from 'react-native';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

type SortButtonPressValue = SortOption | [SortOption, SortOption];
type SortOptionButton = [string, SortButtonPressValue];

const allSortOptions: SortOptionButton[] = [
  ['Price', ['price-asc', 'price-desc']],
  ['Rating', ['rating-asc', 'rating-desc']],
  ['Name', ['name-asc', 'name-desc']],
];

interface SortButtonsProps {
  defaultValue?: SortOption;
  onChange(sort: SortOption): void;
}

export default memo(function SortButtons({
  defaultValue = 'newest',
  onChange,
}: SortButtonsProps) {
  const [sortValue, setSortValue] = useState<SortOption>(defaultValue);

  useEffect(() => {
    onChange(sortValue);
  }, [sortValue, onChange]);

  const onButtonPress = useCallback((value: SortButtonPressValue) => {
    if (typeof value === 'string') {
      setSortValue(value);
    } else {
      setSortValue(prev => {
        const index = value.indexOf(prev);
        if (index === -1) return value[0];
        if (index === 0) return value[1];
        else return defaultValue;
      });
    }
  }, [defaultValue]);

  const renderButton: ListRenderItem<SortOptionButton> = useCallback(
    ({ item }) => (
      <SortButton
        title={item[0]}
        onPress={onButtonPress}
        options={item[1]}
        currentValue={sortValue}
      />
    ),
    [onButtonPress, sortValue],
  );

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={allSortOptions}
      renderItem={renderButton}
    />
  );
});

const ButtonWrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: 6px;
  margin-horizontal: 8px;
`;

const Label = styled.Text<{ selected?: boolean }>`
  font-size: 15px;
  color: ${props => (props.selected ? 'black' : 'gray')};
`;

interface SortButtonProps {
  title: string;
  onPress?(value: SortButtonPressValue): void;
  options: SortButtonPressValue;
  currentValue: SortOption;
}

export const SortButton = ({
  title,
  onPress,
  options,
  currentValue,
}: SortButtonProps) => {
  return (
    <ButtonWrapper onPress={() => onPress?.(options)}>
      <Label selected={options.includes(currentValue)}>{title}</Label>
      {typeof options !== 'string' && (
        <>
          <FontAwesome6
            name="arrow-up"
            iconStyle="solid"
            color={currentValue === options[0] ? 'black' : 'gray'}
          />
          <FontAwesome6
            name="arrow-down"
            iconStyle="solid"
            color={currentValue === options[1] ? 'black' : 'gray'}
          />
        </>
      )}
    </ButtonWrapper>
  );
};
