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
import { data } from "@/data/data"


export function SelectBoxes() {
    
    const dispatch = useDispatch()
    const ArticlesData = useSelector((state)=>state.ArticlesData)

    const schange = (value) => {
        let profile = data[value]
        console.log(profile);
let {uniqueFindingKey ,uniqueKey ,searchTamil ,profilename ,profileUrl ,profileImageUrl ,FaqLangH2} = profile

dispatch(updateUser({AuthorProfile:profile}))
}
    
    
  return (
    <Select onValueChange={(value) => schange(value)}>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select Author" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>North America</SelectLabel>
          {Object.values(data).map((data , index) => {
            return (
              <SelectItem key={index} value={data.uniqueKey} >{data.profilename}</SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
