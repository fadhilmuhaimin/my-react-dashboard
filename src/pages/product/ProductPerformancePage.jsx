import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Pagination, message, Button } from 'antd';

import {  getProducts } from '../../services/productService';

const ProductPerformancePage = () => {
  const [products, setProducts] = useState([]);
  const [total,setTotal] = useState(0);
  const [page, setPage] = useState(1);


  const fetchData = async (pageNum) => {
    try {
      const skip = (pageNum - 1)*12;
      const limit = 12;
      const {products, total} = await getProducts({limit, skip});
      setProducts(products);
      setTotal(total);
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(()=>{
    fetchData(page);
  },[page]);

  return (
    <div style={{marginTop:40}}>
      <Row gutter={[16,16]}>
        {products.map(product=>(
          <Col xs={24} sm={12} md={6} key={product.id}>
            <Card 
              title={product.title} 
              hoverable 
             actions={
              [
                <Button type="primary" style={{width:'100%'}}>View Detail</Button>
              ]
             } 
              style={{height:'100%'}}
            >
              <div style={{
                display:'-webkit-box',
                WebkitLineClamp:3,
                WebkitBoxOrient:'vertical',
                overflow:'hidden'
              }}>
                {product.description}
              </div>
              <p><strong>Price:</strong> ${product.price}</p>
              <p><strong>Stock:</strong> {product.stock}</p>
            </Card>
          </Col>
        ))}
      </Row>
      <div style={{marginTop:'20px', textAlign:'right'}}>
        <Pagination 
          current={page} 
          total={total} 
          pageSize={12} 
          onChange={(p)=>setPage(p)} 
        />
      </div>
    </div>
  );
};

export default ProductPerformancePage;
