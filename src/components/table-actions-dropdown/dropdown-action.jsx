"use client"
import * as React from "react"
import { DotsVerticalIcon , DownloadIcon , ClipboardCopyIcon , CrossCircledIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
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
export function DropdownMenuCheckboxes({DownloadArticles ,  DeleteArticles , ArticlesCopyAllData}) {


  const [showStatusBar, setShowStatusBar] = React.useState(true)
  const [showActivityBar, setShowActivityBar] = React.useState(false)
  const [showPanel, setShowPanel] = React.useState(false)

  return (
   <>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary">
        <DotsVerticalIcon className="h-4 w-4" />
  
        </Button>
      </DropdownMenuTrigger>


      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="hover:cursor-pointer"
          onClick={DownloadArticles}
          >
          <DownloadIcon className="mr-2"/> Download
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:cursor-pointer"
          onClick={ArticlesCopyAllData}
          >
           <ClipboardCopyIcon className="mr-2"/> 
          Copy
        </DropdownMenuItem>


    
<AlertDialog>
  <AlertDialogTrigger className="max-sm:w-full" aschild>
  <Button variant="ghost" className="max-sm:w-full relative flex cursor-default select-none items-center rounded-sm px-2  text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:cursor-pointer flex justify-start py-1.5">
    
        {/* <DropdownMenuItem className="hover:cursor-pointer"> */}
           <CrossCircledIcon className="mr-2"/> 
          Delete
        {/* </DropdownMenuItem> */}

  </Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={DeleteArticles} >Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
</DropdownMenuContent>
    </DropdownMenu>
</>
  )
}
