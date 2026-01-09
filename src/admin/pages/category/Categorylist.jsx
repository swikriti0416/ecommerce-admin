// import { useState, useEffect } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import DeleteConfirmModal from "@/components/DeleteConfirmModal";
// import { Plus, Search, MoreHorizontal, Tags, Edit, Trash2 } from "lucide-react";
// import { toast } from "react-toastify";
// import CategoryAdd from "./CategoryAdd";

// export default function CategoryList() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [search, setSearch] = useState("");
//   const [itemToDelete, setItemToDelete] = useState(null);

//   // Load categories from localStorage
//   const loadData = () => {
//     const saved = localStorage.getItem("categories");
//     if (saved) {
//       try {
//         const parsed = JSON.parse(saved);
//         setCategories(Array.isArray(parsed) ? parsed : []);
//       } catch (e) {
//         console.error("Invalid categories data", e);
//         setCategories([]);
//       }
//     }
//   };

//   useEffect(() => {
//     loadData();
//   }, []);

//   const refreshCategories = () => {
//     loadData();
//     setIsModalOpen(false);
//   };

//   const filteredCategories = categories.filter((cat) =>
//     cat.name.toLowerCase().includes(search.toLowerCase())
//   );

//   const handleDelete = (id) => {
//     const category = categories.find((c) => c.id === id);
//     setItemToDelete(category);
//   };

//   const handleFinalDelete = () => {
//     if (!itemToDelete) return;

//     const updated = categories.filter((c) => c.id !== itemToDelete.id);
//     setCategories(updated);
//     localStorage.setItem("categories", JSON.stringify(updated));

//     toast.error(`${itemToDelete.name} has been removed.`);
//     setItemToDelete(null); 
//   };

//   const handleEdit = (id) => {
//     toast.info(`Edit category ${id} — coming soon!`);
//   };

//   return (
//     <div className="space-y-6 p-6">
//       {/* 1. Header Section */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight text-blue-600">
//             Categories
//           </h1>
//           <p className="text-slate-500">Manage your product categories.</p>
//         </div>
//         <Button
//           onClick={() => setIsModalOpen(true)}
//           className="bg-blue-600 hover:bg-blue-700 shadow-sm text-white"
//         >
//           <Plus className="mr-2 h-4 w-4" /> Add Category
//         </Button>
//       </div>

//       {/* 2. Search Section */}
//       <div className="flex items-center justify-between gap-4">
//         <div className="relative w-full max-w-sm">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
//           <Input
//             placeholder="Search categories..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="pl-10 bg-white border-slate-200"
//           />
//         </div>
//       </div>

//       {/* 3. Table Section */}
//       <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
//         <Table>
//           <TableHeader className="bg-slate-50">
//             <TableRow>
//               <TableHead className="font-semibold text-slate-900 w-[100px]">ID</TableHead>
//               <TableHead className="font-semibold text-slate-900">Category</TableHead>
//               <TableHead className="font-semibold text-slate-900">Status</TableHead>
//               <TableHead className="text-right font-semibold text-slate-900">Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {filteredCategories.length > 0 ? (
//               filteredCategories.map((category) => (
//                 <TableRow
//                   key={category.id}
//                   className="hover:bg-slate-50 transition-colors"
//                 >
//                   <TableCell className="font-medium text-slate-900">{category.id}</TableCell>
//                   <TableCell className="font-medium text-slate-900">
//                     <div className="flex items-center gap-3">
//                       <div className="h-9 w-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400">
//                         <Tags size={18} />
//                       </div>
//                       {category.name}
//                     </div>
//                   </TableCell>
//                   <TableCell>
//                     <Badge
//                       variant="secondary"
//                       className="bg-emerald-50 text-emerald-700 border-emerald-200"
//                     >
//                       Active
//                     </Badge>
//                   </TableCell>
//                   <TableCell className="text-right">
//                     <DropdownMenu>
//                       <DropdownMenuTrigger asChild>
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           className="h-8 w-8 p-0"
//                         >
//                           <MoreHorizontal className="h-4 w-4" />
//                         </Button>
//                       </DropdownMenuTrigger>
//                       <DropdownMenuContent align="end">
//                         <DropdownMenuItem
//                           onClick={() => handleEdit(category.id)}
//                           className="cursor-pointer"
//                         >
//                           <Edit className="mr-2 h-4 w-4" /> Edit
//                         </DropdownMenuItem>
//                         <DropdownMenuItem
//                           onClick={() => handleDelete(category.id)}
//                           className="cursor-pointer text-red-600 focus:text-red-600"
//                         >

