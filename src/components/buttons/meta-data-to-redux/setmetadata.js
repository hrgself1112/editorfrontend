"use client"
import { Button } from '@/components/ui/button';
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
    addDivsContent,
    processed_Content,
    processed_Content_For_AMP,
  } from "@/app/article/processContent";
  import { schemaData } from "@/data/data";

  const Setmetadata = () => {

    const editorRef = useRef(null);
    const dispatch = useDispatch();
    useEffect(() => {
      setdata(localStorage.getItem("theme"))
    
    }, [])
    
  
    const ArticlesData = useSelector((state) => state.ArticlesData);
    
  
    function getCleanedContent() {
      if (editorRef.current) {
        var sourceCode = editorRef.current.getContent();
      }
      let content = sourceCode
        .replace(/(&nbsp;|&#160;|&amp;)+/g, "")
        .replace(/<p[^>]*dir="ltr"[^>]*>/g, "<p>")
        .replace(/<h2[^>]*dir="ltr"[^>]*>/g, "<h2>")
        .replace(/<p><strong><\/strong><\/p>/g, "");
  
      return content;
    }
  
    let [AmpContent, NonAmpContent] = processed_Content();
  
    function setMetaAndDataToRedux() {
      let [resultObject, cleanedContent] = getTitleAndMeta(getCleanedContent());
      let { Title, Description, Keywords, URL, H1 } = resultObject;
      let [FAQNAMP, FAQAMP] = FAQS(ArticlesData.faq);
    
      let paths  = ArticlesData.AuthorProfile
      let schema = schemaData[paths.uniqueKey]
      
      let {path,text,faqheading} = schema
      
      
      if(schema.lang == false){
      if(ArticlesData.path == "Transits"){
       if(ArticlesData.if_not_lang=="English"){
          path="transits"
          text="Home , Gochar"
          faqheading="Frequently Asked Questions:"
        }
        else if(ArticlesData.if_not_lang=="Hindi"){
  
          path="gochar"
          text="होम ,  गोचर"
          faqheading="अक्सर पूछे जाने वाले प्रश्न"
        } 
      }
      else if (ArticlesData.path == "2024"){
      if(ArticlesData.if_not_lang=="English"){
          path="2024"
          text="Home , 2024"
          faqheading="Frequently Asked Questions:"
        }
        else if(ArticlesData.if_not_lang=="Hindi"){
  
          path="2024"
          text="होम ,  2024"
          faqheading="अक्सर पूछे जाने वाले प्रश्न"
        } 
      }
     }
     else if (schema.lang == true){
      if(ArticlesData.path == "2024"){
        let early = text.split(",")[0]
        console.log(early);
        path="2024"
        text = `${early} , 2024`
      }
  
     }
  
  
  let obj = {
    path:path,
    text:text,
    faqheading:faqheading
  }
  
      dispatch(
        updateUser({
          ...ArticlesData,
          title: Title,
          description: Description,
          keywords: Keywords,
          url: extractFileNamesFromUrls(URL),
          h1: H1,
          content: utilsCleaner(cleanedContent),
  
          processedFaqNAMP: FAQNAMP,
          processedFaqAMP: FAQAMP,
  
          processedContentNAMP: NonAmpContent,
          processedContentAMP: AmpContent,
          schemaProfile: obj,
        })
      );
    }
  
  
    useEffect(() => {
      dispatch(
        updateUser({
          ...ArticlesData,
          processedContentNAMP: NonAmpContent.join(""),
          processedContentAMP: AmpContent.join(""),
        })
      );
  
    }, [ArticlesData.content]);
  
  return (
    <>

    <div className="my-2">
      <Button className="lg:w-[14rem] max-sm:w-full" onClick={() => setMetaAndDataToRedux()}>Finalise Content</Button>
      </div>

    </>
  )
}

export default Setmetadata