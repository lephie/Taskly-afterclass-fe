import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import type { Task } from "@/types/task"
import { useEffect, useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { DialogClose } from "@radix-ui/react-dialog"
import { createTaskService, DeleteTaskService, ListTaskService } from "@/service/task"
import { Trash2 } from "lucide-react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"

export default function Dashboard(){
  const [IsDialogFormOpen, setIsDialogFormOpen] = useState<boolean>(false)
  const [isDialogDelete, setIsdialogDelete] = useState<boolean>(false)

  const [currentTaskId, setCurrentTaskId] = useState<string>('');  
  const [tasks, setTask] = useState<Task[]>([ ]) // buat set task
  const [title, setTitle] = useState<string>(''); // buat set title 
  const [description, setDescription] = useState<string>(''); // untuk set descripsi

  const getListTask = async () => {
    ListTaskService().then(data => {
      setTask(data);
    });
  }

  useEffect(() => {
    getListTask();
  }, [])

  const createTask = () => {
    createTaskService({
      title,
      desc: description,
      label: "Todo"
    }).then(isSuccess => {
      if(isSuccess){
        alert("Berhasil!")
        getListTask()
      }
    })
  }

  const handleDeleteTask = (id: string) =>{ // untuk buka dialog, iya ato ngak, sambil pilih id yang mau di delete
    setCurrentTaskId(id);
    setIsdialogDelete(true);
  }

  const deleteTask = () => { // ini execute delete
    DeleteTaskService(currentTaskId).then(isSuccess => {
      if(isSuccess){
        alert("Berhasil! task berhasil dihapus.")
        getListTask();
        setIsdialogDelete(false)
      }
    })
  }

    return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                <Card>
                  <CardHeader className="border-b flex flex-row">
                    <div>
                      <CardTitle>Task List</CardTitle>
                      <CardDescription>Your Task List</CardDescription>
                    </div>
                    <Button className="ml-auto my-auto" onClick={() => setIsDialogFormOpen(true)}>Add Task</Button>
                  </CardHeader>
                  <CardContent>
                    <ul className="grid gap-3">
                      {tasks.map((task) => (
                        <li key={task.id} className="flex items-start gap-3">
                          <Checkbox className="my-auto cursor-pointer"/>
                          <button className={cn("text-left flex-1 space-y-0.5")}>
                          <h1 className={cn("font-medium")}>{task.title}</h1>
                          <p className={cn("text-muted-foreground text-sm")}>{task.desc}</p>
                          </button>
                          <Button onClick={() => handleDeleteTask(task.id!)} variant="ghost" className="text-red-600">
                            <Trash2  />
                          </Button>
                        </li>
                      ))}

                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        <Dialog open={IsDialogFormOpen} onOpenChange={setIsDialogFormOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
              <DialogDescription>Here's The Description</DialogDescription>
            </DialogHeader>
            <FieldGroup>
              <Field>
                <Label>Title</Label>
                <Input onChange={(event) => setTitle(event.currentTarget.value)} />
              </Field>
              <Field>
                <Label>Description</Label>
                <Textarea onChange={(event) => setDescription(event.currentTarget.value)} />
              </Field>
            </FieldGroup>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant={"outline"}>Cancel</Button>
              </DialogClose>
              <Button onClick={() => {createTask()}} >Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <AlertDialog open={isDialogDelete} onOpenChange={setIsdialogDelete}>
           <AlertDialogAction>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your
                    account from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => deleteTask()}>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogAction>
             </AlertDialog>
      </SidebarInset>
    </SidebarProvider>
  )

}