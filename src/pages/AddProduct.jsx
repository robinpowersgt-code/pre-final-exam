
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function AddProduct({ onAddProduct }) {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    image: '',
    description: '',
    specifications: '',
    rating: '',
    price: '',
    quantity: '',
  })

  const [error, setError] = useState('')

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (Object.values(formData).some((value) => !String(value).trim())) {
      setError('Please complete all fields.')
      return
    }

    const price = Number(formData.price)
    const quantity = Number(formData.quantity)
    const rating = Number(formData.rating)

    if (!Number.isFinite(price) || price <= 0) {
      setError('Price must be greater than zero.')
      return
    }

    if (!Number.isInteger(quantity) || quantity < 0) {
      setError('Quantity must be a whole number of zero or more.')
      return
    }

    if (!Number.isFinite(rating) || rating < 0 || rating > 5) {
      setError('Rating must be between 0 and 5.')
      return
    }

    try {
      new URL(formData.image)
    } catch {
      setError('Enter a valid image URL beginning with https://.')
      return
    }

    onAddProduct({
      ...formData,
      price,
      quantity,
      rating,
    })

    navigate('/')
  }

  return (
    <section className="form-card">
      <Link to="/" className="back-link">
        ← Back to Products
      </Link>

      <h2>Add New Product</h2>
      <p>Complete all fields to add a product to your inventory.</p>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="name">Product Name</label>
            <input id="name" name="name" value={formData.name}
              onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input id="category" name="category" value={formData.category}
              onChange={handleChange} placeholder="Electronics"
              required />
          </div>

          <div className="form-group full-width">
            <label htmlFor="image">Image URL</label>
            <input id="image" name="image" type="url"
              value={formData.image} onChange={handleChange}
              placeholder="https://example.com/product.jpg" required />
          </div>

          <div className="form-group full-width">
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description"
              value={formData.description} onChange={handleChange}
              rows="3" required />
          </div>

          <div className="form-group full-width">
            <label htmlFor="specifications">Specifications</label>
            <textarea id="specifications" name="specifications"
              value={formData.specifications} onChange={handleChange}
              rows="3" required />
          </div>

          <div className="form-group">
            <label htmlFor="rating">Rating (0–5)</label>
            <input id="rating" name="rating" type="number"
              min="0" max="5" step="0.1"
              value={formData.rating} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="price">Price (₱)</label>
            <input id="price" name="price" type="number"
              min="0.01" step="0.01"
              value={formData.price} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="quantity">Available Quantity</label>
            <input id="quantity" name="quantity" type="number"
              min="0" step="1"
              value={formData.quantity} onChange={handleChange} required />
          </div>
        </div>

        {error && <p className="error-message">{error}</p>}

        <div className="form-actions">
          <button type="submit" className="primary-button">
            Save Product
          </button>
          <Link to="/" className="cancel-link">Cancel</Link>
        </div>
      </form>
    </section>
  )
}

export default AddProduct

