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
import { Plus, Search, MoreHorizontal, Package } from "lucide-react"

const TEMP_DATA = [
  { id: "1", name: "Modern Headphones", category: "Electronics", price: 199.99, status: "Active" },
  { id: "2", name: "Cotton T-Shirt", category: "Apparel", price: 25.00, status: "Low Stock" },
  { id: "3", name: "Smart Watch", category: "Electronics", price: 299.00, status: "Out of Stock" },
];

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      {/* 1. Header: Title and Primary Action */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Products</h1>
          <p className="text-xl text-slate-500 text-sm">View and manage your ShopEasy inventory.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 shadow-sm">
          <Plus className="mr-2 h-4 w-4" /> Add Product
          
        </Button>
      </div>

      {/* 2. Toolbar: Search and Filters */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Search products..." 
            className="pl-10 bg-white border-slate-200 focus-visible:ring-blue-500" 
          />
        </div>
      </div>

      {/* 3. The Shadcn Table Container */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow>
              <TableHead className=" text-xl font-semibold text-slate-900">ID</TableHead>  
              <TableHead className=" text-xl font-semibold text-slate-900">Product</TableHead>
              <TableHead className=" text-xl font-semibold text-slate-900">Category</TableHead>
              <TableHead className=" text-xl font-semibold text-slate-900">Price</TableHead>
              <TableHead className=" text-xl font-semibold text-slate-900">Status</TableHead>
              <TableHead className=" text-xl text-right font-semibold text-slate-900">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {TEMP_DATA.length > 0 ? (
              TEMP_DATA.map((product) => (
                <TableRow key={product.id} className="hover:bg-slate-50/50 transition-colors cursor-default">
                  <TableCell className="font-medium text-slate-900">{product.id}</TableCell>
                  <TableCell className="font-medium text-slate-900">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400">
                        <Package size={18} />
                      </div>
                      {product.name}
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-600">{product.category}</TableCell>
                  <TableCell className="text-slate-600 font-medium">${product.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={product.status === "Active" ? "secondary" : "outline"}
                      className={
                        product.status === "Active" 
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-50" 
                        : product.status === "Low Stock"
                        ? "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-50"
                        : "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-50"
                      }
                    >
                      {product.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-slate-500">
                  No products found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}