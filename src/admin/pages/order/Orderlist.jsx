// src/admin/pages/orders/OrderList.jsx
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
import { Search, MoreHorizontal, Package, Eye, Trash2 } from "lucide-react"
import { toast } from "react-toastify"

export default function OrderList() {
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [search, setSearch] = useState("")

  // Load orders from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("orders")
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setOrders(Array.isArray(parsed) ? parsed : [])
      } catch (e) {
        console.error("Invalid orders data", e)
        setOrders([])
      }
    }
  }, [])

  // Filter orders
  const filteredOrders = orders.filter(order =>
    order.id.toString().includes(search) ||
    order.customer.toLowerCase().includes(search.toLowerCase()) ||
    order.status.toLowerCase().includes(search.toLowerCase())
  )

  // Delete order
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      const updated = orders.filter(o => o.id !== id)
      setOrders(updated)
      localStorage.setItem("orders", JSON.stringify(updated))
      toast.success("Order deleted successfully!")
    }
  }

  // View order details (you can create a details page later)
  const handleView = (id) => {
    toast.info(`View order ${id} — coming soon!`)
    // Later: navigate(`/admin/orders/${id}`)
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-emerald-50 text-emerald-700 border-emerald-200"
      case "Processing":
        return "bg-blue-50 text-blue-700 border-blue-200"
      case "Shipped":
        return "bg-indigo-50 text-indigo-700 border-indigo-200"
      case "Cancelled":
        return "bg-red-50 text-red-700 border-red-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Orders</h1>
          <p className="text-slate-500">View and manage customer orders.</p>
        </div>
        {/* You can add "New Order" button later if needed */}
      </div>

      {/* Search */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Search by order ID, customer..." 
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
              <TableHead className="font-semibold text-slate-900">Order ID</TableHead>
              <TableHead className="font-semibold text-slate-900">Customer</TableHead>
              <TableHead className="font-semibold text-slate-900">Date</TableHead>
              <TableHead className="font-semibold text-slate-900">Total</TableHead>
              <TableHead className="font-semibold text-slate-900">Status</TableHead>
              <TableHead className="text-right font-semibold text-slate-900">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <TableRow key={order.id} className="hover:bg-slate-50 transition-colors">
                  <TableCell className="font-medium text-slate-900">#{order.id}</TableCell>
                  <TableCell className="text-slate-900">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400">
                        <Package size={18} />
                      </div>
                      {order.customer}
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-600">{order.date}</TableCell>
                  <TableCell className="font-medium text-slate-900">${order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadge(order.status)}>
                      {order.status}
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
                          onClick={() => handleView(order.id)} 
                          className="cursor-pointer"
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDelete(order.id)} 
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
                <TableCell colSpan={6} className="h-24 text-center text-slate-500">
                  No orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}