//                           <Trash2 className="mr-2 h-4 w-4" /> Delete
//                         </DropdownMenuItem>
//                       </DropdownMenuContent>
//                     </DropdownMenu>
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={4} className="h-24 text-center text-slate-500">
//                   No categories found.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>

//       {/* --- MODALS SECTION --- */}

//       {/* Add Category Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
//           <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl">
//             <CategoryAdd
//               onClose={() => setIsModalOpen(false)}
//               onSuccess={refreshCategories}
//             />
//           </div>
//         </div>
//       )}

//       {/* Delete Confirmation Modal (Centered Popup) */}
//       {itemToDelete && (
//         <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
//           <div className="w-full max-w-md animate-in fade-in zoom-in duration-200">
//             <DeleteConfirmModal
//               isOpen={!!itemToDelete}
//               itemName={itemToDelete?.name}
//               onClose={() => setItemToDelete(null)}
//               onConfirm={handleFinalDelete}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import { useState, useEffect } from "react";
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
import DeleteConfirmModal from "@/components/DeleteConfirmModal";
import { Plus, Search, MoreHorizontal, Tags, Edit, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import CategoryAdd from "./CategoryAdd";

export default function CategoryList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [itemToDelete, setItemToDelete] = useState(null);

  // 🔹 Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  // Load categories from localStorage
  const loadData = () => {
    const saved = localStorage.getItem("categories");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCategories(Array.isArray(parsed) ? parsed : []);
      } catch (e) {
        console.error("Invalid categories data", e);
        setCategories([]);
      }
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Reset page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const refreshCategories = () => {
    loadData();
    setIsModalOpen(false);
  };

  // 🔹 Search filter
  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  // 🔹 Pagination logic
  const totalPages = Math.ceil(filteredCategories.length / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;

  const paginatedCategories = filteredCategories.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handleDelete = (id) => {
    const category = categories.find((c) => c.id === id);
    setItemToDelete(category);
  };

  const handleFinalDelete = () => {
    if (!itemToDelete) return;

    const updated = categories.filter((c) => c.id !== itemToDelete.id);
    setCategories(updated);
    localStorage.setItem("categories", JSON.stringify(updated));

    toast.error(`${itemToDelete.name} has been removed.`);
    setItemToDelete(null);
  };

  const handleEdit = (id) => {
    toast.info(`Edit category ${id} — coming soon!`);
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-blue-600">
            Categories
          </h1>
          <p className="text-slate-500">Manage your product categories.</p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Category
        </Button>
      </div>

      {/* Search */}
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          placeholder="Search categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 bg-white"
        />
      </div>

      {/* Table */}
      <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedCategories.length > 0 ? (
              paginatedCategories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">
                    {category.id}
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-slate-100 flex items-center justify-center">
                        <Tags size={18} />
                      </div>
                      {category.name}
                    </div>
                  </TableCell>

                  <TableCell>
                    <Badge className="bg-emerald-50 text-emerald-700">
                      Active
                    </Badge>
                  </TableCell>

                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleEdit(category.id)}
                        >
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(category.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No categories found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-500">
            Page {currentPage} of {totalPages}
          </span>

          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              Prev
            </Button>

            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i}
                size="sm"
                variant={currentPage === i + 1 ? "default" : "outline"}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </Button>
            ))}

            <Button
              size="sm"
              variant="outline"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50">
          <div className="w-full max-w-lg bg-white rounded-2xl">
            <CategoryAdd
              onClose={() => setIsModalOpen(false)}
              onSuccess={refreshCategories}
            />
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {itemToDelete && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40">
          <DeleteConfirmModal
            isOpen
            itemName={itemToDelete.name}
            onClose={() => setItemToDelete(null)}
            onConfirm={handleFinalDelete}
          />
        </div>
      )}
    </div>
  );
}
