import { Button } from '@/components/ui/button'
import { resetUser } from '@/redux/slices/article-data'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Resetbtn = () => {

    const ArticleData = useSelector((state) => state.resetUser)
    const dispatch = useDispatch()

    const handleReset = () => {
        dispatch(resetUser());
    }

    return (
        <>
            <Button onClick={handleReset} className="" >Reset</Button>

        </>
    )
}

export default Resetbtn