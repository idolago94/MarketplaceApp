import { Product } from '../store/api/types';
import styled from 'styled-components/native';
import { Row } from './shared';

const ProductContainer = styled.View`
  border-bottom-width: 1px;
  border-color: lightgray;
  padding: 8px;
  margin-horizontal: 8px;
`;

const ProductImage = styled.Image`
  width: 25%;
  aspect-ratio: 1;
  border-radius: 8px;
`;

const ProductDetails = styled.View`
  padding-left: 8px;
  flex: 1;
`;

const ProductName = styled.Text`
  font-weight: 400;
  font-size: 18px;
`;

const ProductDescription = styled.Text``;

const ProductHint = styled.Text`
  font-size: 10px;
`;

const ProductStock = styled(ProductHint)`
  flex: 1;
  text-align: right;
`;

const ProductCategoryChip = styled(ProductHint)`
  background-color: black;
  color: white;
  padding: 2px 6px;
  border-radius: 8px;
`;

const ProductRating = styled(ProductHint)`
  color: #ebd234;
`;

const ProductBrand = styled(ProductHint)`
  color: gray;
`;

const ProductHeader = styled.View`
  margin-bottom: 4px;
`;

const ProductPrice = styled.Text`
  text-align: right;
  margin-top: 2px;
`;

export default function ProductCard({
  name,
  image,
  description,
  category,
  rating,
  stock,
  brand,
  price,
}: Product) {
  return (
    <ProductContainer>
      <Row>
        <ProductImage source={{ uri: image }} />
        <ProductDetails>
          <Row align="center" gap={4}>
            <ProductCategoryChip>{category}</ProductCategoryChip>
            <ProductRating>{rating}</ProductRating>
            <ProductStock>x{stock}</ProductStock>
          </Row>
          <ProductHeader>
            <ProductName>{name}</ProductName>
            <ProductBrand>{brand}</ProductBrand>
          </ProductHeader>
          <ProductDescription>{description}</ProductDescription>
          <ProductPrice>{price}$</ProductPrice>
        </ProductDetails>
      </Row>
    </ProductContainer>
  );
}
