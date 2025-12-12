import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { Row } from '../shared';
import { Text } from 'react-native';
import { useEffect, useRef, useState } from 'react';

interface QuantityModifier {
  initialValue?: number;
  onChange?(quantity: number): void;
  min?: number;
  max?: number;
}

export default function QuantityModifier({
  initialValue = 1,
  onChange,
  min,
  max,
}: QuantityModifier) {
  const isFirstRender = useRef(true);
  const [value, setValue] = useState<number>(initialValue);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    onChange?.(value);
  }, [value, onChange]);

  return (
    <Row align="center" gap={8}>
      <FontAwesome6
        name="minus"
        iconStyle="solid"
        onPress={() =>
          setValue(val => {
            const newValue = val - 1;
            if (!min || min <= newValue) return newValue;
            else return val;
          })
        }
      />
      <Text>{value}</Text>
      <FontAwesome6
        name="plus"
        iconStyle="solid"
        onPress={() =>
          setValue(val => {
            const newValue = val + 1;
            if (!max || max >= newValue) return newValue;
            else return val;
          })
        }
      />
    </Row>
  );
}
