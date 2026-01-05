import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  Search,
  MoreHorizontal,
  Package,
  Edit,
  Trash2,
} from "lucide-react";
import { toast } from "react-toastify";

export default function ProductsPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]); // Start empty
  const [search, setSearch] = useState("");

  // Load products from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("products");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setProducts(Array.isArray(parsed) ? parsed : []);
      } catch (e) {
        console.error("Invalid localStorage data", e);
        setProducts([]);
      }
    }
  }, []);

  // Safe search: use title or name
  const filteredProducts = products.filter((product) => {
    const name = product.title || product.name || ""; // Fallback to empty string
    const category = product.category || "";
    return (
      name.toLowerCase().includes(search.toLowerCase()) ||
      category.toLowerCase().includes(search.toLowerCase())
    );
  });

  // Delete product
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const updated = products.filter((p) => p.id !== id);
      setProducts(updated);
      localStorage.setItem("products", JSON.stringify(updated));
      toast.info("Product deleted successfully!!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  // Edit product
  const handleEdit = (id) => {
    navigate(`/admin/products/edit/${id}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-bold text-blue-600">
            Products
          </h1>
          <p className="text-slate-500">
            View and manage your ShopEasy inventory.
          </p>
        </div>
        <Button
          onClick={() => navigate("/admin/products/add")}
          className="bg-blue-600 hover:bg-blue-700 shadow-sm"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>

      {/* Search */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-white border-slate-200 focus-visible:ring-blue-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-xl overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="font-semibold text-slate-900">ID</TableHead>
              <TableHead className="font-semibold text-slate-900">
                Product
              </TableHead>
              <TableHead className="font-semibold text-slate-900">
                Category
              </TableHead>
              <TableHead className="font-semibold text-slate-900">
                Price
              </TableHead>
              <TableHead className="font-semibold text-slate-900">
                Status
              </TableHead>
              <TableHead className="text-right font-semibold text-slate-900">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <TableRow
                  key={product.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <TableCell className="font-medium text-slate-900">
                    {product.id}
                  </TableCell>
                  <TableCell className="font-medium text-slate-900">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400">
                        <Package size={18} />
                      </div>
                      {product.name || product.title || "Unnamed"}
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-600">
                    {product.category || "Uncategorized"}
                  </TableCell>
                  <TableCell className="text-slate-600 font-medium">
                    ${parseFloat(product.price).toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        product.status === "Active" ? "secondary" : "outline"
                      }
                      className={
                        product.status === "Active"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : product.status === "Low Stock"
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : "bg-rose-50 text-rose-700 border-rose-200"
                      }
                    >
                      {product.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleEdit(product.id)}
                          className="cursor-pointer"
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(product.id)}
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
                <TableCell
                  colSpan={6}
                  className="h-24 text-center text-slate-500"
                >
                  No products found. Add your first one!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
