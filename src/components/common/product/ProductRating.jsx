import { Table, Typography } from 'antd';
import PropTypes from 'prop-types';

const ProductRating = ({ reviews }) => {
  const columns = [
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      key: 'comment',
    },
    {
      title: 'Reviewer Name',
      dataIndex: 'reviewerName',
      key: 'reviewerName',
    },
    {
      title: 'Review Date',
      dataIndex: 'date',
      key: 'date',
      render: (text) => new Date(text).toLocaleDateString(),
    },
  ];

  return (
    <>
      <Typography.Title level={5} style={{ marginBottom: 16 }}>
        Customer Reviews
      </Typography.Title>
      <Table
        dataSource={reviews}
        columns={columns}
        rowKey="reviewerEmail"
        pagination={{ pageSize: 5 }}
      />
    </>
  );
};

// Menambahkan PropTypes untuk validasi
ProductRating.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      rating: PropTypes.number.isRequired,
      comment: PropTypes.string.isRequired,
      reviewerName: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ProductRating;
