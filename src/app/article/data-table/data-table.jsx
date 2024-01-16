"use client"
import { Checkbox } from "@/components/ui/checkbox"
import {useState , useEffect} from "react"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast"

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


const axios = require('axios');
  export function TableDemo() {

    const { toast } = useToast()
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [checkboxArray, setCheckboxArray] = useState([]);

    const updateArray = (checkboxId) => {
      if (checkboxArray.includes(checkboxId)) {
        // Checkbox is in the array, remove it
        const newArray = checkboxArray
          .split(',')
          .filter((id) => id !== checkboxId)
          .join(',');
    
        setCheckboxArray(newArray);
      } else {
        // Checkbox is not in the array, add it
        setCheckboxArray((prevArray) => (prevArray ? `${prevArray},${checkboxId}` : checkboxId));
      }
    
      // Display the current state of the array
      console.log(`https://astroeditorbackend.vercel.app/register/download/articles?id=${checkboxArray.slice(1)}`)
    };
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('https://astroeditorbackend.vercel.app/register/lasttwodays');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const result = await response.json();
          setData(result);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);

const downloadSelected = async () =>{
if(checkboxArray.length < 1){
  toast({
    title: "Array is Empty",
    description: "Noting to downlaod",
  })
}else{

  try {
    const response = await fetch(`https://astroeditorbackend.vercel.app/register/download/articles?id=${checkboxArray.slice(1)}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const blob = await response.blob();

      // Create a link element and trigger a click to initiate download
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'downloaded_file';  // Set the desired filename
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }
  };

const  deleteSelected = async ()=>{

  if(checkboxArray.length < 1){
    toast({
      title: "Array is Empty",
      description: "Noting to Delete",
    })
  }else{
  try {
    const response = await axios.delete(`https://astroeditorbackend.vercel.app/register/${checkboxArray.slice(1)}`);

    toast({
      title: response.data.message,
      description: ` Total ${response.data.deletedArticles.deletedCount} Deleted`,
    })
    
  } catch (error) {
    toast({
      title: "Some Error occured",
      description: ` error ocuured to deleted`,
    })
    console.error('Axios error:', error);
  }
  }
}
   return (
        <div className="rounded-md px-2 mx-2 border">
              
                <Table className="letsmke max-sm:w-max">
        <TableHeader>
          <TableRow>
            <TableHead ></TableHead>
            <TableHead >Path</TableHead>
            <TableHead >Date</TableHead>
            <TableHead>Author</TableHead>
            <TableHead >URL</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data.map((items , index) => (
            <TableRow key={index}>
              <TableCell className="font-medium"><Checkbox onClick={()=>updateArray(items._id)} id={items._id} /></TableCell>
              <TableCell className="font-medium">{items.newerPath}</TableCell>
              <TableCell className="text-right">{items.TimeRanges.getCurrentFormattedDate} {items.TimeRanges.getCurrentFormattedTime}</TableCell>
              <TableCell>{items.AuthorProfile.profilename}</TableCell>
              <TableCell>{items.url}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell >Total</TableCell>
            <TableCell >{data && data.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <div className="my-2">
      <Button onClick={downloadSelected} className="max-sm:w-full my-2">Downlaod</Button>

      <AlertDialog>
  <AlertDialogTrigger className="max-sm:w-full" aschild>
  <Button className="max-sm:w-full bg-red-400 mt-2">Delete</Button>
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
      <AlertDialogAction onClick={deleteSelected} >Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

      </div>
      </div>
    )
  }
  