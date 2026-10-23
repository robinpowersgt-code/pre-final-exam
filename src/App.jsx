
import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import ProductDetails from './pages/ProductDetails'
import AddProduct from './pages/AddProduct'
import './App.css'

const initialProducts = [
  {
    id: 1,
    name: 'Headphones',
    category: 'Electronics',
    price: 1500,
    quantity: 3,
    image: 'https://placehold.co/600x400?text=Headphones',
    description: 'Enjoy clear sound for music, games, and online classes.',
    specifications: 'Wireless connection, built-in microphone, rechargeable battery',
    rating: 4.5,
  },
  {
    id: 2,
    name: 'Keyboard',
    category: 'Electronics',
    price: 850,
    quantity: 2,
    image: 'https://placehold.co/600x400?text=Keyboard',
    description: 'A comfortable keyboard for typing, studying, and gaming.',
    specifications: 'USB connection, full-size layout, durable keys',
    rating: 4.3,
  },
  {
    id: 3,
    name: 'Backpack',
    category: 'Accessories',
    price: 650,
    quantity: 4,
    image: 'https://placehold.co/600x400?text=Backpack',
    description: 'A practical backpack for school and everyday use.',
    specifications: 'Multiple compartments, adjustable straps, lightweight material',
    rating: 4.7,
  },
]

function ProductHome({
  products,
  setProducts,
  selectedCategory,
  setSelectedCategory,
  cart,
}) {
  const categories = [
    'All',
    ...new Set(products.map((product) => product.category)),
  ]

  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter(
          (product) => product.category === selectedCategory
        )

  const total = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  )

  return (
    <main>
      <div className="section-heading">
        <div>
          <h2>Product List</h2>
          <p>Manage your products and available stock.</p>
        </div>

        <Link className="primary-link" to="/add-product">
          + Add New Product
        </Link>
      </div>

      <div className="filter-section">
        <label htmlFor="category-filter">Filter by Category:</label>
        <select
          id="category-filter"
          value={selectedCategory}
          onChange={(event) => setSelectedCategory(event.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category === 'All' ? 'All Categories' : category}
            </option>
          ))}
        </select>
      </div>

      <div className="product-list">
        {filteredProducts.map((product) => (
          <div className="product-card" key={product.id}>
            <Link to={`/product/${product.id}`}>
              <img src={product.image} alt={product.name} />
            </Link>

            <span className="category-label">{product.category}</span>

            <h3>
              <Link to={`/product/${product.id}`}>{product.name}</Link>
            </h3>

            <p className="product-price">
              ₱{product.price.toLocaleString('en-PH', {
                minimumFractionDigits: 2,
              })}
            </p>

            <p>Available Quantity: {product.quantity}</p>
            <p>
              Subtotal:{' '}
              <strong>
                ₱{(product.price * product.quantity).toLocaleString('en-PH', {
                  minimumFractionDigits: 2,
                })}
              </strong>
            </p>
            <p>Rating: ⭐ {product.rating}</p>

            {product.quantity < 5 && (
              <p className="low-stock">
                {product.quantity === 0 ? 'Out of Stock' : 'Low Stock'}
              </p>
            )}

            <div className="quantity-controls">
              <button
                className="secondary-button"
                disabled={product.quantity === 0}
                onClick={() =>
                  setProducts((current) =>
                    current.map((item) =>
                      item.id === product.id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                    )
                  )
                }
              >
                −
              </button>

              <span>{product.quantity}</span>

              <button
                className="secondary-button"
                onClick={() =>
                  setProducts((current) =>
                    current.map((item) =>
                      item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                    )
                  )
                }
              >
                +
              </button>
            </div>

            <Link className="details-link" to={`/product/${product.id}`}>
              View Details
            </Link>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className="empty-message">No products found in this category.</p>
      )}

      <section className="summary-panel">
        <div>
          <h3>Inventory Total</h3>
          <p>Value of all available product quantities</p>
        </div>
        <strong>
          ₱{total.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
        </strong>
      </section>

      <section className="summary-panel cart-summary">
        <div>
          <h3>Shopping Cart</h3>
          <p>
            {cart.reduce((sum, item) => sum + item.quantity, 0)} item(s) added
          </p>
        </div>
        <strong>
          ₱{cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
            .toLocaleString('en-PH', { minimumFractionDigits: 2 })}
        </strong>
      </section>
    </main>
  )
}

function AppContent() {
  const [products, setProducts] = useState(initialProducts)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [cart, setCart] = useState([])

  function addToCart(productId) {
    const product = products.find((item) => item.id === productId)
    if (!product || product.quantity <= 0) return

    const existing = cart.find((item) => item.id === productId)

    if (existing && existing.quantity >= product.quantity) {
      window.alert('You have added all available stock to your cart.')
      return
    }

    setCart((current) => {
      const item = current.find((entry) => entry.id === productId)

      if (item) {
        return current.map((entry) =>
          entry.id === productId
            ? { ...entry, quantity: entry.quantity + 1 }
            : entry
        )
      }

      return [...current, { ...product, quantity: 1 }]
    })
  }

  function addProduct(newProduct) {
    setProducts((current) => [
      ...current,
      { ...newProduct, id: Date.now() },
    ])
  }

  return (
    <div className="app">
      <header className="app-header">
        <Link to="/" className="brand">
          Product Management App
        </Link>
        <nav>
          <Link to="/">Products</Link>
          <Link to="/add-product">Add Product</Link>
        </nav>
      </header>

      <div className="page-intro">
        <h1>Product Management App</h1>
        <p>CCDI Pre-Final Exam</p>
      </div>

      <Routes>
        <Route
          path="/"
          element={
            <ProductHome
              products={products}
              setProducts={setProducts}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              cart={cart}
            />
          }
        />

        <Route
          path="/product/:id"
          element={
            <ProductDetails
              products={products}
              cart={cart}
              onAddToCart={addToCart}
            />
          }
        />

        <Route
          path="/add-product"
          element={<AddProduct onAddProduct={addProduct} />}
        />

        <Route
          path="*"
          element={
            <div className="form-card">
              <h2>Page Not Found</h2>
              <Link to="/">Return to Products</Link>
            </div>
          }
        />
      </Routes>

      <footer>
        <p>Product Management App · CCDI Pre-Final Exam</p>
      </footer>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
