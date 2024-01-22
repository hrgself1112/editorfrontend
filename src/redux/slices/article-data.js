import {createSlice} from "@reduxjs/toolkit"


const initialState = {
   // in raw form or unprocessed data to resend into the client machine to update or modification;
    title:"",
    description:"",
    keywords:"",
    url:"",
    h1:"",
    content:"",
    imageurl:"",
    imagealt:"",
    path:"",
    faq:"",
    faqlasttext:"",
    if_not_lang:"",
    // processed data to send to backend template to generate the page and download; 
    processedContentNAMP:"",
    processedContentAMP:"",

    processedFaqNAMP:"",
    processedFaqAMP:"",
    
    AuthorProfile:'',
    schemaProfile:'',
    // 

}





const articleData = createSlice({
    name:"ArticleData" ,
    initialState , 
    reducers:{
        updateUser: (state, action) => {
            return { ...state, ...action.payload };
          },
          resetUser:()=>{
            return initialState
          }
    },
});


export const {updateUser , resetUser} = articleData.actions;
export default articleData.reducer;