"use client"
import { Checkbox } from "@/components/ui/checkbox"
import { useState, useEffect } from "react"
import {Table,TableBody,TableCaption,TableCell,TableFooter,TableHead,TableHeader,TableRow,
} from "@/components/ui/table"
const axios = require('axios');
import { useToast } from "@/components/ui/use-toast"
import { CopyButton } from "@/components/buttons/copy-button/copy-button";
import { DropdownMenuCheckboxes } from "@/components/table-actions-dropdown/dropdown-action";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, refetchData } from '@/redux/slices/fetch-refetch-api/fetch-data-api';
import { ReloadIcon } from "@radix-ui/react-icons";
import { Skeleton } from "@/components/ui/skeleton";



export function TableDemo() {
    

  const dispatch = useDispatch();
  const { toast } = useToast()
  const [checkboxArray, setCheckboxArray] = useState([]);

  const data = useSelector((state) => state.data.data);
  const status = useSelector((state) => state.data.status);


  const handleRefetch = () => {
    dispatch(refetchData());
  };

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);


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
    console.log(`http://localhost:6700/register/download/articles?id=${checkboxArray.slice(1)}`)
  };

  const downloadSelected = async () => {
    if (checkboxArray.length < 1) {
      toast({
        title: "Array is Empty",
        description: "Noting to downlaod",
      })
    } else {

      try {
        const response = await fetch(`http://localhost:6700/register/download/articles?id=${checkboxArray.slice(1)}`, {
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

  const deleteSelected = async () => {

    if (checkboxArray.length < 1) {
      toast({
        title: "Array is Empty",
        description: "Noting to Delete",
      })
    } else {
      try {
        const response = await axios.delete(`http://localhost:6700/register/${checkboxArray.slice(1)}`);

        toast({
          title: response.data.message,
          description: ` Total ${response.data.deletedArticles.deletedCount} Deleted`,
        });

        handleRefetch()

      } catch (error) {
        toast({
          title: "Some Error occured",
          description: ` error ocuured to deleted`,
        })
        console.error('Axios error:', error);
      }
    }
  }
  const datafilter = () => {
    const filteredData = data.filter(obj => checkboxArray.includes(obj._id));
    return filteredData
  }
  const CopyAllData = () => {

    const filteredData = datafilter()

    const generatedLinks = filteredData.map(items => (
      `<a href="/${items.newerPath}/${items.url}">${items.h1}</a>`
    ));

    const htmlToCopy = generatedLinks.join('\n');

    try {
      navigator.clipboard.writeText(htmlToCopy);
      toast({
        title: "Copied Successfully!!!",
        description: `Total ${filteredData.length} Articles Copied Successfully`,
      })

    } catch (error) {
      toast({
        title: "Oops! Some Error Occured",
        description: `Try Again !`,
      })
      console.error('Unable to copy HTML links to clipboard', error);
    }

  }

  const handleShare = async () => {
    
    
    const filteredData = datafilter()

    const generatedLinks = filteredData.map(items => (
      `https://www.astrosage.com/${items.newerPath}/${items.url}`
    ));

    const htmlToCopy = generatedLinks.join('\n');

    try {
      navigator.clipboard.writeText(htmlToCopy);
      toast({
        title: "Copied Successfully!!!",
        description: `You can share links of ${filteredData.length} articles.`,
      })

    } catch (error) {
      toast({
        title: "Oops! Some Error Occured",
        description: `Try Again !`,
      })
      console.error('Unable to copy HTML links to clipboard', error);
    }

  }

  return (
    
    <div className="rounded-md  over mx-2 border" >
      <Table className="letsmke  max-sm:w-max">
        
        <TableHeader className="bg bg-[#0a0a0a] z-[1]" vari style={{position:"sticky", top:"0px"}}>
          <TableRow>
            <TableHead> <div className="hover:cursor-pointer" onClick={handleRefetch}> <ReloadIcon/> </div> </TableHead>
            <TableHead>Author</TableHead>
            <TableHead >Path</TableHead>
            <TableHead >URL</TableHead>
            <TableHead >Date</TableHead>
            <TableHead ><DropdownMenuCheckboxes shareArticleLinks={handleShare} ArticlesCopyAllData={CopyAllData} DownloadArticles={downloadSelected} DeleteArticles={deleteSelected} /></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>

  
{
  status == 'failed' ?  <div>Error: Unable to fetch data</div>:""
}

          {data && status == 'loading' ?      
           
           
           <TableRow >
              <TableCell><Skeleton className="h-4 w-[20px]"></Skeleton></TableCell>
              <TableCell><Skeleton className="h-4 w-[80px]"></Skeleton></TableCell>
              <TableCell><Skeleton className="h-4 w-[80px]"></Skeleton></TableCell>
              <TableCell><Skeleton className="h-4 w-[100px]"></Skeleton></TableCell>
              <TableCell><Skeleton className="h-4 w-[100px]"></Skeleton></TableCell>
              <TableCell><Skeleton className="h-4 w-[30px]"></Skeleton></TableCell>
            </TableRow> 
            : data.map((items, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium"><Checkbox onClick={() => updateArray(items._id)} id={items._id} /></TableCell>
              <TableCell>{items.AuthorProfile.profilename}</TableCell>
              <TableCell className="font-medium">{items.newerPath.split("/").join("-")}</TableCell>
              <TableCell>{items.url}</TableCell>
              <TableCell className="text-right">{items.TimeRanges.getCurrentFormattedDate} {items.TimeRanges.getCurrentFormattedTime}</TableCell>
              <TableCell><CopyButton><a class="list-group-item" href={`/${items.newerPath}/${items.url}`}>{items.h1}</a></CopyButton></TableCell>
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

      </div>
    </div>
  )
}
