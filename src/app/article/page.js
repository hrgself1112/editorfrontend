"use client"
import { Hi_En_SelectBoxesforPath } from '@/components/hi_en_select'
import { SelectBoxes } from '@/components/authorselect'
import { SelectBoxesforPath } from '@/components/selectpath'
import { TextAreaBox } from '@/components/text-area'
import ThemeChangeButtons from '@/components/buttons/theme-button/theme-change-buttons'
import TinyMceEditor from '@/components/tiny-editor-mce/tiny-editor-mce'
import Resetbtn from '@/components/buttons/reset-btn/reset-btn'
import Submitbtn from '@/components/buttons/submit-btn/submit-btn'
import { TableDemo } from './data-table/data-table'

const page = () => {

  return (
    <div>
      <ThemeChangeButtons />
      <TinyMceEditor />

      <div className='flex' style={{ gap: "10px", padding: '0px 10px' }}>
        <SelectBoxesforPath />
        <SelectBoxes />
        <Hi_En_SelectBoxesforPath />
      </div>
      <TextAreaBox />

      <div className="my-3">
      <Submitbtn />
      <Resetbtn />
      </div>
      
      <hr/>

<TableDemo/>

    </div>
  )
}

export default page