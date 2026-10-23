
import { Link, useParams } from 'react-router-dom'

function ProductDetails({ products, cart, onAddToCart }) {
  const { id } = useParams()

  const product = products.find(
    (item) => item.id === Number(id)
  )

  if (!product) {
    return (
      <section className="form-card">
        <h2>Product Not Found</h2>
        <Link className="details-link" to="/">
          Back to Products
        </Link>
      </section>
    )
  }

  const cartItem = cart.find(
    (item) => item.id === product.id
  )

  const inCart = cartItem ? cartItem.quantity : 0
  const remainingStock = product.quantity - inCart

  return (
    <section className="details-layout">
      <div className="details-image">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="details-content">
        <Link to="/" className="back-link">
          ← Back to Products
        </Link>

        <span className="category-label">
          {product.category}
        </span>

        <h2>{product.name}</h2>

        <p className="details-price">
          ₱
          {product.price.toLocaleString('en-PH', {
            minimumFractionDigits: 2,
          })}
        </p>

        <h3>Description</h3>
        <p>{product.description}</p>

        <h3>Specifications</h3>
        <p>{product.specifications}</p>

        <p>Rating: ⭐ {product.rating} / 5</p>
        <p>Available Stock: {product.quantity}</p>
        <p>In Cart: {inCart}</p>

        {remainingStock < 5 && (
          <p className="low-stock">
            {remainingStock <= 0
              ? 'All available stock is in your cart'
              : 'Low Stock'}
          </p>
        )}

        <button
          className="primary-button"
          disabled={remainingStock <= 0}
          onClick={() => onAddToCart(product.id)}
        >
          {remainingStock <= 0
            ? 'No More Stock Available'
            : 'Add to Cart'}
        </button>

        <Link to="/" className="details-link">
          Continue Shopping
        </Link>
      </div>
    </section>
  )
}

export default ProductDetails
