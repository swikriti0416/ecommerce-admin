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
import { Search, MoreHorizontal, Package, Eye, Trash2, ChevronsUpDown } from "lucide-react"
import { toast } from "react-toastify"

const mockOrders = [
  {
    id: 101,
    customer: "Sarah Song",
    date: "2025-12-28",
    total: 129.99,
    status: "Delivered"
  },
  {
    id: 102,
    customer: "shista Gupta",
    date: "2026-01-02",
    total: 89.50,
    status: "Shipped"
  },
  {
    id: 103,
    customer: "ram magar",
    date: "2026-01-04",
    total: 245.00,
    status: "Processing"
  },
  {
    id: 104,
    customer: "Sani KC",
    date: "2025-12-20",
    total: 59.99,
    status: "Cancelled"
  },
  {
    id: 105,
    customer: "Ramba ",
    date: "2026-01-05",
    total: 179.95,
    status: "Processing"
  },
  {
    id: 106,
    customer: "Sahil Thapa",
    date: "2026-01-03",
    total: 320.00,
    status: "Shipped"
  },
  {
    id: 107,
    customer: "ranmash",
    date: "2025-12-30",
    total: 74.25,
    status: "Delivered"
  }
]

export default function OrderList() {
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")

  // Load orders from localStorage or seed with mock data
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
    } else {
      localStorage.setItem("orders", JSON.stringify(mockOrders))
      setOrders(mockOrders)
    }
  }, [])

  // Filter orders by search AND status
  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      search === "" ||
      order.id.toString().includes(search) ||
      order.customer.toLowerCase().includes(search.toLowerCase())

    const matchesStatus = statusFilter === "All" || order.status === statusFilter

    return matchesSearch && matchesStatus
  })

  
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      const updated = orders.filter(o => o.id !== id)
      setOrders(updated)
      localStorage.setItem("orders", JSON.stringify(updated))
      toast.success("Order deleted successfully!")
    }
  }

  
  const handleView = (id) => {
    toast.info(`View order ${id} — coming soon!`)
    
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
      </div>

      {/* Filters Bar: Search first (left), Status dropdown second (right) */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        {/* Search Input - First on left */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search by ID or customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-white border-slate-200 focus-visible:ring-blue-500"
          />
        </div>

        {/* Record Status Dropdown - Second */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-[180px] justify-between">
              {statusFilter === "All" ? "Record Status" : statusFilter}
              <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="start" 
            className="bg-white shadow-lg border border-slate-200 z-50" // Added bg-white + shadow + high z-index
          >
            <DropdownMenuItem onClick={() => setStatusFilter("All")}>
              All Statuses
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("Processing")}>
              Processing
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("Shipped")}>
              Shipped
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("Delivered")}>
              Delivered
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("Cancelled")}>
              Cancelled
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Clear All Filters Button */}
        {(statusFilter !== "All" || search !== "") && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setStatusFilter("All")
              setSearch("")
            }}
          >
            Clear all
          </Button>
        )}
      </div>

      {/* Table - Added relative positioning and z-index to prevent overlap */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden relative z-0">
        <Table className="relative z-0">
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