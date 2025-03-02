import { useState } from 'react'
import { Button } from "/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "/components/ui/card"
import { Input } from "/components/ui/input"
import { Label } from "/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "/components/ui/dialog"
import { Trash, Edit, Plus } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "/components/ui/table"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "/components/ui/alert-dialog"

interface Medication {
  id: number
  name: string
  dosage: string
  quantity: number
  expirationDate: string
}

export default function MedicationInventory() {
  const [medications, setMedications] = useState<Medication[]>([])
  const [newMedication, setNewMedication] = useState<Medication>({
    id: Date.now(),
    name: '',
    dosage: '',
    quantity: 0,
    expirationDate: '',
  })
  const [editingMedication, setEditingMedication] = useState<Medication | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewMedication((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const addMedication = () => {
    setMedications((prev) => [...prev, newMedication])
    setNewMedication({
      id: Date.now(),
      name: '',
      dosage: '',
      quantity: 0,
      expirationDate: '',
    })
  }

  const editMedication = (medication: Medication) => {
    setEditingMedication(medication)
    setNewMedication(medication)
  }

  const updateMedication = () => {
    setMedications((prev) =>
      prev.map((med) =>
        med.id === editingMedication?.id ? newMedication : med
      )
    )
    setEditingMedication(null)
    setNewMedication({
      id: Date.now(),
      name: '',
      dosage: '',
      quantity: 0,
      expirationDate: '',
    })
  }

  const deleteMedication = (id: number) => {
    setMedications((prev) => prev.filter((med) => med.id !== id))
  }

  return (
    <div className="p-4">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Add Medication</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" value={newMedication.name} onChange={handleInputChange} />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="dosage">Dosage</Label>
              <Input id="dosage" name="dosage" value={newMedication.dosage} onChange={handleInputChange} />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input id="quantity" name="quantity" type="number" value={newMedication.quantity.toString()} onChange={handleInputChange} />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="expirationDate">Expiration Date</Label>
              <Input id="expirationDate" name="expirationDate" type="date" value={newMedication.expirationDate} onChange={handleInputChange} />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={editingMedication ? updateMedication : addMedication}>
            {editingMedication ? 'Update Medication' : 'Add Medication'}
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Medication List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Dosage</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Expiration Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {medications.map((medication) => (
                <TableRow key={medication.id}>
                  <TableCell>{medication.name}</TableCell>
                  <TableCell>{medication.dosage}</TableCell>
                  <TableCell>{medication.quantity}</TableCell>
                  <TableCell>{medication.expirationDate}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" onClick={() => editMedication(medication)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Medication</DialogTitle>
                            <DialogDescription>
                              Make changes to your medication here. Click save when you're done.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="name" className="text-right">
                                Name
                              </Label>
                              <Input id="name" name="name" value={newMedication.name} onChange={handleInputChange} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="dosage" className="text-right">
                                Dosage
                              </Label>
                              <Input id="dosage" name="dosage" value={newMedication.dosage} onChange={handleInputChange} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="quantity" className="text-right">
                                Quantity
                              </Label>
                              <Input id="quantity" name="quantity" type="number" value={newMedication.quantity.toString()} onChange={handleInputChange} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="expirationDate" className="text-right">
                                Expiration Date
                              </Label>
                              <Input id="expirationDate" name="expirationDate" type="date" value={newMedication.expirationDate} onChange={handleInputChange} className="col-span-3" />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="submit" onClick={updateMedication}>
                              Save changes
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" onClick={() => deleteMedication(medication.id)}>
                            <Trash className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete the medication.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>No</AlertDialogCancel>
                            <AlertDialogAction>Yes</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
