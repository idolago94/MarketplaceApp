import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import styled from 'styled-components/native';
import { Alert, Button } from 'react-native';
import { Row } from '../components/shared';
import QuantityModifier from '../components/QuantityModifier';
import { useRef } from 'react';
import { useAddToCartMutation } from '../store/api';

type Props = NativeStackScreenProps<RootStackParamList, 'Product'>;

const INITIAL_AMOUNT = 1;

export default function ProductScreen({ route }: Props) {
  const {
    id,
    name,
    description,
    image,
    price,
    category,
    rating,
    stock,
    brand,
  } = route.params;

  const [addToCart] = useAddToCartMutation();

  const amount = useRef<number>(1);

  return (
    <Container>
      <ScrollView>
        <ProductImage source={{ uri: image }} resizeMode="contain" />
        <DetailsContainer>
          <ProductName>{name}</ProductName>
          <ProductBrand>{brand}</ProductBrand>
          <ProductDescription>{description}</ProductDescription>
          <HintsContainer>
            <ProductHint>Category: {category}</ProductHint>
            <ProductHint>Rating: {rating}</ProductHint>
            <ProductHint>Stock: {stock}</ProductHint>
          </HintsContainer>
        </DetailsContainer>
      </ScrollView>
      <DetailsContainer>
        <Row justify="space-between">
          <QuantityModifier
            initialValue={INITIAL_AMOUNT}
            onChange={val => (amount.current = val)}
            min={1}
            max={stock}
          />
          <ProductPrice>Price: {price}</ProductPrice>
        </Row>
        <Button
          title="add to cart"
          onPress={() => {
            addToCart({ id, quantity: amount.current })
              .unwrap()
              .catch(err =>
                Alert.alert(err.message ?? 'Failed to add this product'),
              );
          }}
        />
      </DetailsContainer>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
`;

const ScrollView = styled.ScrollView`
  flex: 1;
`;

const ProductImage = styled.Image`
  width: 100%;
  aspect-ratio: 1;
`;

const DetailsContainer = styled.View`
  padding: 8px;
`;

const ProductName = styled.Text`
  font-weight: 500;
  font-size: 22px;
  margin-top: 8px;
`;

const ProductDescription = styled.Text`
  margin-top: 4px;
  font-size: 16px;
`;

const ProductHint = styled.Text`
  font-size: 14px;
`;

const ProductBrand = styled(ProductHint)`
  color: gray;
`;

const HintsContainer = styled.View`
  margin: 8px;
`;

const ProductPrice = styled.Text`
  text-align: right;
  margin-top: 2px;
  font-weight: bold;
  font-size: 16px;
`;
