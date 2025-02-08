import React, { useState, useEffect } from 'react';
import { Container, Navbar, Button, Card, Row, Col, Modal, Form, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [products, setProducts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    image: '',
    price: ''
  });
  const [editProduct, setEditProduct] = useState({
    _id: '',
    name: '',
    image: '',
    price: ''
  });
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    fetch('/api/products')
      .then(response => response.json())
      .then(data => data.success && setProducts(data.data))
      .catch(error => console.error('Error fetching products:', error));
  };

  const handleNewProduct = () => setShowAddModal(true);

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setNewProduct({ name: '', image: '', price: '' });
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditProduct({ _id: '', name: '', image: '', price: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditProduct({
      ...editProduct,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct)
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        setProducts([...products, data.data]);
        handleCloseAddModal();
      }
    })
    .catch(error => console.error('Error adding product:', error));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    
    fetch(`/api/products/${editProduct._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editProduct)
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        setProducts(products.map(product => 
          product._id === editProduct._id ? data.data : product
        ));
        handleCloseEditModal();
      }
    })
    .catch(error => console.error('Error updating product:', error));
  };

  const handleDeleteClick = (id) => {
    setDeleteProductId(id);
  };

  const confirmDelete = () => {
    fetch(`/api/products/${deleteProductId}`, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        setProducts(products.filter(product => product._id !== deleteProductId));
        setDeleteProductId(null);
      } else {
        setError('Failed to delete product');
      }
    })
    .catch(error => {
      console.error('Error deleting product:', error);
      setError('Error deleting product');
    })
    .finally(() => {
      setTimeout(() => setError(null), 3000);
    });
  };

  const cancelDelete = () => {
    setDeleteProductId(null);
  };

  const handleEditClick = (product) => {
    setEditProduct(product);
    setShowEditModal(true);
  };

  return (
    <>
      <Navbar bg="light" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand>placeholder</Navbar.Brand>
          <Button variant="primary" onClick={handleNewProduct}>
            New Product
          </Button>
        </Container>
      </Navbar>

      <Container>
        {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}
        
        <Row xs={1} md={2} lg={3} xl={4} className="g-4">
          {products.map((product) => (
            <Col key={product._id}>
              <Card className="h-100">
                <Card.Img
                  variant="top"
                  src={product.image}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>${parseFloat(product.price).toFixed(2)}</Card.Text>
                  <div className="d-flex gap-2">
                    <Button 
                      variant="warning" 
                      size="sm"
                      onClick={() => handleEditClick(product)}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="danger" 
                      size="sm"
                      onClick={() => handleDeleteClick(product._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Add Product Modal */}
      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newProduct.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="url"
                name="image"
                value={newProduct.image}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                min="0"
                name="price"
                value={newProduct.price}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseAddModal}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Add Product
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Edit Product Modal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleEditSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={editProduct.name}
                onChange={handleEditChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="url"
                name="image"
                value={editProduct.image}
                onChange={handleEditChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                min="0"
                name="price"
                value={editProduct.price}
                onChange={handleEditChange}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEditModal}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={!!deleteProductId} onHide={cancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this product? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default App;