'use client'
import React from 'react'
import { Textarea } from '@/components/ui/textarea';
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '@/redux/slices/article-data';

const data = [
    {
        name: "title",
        width: "33"
    },
    {
        name: "description",
        width: "33"
    },
    {
        name: "keywords",
        width: "33"
    },
    {
        name: "url",
    },
    {
        name: "h1",
    },
    {
        name: "imageurl",
    },
    {
        name: "imagealt",
    },
    {
        name: "faq",
    },
    {
        name: "faqlasttext",
    },

]

export const TextAreaBox = () => {
    const dispatch = useDispatch()
    const ArticlesData = useSelector((state) => state.ArticlesData)
    const handleChange = (field, value) => {
        dispatch(updateUser({ [field]: value }))
    }



    return (
        <>
            <div className="container-fluid">
                <div className="flex flex-wrap">
                    {
                        data.map((items, index) => {
                            let { name } = items
                            return (
                                <div key={index}  className={` ${  index == 0 ? "w-100imp" : index == 1 || index == 2 ? "w-50s" : ""} w-${items.width ? items.width : items.width = 50}s `}>
                                    <Textarea
                                        name={name}
                                        value={ArticlesData[name]}
                                        onChange={(e) => handleChange(e.target.name, e.target.value)}
                                        placeholder={(name).toUpperCase()}
                                    />
                                </div>

                            )
                        })}
                        

                </div>
            </div>
        </>
    )
}

