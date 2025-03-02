"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Trash, Edit, Plus, Search, AlertTriangle, Calendar, Pill, Package, X } from "lucide-react"

interface Medication {
  id: number
  name: string
  dosage: string
  quantity: number
  expirationDate: string
  category?: string
}

export default function MedicationInventory() {
  const [medications, setMedications] = useState<Medication[]>([
    {
      id: 1,
      name: "Ibuprofen",
      dosage: "200mg",
      quantity: 50,
      expirationDate: "2025-12-31",
      category: "Pain Relief",
    },
    {
      id: 2,
      name: "Amoxicillin",
      dosage: "500mg",
      quantity: 20,
      expirationDate: "2024-06-15",
      category: "Antibiotic",
    },
    {
      id: 3,
      name: "Loratadine",
      dosage: "10mg",
      quantity: 30,
      expirationDate: "2025-08-22",
      category: "Allergy",
    },
  ])

  const [newMedication, setNewMedication] = useState<Medication>({
    id: Date.now(),
    name: "",
    dosage: "",
    quantity: 0,
    expirationDate: "",
    category: "",
  })

  const [editingMedication, setEditingMedication] = useState<Medication | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const categories = ["Pain Relief", "Antibiotic", "Allergy", "Vitamin", "First Aid", "Other"]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewMedication((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Number.parseInt(value) || 0 : value,
    }))
  }

  const handleCategoryChange = (value: string) => {
    setNewMedication((prev) => ({
      ...prev,
      category: value,
    }))
  }

  const addMedication = () => {
    if (!newMedication.name || !newMedication.dosage || newMedication.quantity <= 0 || !newMedication.expirationDate) {
      return
    }

    setMedications((prev) => [...prev, { ...newMedication, id: Date.now() }])
    setNewMedication({
      id: Date.now(),
      name: "",
      dosage: "",
      quantity: 0,
      expirationDate: "",
      category: "",
    })
    setIsAddDialogOpen(false)
  }

  const editMedication = (medication: Medication) => {
    setEditingMedication(medication)
    setNewMedication(medication)
    setIsEditDialogOpen(true)
  }

  const updateMedication = () => {
    if (!newMedication.name || !newMedication.dosage || newMedication.quantity <= 0 || !newMedication.expirationDate) {
      return
    }

    setMedications((prev) => prev.map((med) => (med.id === editingMedication?.id ? newMedication : med)))
    setEditingMedication(null)
    setNewMedication({
      id: Date.now(),
      name: "",
      dosage: "",
      quantity: 0,
      expirationDate: "",
      category: "",
    })
    setIsEditDialogOpen(false)
  }

  const deleteMedication = (id: number) => {
    setMedications((prev) => prev.filter((med) => med.id !== id))
  }

  const filteredMedications = medications.filter(
    (med) =>
      med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.dosage.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const isExpiringSoon = (date: string) => {
    const expirationDate = new Date(date)
    const today = new Date()
    const threeMonthsFromNow = new Date()
    threeMonthsFromNow.setMonth(today.getMonth() + 3)

    return expirationDate <= threeMonthsFromNow && expirationDate >= today
  }

  const isExpired = (date: string) => {
    const expirationDate = new Date(date)
    const today = new Date()

    return expirationDate < today
  }

  const getLowStockMedications = () => {
    return medications.filter((med) => med.quantity <= 10).length
  }

  const getExpiringMedications = () => {
    return medications.filter((med) => isExpiringSoon(med.expirationDate) && !isExpired(med.expirationDate)).length
  }

  const getExpiredMedications = () => {
    return medications.filter((med) => isExpired(med.expirationDate)).length
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Medication Inventory</h1>
          <p className="text-muted-foreground">Manage your medication stock and track expiration dates</p>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> Add Medication
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Medication</DialogTitle>
              <DialogDescription>
                Enter the details of the medication you want to add to your inventory.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={newMedication.name}
                  onChange={handleInputChange}
                  className="col-span-3"
                  placeholder="e.g., Ibuprofen"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Select value={newMedication.category} onValueChange={handleCategoryChange}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="dosage" className="text-right">
                  Dosage
                </Label>
                <Input
                  id="dosage"
                  name="dosage"
                  value={newMedication.dosage}
                  onChange={handleInputChange}
                  className="col-span-3"
                  placeholder="e.g., 200mg"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quantity" className="text-right">
                  Quantity
                </Label>
                <Input
                  id="quantity"
                  name="quantity"
                  type="number"
                  value={newMedication.quantity.toString()}
                  onChange={handleInputChange}
                  className="col-span-3"
                  min="1"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="expirationDate" className="text-right">
                  Expiration Date
                </Label>
                <Input
                  id="expirationDate"
                  name="expirationDate"
                  type="date"
                  value={newMedication.expirationDate}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" onClick={addMedication}>
                Add Medication
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-amber-50 dark:bg-amber-950/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              Expiring Soon
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getExpiringMedications()}</div>
            <p className="text-xs text-muted-foreground">Medications expiring in the next 3 months</p>
          </CardContent>
        </Card>

        <Card className="bg-red-50 dark:bg-red-950/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4 text-red-500" />
              Expired
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getExpiredMedications()}</div>
            <p className="text-xs text-muted-foreground">Medications that have expired</p>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 dark:bg-blue-950/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Package className="h-4 w-4 text-blue-500" />
              Low Stock
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getLowStockMedications()}</div>
            <p className="text-xs text-muted-foreground">Medications with 10 or fewer units</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <CardTitle>Medication List</CardTitle>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search medications..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full"
                  onClick={() => setSearchTerm("")}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Category</TableHead>
                  <TableHead>Dosage</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead className="hidden md:table-cell">Expiration Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMedications.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                      No medications found. Add a new medication to get started.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredMedications.map((medication) => (
                    <TableRow key={medication.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Pill className="h-4 w-4 text-primary" />
                          {medication.name}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {medication.category && <Badge variant="outline">{medication.category}</Badge>}
                      </TableCell>
                      <TableCell>{medication.dosage}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {medication.quantity <= 10 && (
                            <Badge
                              variant="outline"
                              className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800"
                            >
                              Low
                            </Badge>
                          )}
                          {medication.quantity}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex items-center gap-2">
                          {isExpired(medication.expirationDate) ? (
                            <Badge
                              variant="outline"
                              className="bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800"
                            >
                              Expired
                            </Badge>
                          ) : isExpiringSoon(medication.expirationDate) ? (
                            <Badge
                              variant="outline"
                              className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800"
                            >
                              Expiring Soon
                            </Badge>
                          ) : null}
                          {new Date(medication.expirationDate).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" size="icon" onClick={() => editMedication(medication)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="destructive" size="icon">
                                <Trash className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Medication</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete {medication.name}? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => deleteMedication(medication.id)}>
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Medication</DialogTitle>
            <DialogDescription>Make changes to the medication details below.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-name" className="text-right">
                Name
              </Label>
              <Input
                id="edit-name"
                name="name"
                value={newMedication.name}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-category" className="text-right">
                Category
              </Label>
              <Select value={newMedication.category} onValueChange={handleCategoryChange}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-dosage" className="text-right">
                Dosage
              </Label>
              <Input
                id="edit-dosage"
                name="dosage"
                value={newMedication.dosage}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-quantity" className="text-right">
                Quantity
              </Label>
              <Input
                id="edit-quantity"
                name="quantity"
                type="number"
                value={newMedication.quantity.toString()}
                onChange={handleInputChange}
                className="col-span-3"
                min="1"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-expirationDate" className="text-right">
                Expiration Date
              </Label>
              <Input
                id="edit-expirationDate"
                name="expirationDate"
                type="date"
                value={newMedication.expirationDate}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={updateMedication}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

