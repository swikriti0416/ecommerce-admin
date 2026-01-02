import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"

export default function ProductAdd() {
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState("")
  const [stock, setStock] = useState("")
  const [image, setImage] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    const newProduct = {
      id: Date.now(),
      title,
      price: parseFloat(price),
      stock: parseInt(stock),
      image: image || ""
    }

    const saved = JSON.parse(localStorage.getItem("products") || "[]")
    saved.push(newProduct)
    localStorage.setItem("products", JSON.stringify(saved))

    alert("Product added!")
    navigate("/admin/products")
  }

  return (
    <div className="p-6 max-w-2xl">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
        ← Back
      </Button>
      <h1 className="text-3xl text-blue-600 font-bold mb-6">Add Product</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Title</Label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <Label>Price</Label>
          <Input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <div>
          <Label>Stock</Label>
          <Input type="number" value={stock} onChange={(e) => setStock(e.target.value)} required />
        </div>
        <div>
          <Label>Image URL (optional)</Label>
          <Input value={image} onChange={(e) => setImage(e.target.value)} />
        </div>

        <Button type="submit">Save Product</Button>
      </form>
    </div>
  )
}