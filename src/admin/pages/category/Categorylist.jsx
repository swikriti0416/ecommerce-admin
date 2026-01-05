import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Plus, Search, MoreHorizontal, Tags, Edit, Trash2 } from "lucide-react"
import { toast } from "react-toastify"

export default function CategoryList() {
  const navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const [search, setSearch] = useState("")

  // Load categories from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("categories")
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setCategories(Array.isArray(parsed) ? parsed : [])
      } catch (e) {
        console.error("Invalid categories data", e)
        setCategories([])
      }
    }
  }, [])

  // Filter categories
  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  )

  // Delete category
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      const updated = categories.filter(c => c.id !== id)
      setCategories(updated)
      localStorage.setItem("categories", JSON.stringify(updated))
      toast.success("Category deleted successfully!")
      , {
      position: "top-center",
      autoClose: 3000,
    }
    }
  }

  // Edit category (you can create a separate edit page later)
  const handleEdit = (id) => {
    toast.info(`Edit category ${id} — coming soon!`)
    // Later: navigate(`/admin/categories/edit/${id}`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-bold text-blue-600">Categories</h1>
          <p className="text-slate-500">Manage your product categories.</p>
        </div>
        <Button 
          onClick={() => navigate("/admin/categories/add")}
          className="bg-blue-400 hover:bg-blue-700 shadow-sm"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Category
        </Button>
      </div>

      {/* Search */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Search categories..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-white border-slate-200 focus-visible:ring-blue-500" 
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="font-semibold text-slate-900">ID</TableHead>  
              <TableHead className="font-semibold text-slate-900">Category</TableHead>
              <TableHead className="font-semibold text-slate-900">Status</TableHead>
              <TableHead className="text-right font-semibold text-slate-900">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <TableRow key={category.id} className="hover:bg-slate-50 transition-colors">
                  <TableCell className="font-medium text-slate-900">{category.id}</TableCell>
                  <TableCell className="font-medium text-slate-900">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400">
                        <Tags size={18} />
                      </div>
                      {category.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="secondary"
                      className="bg-emerald-50 text-emerald-700 border-emerald-200"
                    >
                      Active
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem 
                          onClick={() => handleEdit(category.id)} 
                          className="cursor-pointer"
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDelete(category.id)} 
                          className="cursor-pointer text-red-600 focus:text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center text-slate-500">
                  No categories found. Add your first one!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}