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


    const existingCategories = JSON.parse(localStorage.getItem("categories") || "[]")
    const maxId = existingCategories.length > 0 
      ? Math.max(...existingCategories.map(c => Number(c.id) || 0))
      : 0
    const newId = maxId + 1


    const newCategory = {
      id: newId,
      name: name.trim(),
    }

    const existing = JSON.parse(localStorage.getItem("categories") || "[]")
    existing.push(newCategory)
    localStorage.setItem("categories", JSON.stringify(existing))

    toast.success("Category added successfully!", {
      position: "top-center",
      autoClose: 3000,
    })
    navigate("/admin/categories")
  }

  return (
    <div className="p-6 max-w-2xl">
      <button
        onClick={() => navigate("/admin/categories")}
        className="mb-6 flex items-center gap-2 text-2xl font-semibold text-blue-600 hover:underline"
      >
        <ArrowLeft size={36} /> Back
      </button>

      <h1 className="text-3xl font-bold mb-6">Add New Category</h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl  border-gray-200 shadow-xl">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Electronics"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate("/admin/categories")}
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-red-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 shadow-md"
          >
            Add Category
          </button>
        </div>
      </form>
    </div>
  )
}