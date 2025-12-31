// // src/admin/pages/products/ProductAdd.jsx
// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { Plus, Package } from "lucide-react"

// const categories = [
//   "Electronics",
//   "Apparel",
//   "Home & Garden",
//   "Beauty",
//   "Sports",
//   "Toys",
//   "Books",
//   "Other",
// ]

// export default function ProductAdd() {
//   const [open, setOpen] = useState(false)
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     price: "",
//     category: "",
//     image: "",
//     stock: "",
//   })

//   const handleInputChange = (e) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     // Here you would send data to your API (e.g., FakeStoreAPI POST or your backend)
//     console.log("New Product:", formData)
    
//     // Reset form and close dialog
//     setFormData({
//       title: "",
//       description: "",
//       price: "",
//       category: "",
//       image: "",
//       stock: "",
//     })
//     setOpen(false)
    
//     // Optional: Show success toast here later
//     alert("Product added successfully! (Check console)")
//   }
 
  
//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>
//         <Button className="bg-blue-600 hover:bg-blue-700 shadow-sm">
//           <Plus className="mr-2 h-4 w-4" />
//           Add Product
//         </Button>
//       </DialogTrigger>

//       <DialogContent className="sm:max-w-2xl">
//         <DialogHeader>
//           <DialogTitle className="text-2xl font-bold">Add New Product</DialogTitle>
//           <DialogDescription>
//             Fill in the details below to add a new product to your inventory.
//           </DialogDescription>
//         </DialogHeader>

//         <form onSubmit={handleSubmit} className="space-y-6 py-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Title */}
//             <div className="space-y-2">
//               <Label htmlFor="title">Product Title</Label>
//               <Input
//                 id="title"
//                 name="title"
//                 placeholder="e.g., Wireless Headphones"
//                 value={formData.title}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>

//             {/* Price */}
//             <div className="space-y-2">
//               <Label htmlFor="price">Price ($)</Label>
//               <Input
//                 id="price"
//                 name="price"
//                 type="number"
//                 step="0.01"
//                 placeholder="29.99"
//                 value={formData.price}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>

//             {/* Category */}
//             <div className="space-y-2">
//               <Label htmlFor="category">Category</Label>
//               <Select
//                 value={formData.category}
//                 onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
//                 required
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select a category" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {categories.map((cat) => (
//                     <SelectItem key={cat} value={cat.toLowerCase().replace(" & ", "-")}>
//                       {cat}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* Stock */}
//             <div className="space-y-2">
//               <Label htmlFor="stock">Stock Quantity</Label>
//               <Input
//                 id="stock"
//                 name="stock"
//                 type="number"
//                 placeholder="100"
//                 value={formData.stock}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
//           </div>

//           {/* Description */}
//           <div className="space-y-2">
//             <Label htmlFor="description">Description</Label>
//             <Textarea
//               id="description"
//               name="description"
//               placeholder="Describe your product..."
//               className="min-h-32 resize-none"
//               value={formData.description}
//               onChange={handleInputChange}
//               required
//             />
//           </div>

//           {/* Image URL */}
//           <div className="space-y-2">
//             <Label htmlFor="image">Image URL</Label>
//             <Input
//               id="image"
//               name="image"
//               placeholder="https://example.com/image.jpg"
//               value={formData.image}
//               onChange={handleInputChange}
//               required
//             />
//             {formData.image && (
//               <div className="mt-3">
//                 <p className="text-sm text-slate-500 mb-2">Preview:</p>
//                 <img
//                   src={formData.image}
//                   alt="Product preview"
//                   className="h-48 w-full object-cover rounded-lg border"
//                   onError={(e) => (e.target.style.display = "none")}
//                   onLoad={(e) => (e.target.style.display = "block")}
//                 />
//               </div>
//             )}
//           </div>

//           <DialogFooter className="gap-3">
//             <Button type="button" variant="outline" onClick={() => setOpen(false)}>
//               Cancel
//             </Button>
//             <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
//               <Package className="mr-2 h-4 w-4" />
//               Add Product
//             </Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   )
// }