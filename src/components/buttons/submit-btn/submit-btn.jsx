import { Button } from '@/components/ui/button'
import { server } from '@/server/server';
import axios from 'axios';
import React from 'react'
import { useSelector } from 'react-redux';

const Submitbtn = () => {
   const ArticlesData = useSelector((state)=>state.ArticlesData)
   console.log(ArticlesData);
   const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${server}/register`, ArticlesData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Post request successful:', response.data);
    } catch (error) {
      console.error('Error making post request:', error);
    }
  };


    return (
        <>
            <Button onClick={handleSubmit} >Submit</Button>

        </>
    )
}

export default Submitbtn