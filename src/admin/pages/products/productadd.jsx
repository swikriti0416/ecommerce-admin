// src/admin/pages/products/ProductAdd.jsx  (keep the same file name!)
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom" // ← Added useParams
import { ArrowLeft } from "lucide-react"
import { toast } from "react-toastify"

export default function ProductAdd() {
  const { id } = useParams() // Get ID from URL if present
  const navigate = useNavigate()
  const isEditMode = !!id // True only when editing

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    stock: "",
    image: "",
  })

  const [errors, setErrors] = useState({
    title: "",
    price: "",
    category: "",
    stock: "",
  })

  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(isEditMode) // Show loading only in edit mode

  // Load categories (always)
  useEffect(() => {
    const saved = localStorage.getItem("categories")
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setCategories(Array.isArray(parsed) ? parsed.map(c => c.name) : [])
      } catch (e) {
        console.error("Failed to load categories", e)
        setCategories([])
      }
    }
  }, [])

  // If editing → load product data
  useEffect(() => {
    if (!isEditMode) {
      setLoading(false)
      return
    }

    const products = JSON.parse(localStorage.getItem("products") || "[]")
    const product = products.find(p => p.id === Number(id))

    if (product) {
      setFormData({
        title: product.name || "",
        price: product.price?.toString() || "",
        category: product.category || "",
        stock: product.stock?.toString() || "",
        image: product.image || "",
      })
      setLoading(false)
    } else {
      toast.error("Product not found!")
      navigate("/admin/products")
    }
  }, [id, isEditMode, navigate])

  // Real-time validation
  useEffect(() => {
    const newErrors = {}

    if (formData.title && formData.title.trim().length < 2) {
      newErrors.title = "Product name must be at least 2 characters"
    } else {
      newErrors.title = ""
    }

    if (formData.price && (isNaN(formData.price) || parseFloat(formData.price) <= 0)) {
      newErrors.price = "Price must be greater than 0"
    } else {
      newErrors.price = ""
    }

    if (formData.category && !categories.includes(formData.category)) {
      newErrors.category = "Please select a valid category"
    } else {
      newErrors.category = ""
    }

    if (formData.stock && (isNaN(formData.stock) || parseInt(formData.stock) < 0)) {
      newErrors.stock = "Stock cannot be negative"
    } else {
      newErrors.stock = ""
    }

    setErrors(newErrors)
  }, [formData, categories])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCategoryChange = (value) => {
    setFormData(prev => ({ ...prev, category: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Final validation
    if (errors.title || errors.price || errors.category || errors.stock ||
        !formData.title || !formData.price || !formData.category || formData.stock === "") {
      toast.error("Please fix all errors before submitting")
      return
    }

    let products = JSON.parse(localStorage.getItem("products") || "[]")

    if (isEditMode) {
      // EDIT: Update existing product
      const index = products.findIndex(p => p.id === Number(id))
      if (index !== -1) {
        products[index] = {
          ...products[index],
          name: formData.title.trim(),
          price: parseFloat(formData.price),
          category: formData.category,
          stock: parseInt(formData.stock),
          image: formData.image.trim() || "https://via.placeholder.com/150",
          status: parseInt(formData.stock) > 10 ? "Active" : parseInt(formData.stock) > 0 ? "Low Stock" : "Out of Stock",
        }

        localStorage.setItem("products", JSON.stringify(products))
        toast.success("Product updated successfully!", {
          position: "top-center",
          autoClose: 3000,
        })
      }
    } else {
      // ADD: Create new product
      const maxId = products.length > 0 
        ? Math.max(...products.map(p => Number(p.id) || 0))
        : 0
      const newId = maxId + 1

      const newProduct = {
        id: newId,
        name: formData.title.trim(),
        price: parseFloat(formData.price),
        category: formData.category,
        stock: parseInt(formData.stock),
        image: formData.image.trim() || "https://via.placeholder.com/150",
        status: parseInt(formData.stock) > 10 ? "Active" : parseInt(formData.stock) > 0 ? "Low Stock" : "Out of Stock",
      }

      products.push(newProduct)
      localStorage.setItem("products", JSON.stringify(products))
      toast.success(`${newProduct.name} added successfully!`, {
        position: "top-center",
        autoClose: 3000,
      })
    }

    navigate("/admin/products")
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-2xl text-gray-700">Loading product...</p>
      </div>
    )
  }

  return (
    <div className=" hh-screen overflow-hidden flex">
      <div className="flex-1 overflow-hidden min-h-0 max-w-3xl mx-auto py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/admin/products")}
          className="flex items-center gap-2 text-2xl text-blue-600 hover:underline mb-8 font-medium"
        >
          <ArrowLeft size={36} />
          Back to Products
        </button>

        {/* Form Card */}
        <div className="h-full overflow-hidden min-h-0 bg-white rounded-2xl shadow-lg pg-12 p-8 border border-gray-200">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">
            {isEditMode ? "Edit Product" : "Add New Product"}
          </h1>
          <p className="text-gray-600 mb-8">
            {isEditMode ? "Update the product details below" : "Fill in the details below"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                  errors.title ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="enter the product name"
              />
              {errors.title && <p className="mt-2 text-sm text-red-600">{errors.title}</p>}
            </div>

            {/* Price & Stock */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price ($) *</label>
                <input
                  type="number"
                  name="price"
                  step="1"
                  value={formData.price}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                    errors.price ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="enter the price"
                />
                {errors.price && <p className="mt-2 text-sm text-red-600">{errors.price}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity *</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                    errors.stock ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="enter the stock quantity"
                />
                {errors.stock && <p className="mt-2 text-sm text-red-600">{errors.stock}</p>}
              </div>
            </div>

            {/* Category Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                  errors.category ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select a category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {errors.category && <p className="mt-2 text-sm text-red-600">{errors.category}</p>}
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Image URL (optional)</label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {/* Buttons */}
            <div className="pt-6 flex justify-end gap-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate("/admin/products")}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-red-400 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors shadow-md"
              >
                {isEditMode ? "Save Changes" : "Add Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}