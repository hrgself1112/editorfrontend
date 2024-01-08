"use client";
import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "@/redux/slices/article-data";
import { extractFileNamesFromUrls } from "@/function/extractFileName";
import { getTitleAndMeta, utilsCleaner } from "@/function/extractcleandata";
import { FAQS } from "@/app/article/processedFaq";
import {
  addDivsContent,
  processed_Content,
  processed_Content_For_AMP,
} from "@/app/article/processContent";
import { schemaData } from "@/data/data";

const TinyMceEditor = () => {
  const editorRef = useRef(null);
  const dispatch = useDispatch();
  const [data, setdata] = useState("");

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
console.log(obj)
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

  const reudxd = () => {
    console.log(ArticlesData);
    // handleEditorChange()
  };
  const handleEditorChange = (content, editor) => {
    // Dispatch the action to update the TinyMCE content in the Redux store
    console.log(content);
    console.log(editor);
    dispatch(updateUser({ content: content }));
  };

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
      <Editor
        apiKey="ukp011qdo98a3trdt1pioac8ckm1chcarn52oalmcaxiq4qg"
        onInit={(evt, editor) => {
          editorRef.current = editor;
        }}
        initialValue={ArticlesData.content}
        // onChange={handleEditorChange}
        // value={ArticlesData.content}
        init={{
          // change theme from here
          // skin: window && window.matchMedia("(prefers-color-scheme: dark)").matches
          //   ? "oxide-dark"
          //   : "oxide",
          // content_css: window && window.matchMedia("(prefers-color-scheme: dark)").matches
          //   ? "dark"
          //   : "default",

          height: 500,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "link",
            "image",
            "lists",
            "charmap",
            "preview",
            "anchor",
            "pagebreak",
            "searchreplace",
            "wordcount",
            "visualblocks",
            "visualchars",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "emoticons",
            "template",
            "help",
          ],
          toolbar:
            "undo redo |  fontselect fontsizeselect formatselect | styles | bold italic | alignleft aligncenter alignright alignjustify | " +
            "bullist numlist outdent indent | link image | print preview media fullscreen | " +
            "forecolor backcolor emoticons | help",
          menu: {
            favs: {
              title: "My Favorites",
              items: "code visualaid | searchreplace | emoticons",
            },
          },
          menubar: "favs file edit view insert format tools table help",
        }}
      />

      <Button onClick={() => setMetaAndDataToRedux()}>Get Title</Button>
      <Button onClick={() => reudxd()}>see all</Button>
      {/* <pre>
        {ArticlesData.processedContentAMP && ArticlesData.processedContentAMP}
      </pre> */}
    </>
  );
};

export default TinyMceEditor;
