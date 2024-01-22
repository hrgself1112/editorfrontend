import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useDispatch, useSelector } from "react-redux"
import { updateUser } from "@/redux/slices/article-data"


let data = {
    "Hindi": { value: "Hindi" },
    "English": { value: "English" },
}


export function Hi_En_SelectBoxesforPath() {

    const dispatch = useDispatch()
    const ArticlesData = useSelector((state) => state.ArticlesData)
    const schange = (value) => {
        dispatch(updateUser({ if_not_lang: value }))
    }

    return (
        <>
            {ArticlesData.AuthorProfile && ArticlesData.AuthorProfile != "" && ArticlesData.AuthorProfile.lang == false ?

                <Select onValueChange={(value) => schange(value)}>
                    <SelectTrigger className="w-[280px]">
                        <SelectValue placeholder="Select Lang for Faq" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {Object.values(data).map((data, index) => {
                                return (
                                    <SelectItem key={index} value={data.value} >{data.value}</SelectItem>
                                );
                            })}
                        </SelectGroup>
                    </SelectContent>
                </Select> :
                ""

            }
        </>
    );
}
