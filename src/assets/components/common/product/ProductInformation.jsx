
import { Card, Descriptions, Tag, Image } from 'antd';
import PropTypes from 'prop-types';

const ProductInformation = ({ product }) => {
  return (
    <Card>
      <Image.PreviewGroup>
        {product.images.map((img, index) => (
          <Image
            key={index}
            src={img}
            alt={product.title}
            width="100%"
            style={{ marginBottom: 10, height: 180, objectFit: 'contain' }}
          />
        ))}
      </Image.PreviewGroup>

      <Descriptions title="Product Information" bordered column={1} style={{ marginTop: 20 }}>
        <Descriptions.Item label="Title">{product.title}</Descriptions.Item>
        <Descriptions.Item label="Description">{product.description}</Descriptions.Item>
        <Descriptions.Item label="Category">{product.category}</Descriptions.Item>
        <Descriptions.Item label="Price">${product.price}</Descriptions.Item>
        <Descriptions.Item label="Discount">{product.discountPercentage}%</Descriptions.Item>
        <Descriptions.Item label="Rating">{product.rating}</Descriptions.Item>
        <Descriptions.Item label="Stock">{product.stock}</Descriptions.Item>
        <Descriptions.Item label="Tags">
          {product.tags.map((tag) => (
            <Tag color="blue" key={tag}>
              {tag}
            </Tag>
          ))}
        </Descriptions.Item>
        <Descriptions.Item label="Brand">{product.brand}</Descriptions.Item>
        <Descriptions.Item label="SKU">{product.sku}</Descriptions.Item>
        <Descriptions.Item label="Weight">{product.weight} kg</Descriptions.Item>
        <Descriptions.Item label="Dimensions">
          {product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth} cm
        </Descriptions.Item>
        <Descriptions.Item label="Warranty">{product.warrantyInformation}</Descriptions.Item>
        <Descriptions.Item label="Shipping Info">{product.shippingInformation}</Descriptions.Item>
        <Descriptions.Item label="Availability">{product.availabilityStatus}</Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

// Tambahkan validasi props
ProductInformation.propTypes = {
  product: PropTypes.shape({
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    discountPercentage: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    brand: PropTypes.string.isRequired,
    sku: PropTypes.string.isRequired,
    weight: PropTypes.number.isRequired,
    dimensions: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      depth: PropTypes.number.isRequired,
    }).isRequired,
    warrantyInformation: PropTypes.string.isRequired,
    shippingInformation: PropTypes.string.isRequired,
    availabilityStatus: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductInformation;
