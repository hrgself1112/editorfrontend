import { Button } from '@/components/ui/button'
import { server } from '@/server/server';
import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from "@/components/ui/use-toast"
import { resetUser } from '@/redux/slices/article-data';
import {refetchData } from '@/redux/slices/fetch-refetch-api/fetch-data-api';

const Submitbtn = () => {
  
  const {toast}  = useToast();
const dispatch = useDispatch()
  const ArticlesData = useSelector((state)=>state.ArticlesData)


  const handleRefetch = () => {
    dispatch(refetchData());
  };

   const handleSubmit = async (e) => {
   e.preventDefault();

    try {
      const response = await axios.post(`${server}/register`, ArticlesData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      toast({
        title: "Congratulation 🎉🎉",
        description: `Successfully submitted`,
      })
      dispatch(resetUser());
      setTimeout(() => {
        alert("hey")
        handleRefetch();
      }, 10);
    } catch (error) {
      console.error('Error making post request:', error);
    }
  };


    return (
        <>
            <Button className="max-sm:w-[70%] mx-2"  onClick={handleSubmit} >Submit</Button>

        </>
    )
}

export default Submitbtn