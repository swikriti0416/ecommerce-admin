import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { toast } from "react-toastify"

export default function CategoryAdd() {
  const navigate = useNavigate()
  const [name, setName] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!name.trim()) {
      toast.error("Category name is required")
      return
    }

    // Check for duplicate category name
    const existingCategories = JSON.parse(localStorage.getItem("categories") || "[]")
    if (existingCategories.some(cat => cat.name.toLowerCase() === name.trim().toLowerCase())) {
      toast.error("A category with this name already exists")
      return
    }

    const maxId = existingCategories.length > 0 
      ? Math.max(...existingCategories.map(c => Number(c.id) || 0))
      : 0
    const newId = maxId + 1

    const newCategory = {
      id: newId,
      name: name.trim(),
    }

    existingCategories.push(newCategory)
    localStorage.setItem("categories", JSON.stringify(existingCategories))

    toast.success("Category added successfully!", {
      position: "top-center",
      autoClose: 3000,
    })
    navigate("/admin/categories")
  }

  return (
    <div className=" bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/admin/categories")}
          className="flex items-center gap-3 text-2xl text-blue-600 hover:underline font-medium mb-10 transition-colors"
        >
          <ArrowLeft size={36} />
          Back to Categories
        </button>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-10 border border-gray-200">
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-blue-600 mb-3">
              Add New Category
            </h1>
            <p className="text-lg text-gray-600">
              Create a new product category for your store
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Category Name Field */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">
                Category Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Electronics, Clothing, Books"
                className="w-full px-6 py-4 text-lg border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all outline-none shadow-sm hover:border-gray-400"
                autoFocus
              />
              <p className="mt-3 text-sm text-gray-500">
                Choose a clear and descriptive name
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-8 border-t border-gray-200 flex justify-end gap-5">
              <button
                type="button"
                onClick={() => navigate("/admin/categories")}
                className="px-8 py-4 text-lg border border-gray-300 rounded-xl hover:bg-gray-50 hover:bg-red-400 transition-all font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-10 py-4 text-lg bg-blue-600 text-white rounded-xl hover:bg-green-600 transition-all font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Add Category
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}