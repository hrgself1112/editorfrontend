"use client";
import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "@/redux/slices/article-data";
import { extractFileNamesFromUrls } from "@/function/extractFileName";
import { getTitleAndMeta, utilsCleaner } from "@/function/extractcleandata";
import { FAQS } from "@/app/article/processedFaq";
import { processed_Content,} from "@/app/article/processContent";
import { schemaData } from "@/data/data";
import { useToast } from "@/components/ui/use-toast"

const TinyMceEditor = () => {
  const { toast } = useToast()
  const editorRef = useRef(null);
  const dispatch = useDispatch();
  const [localStorages, setdata] = useState("dark");

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

function finaliseContent (){
  if(getCleanedContent() == ""){
      toast({
        title: "Content Box is Empty",
        description: "Enter Something in box",
      })
  }
  else if(ArticlesData.path == ""){
    toast({
      title: "Select Article Type",
      description: "Enter Something in box",
    })
  
  }
  else if(ArticlesData.AuthorProfile == ""){
    toast({
      title: "Select Auhtor",
      description: "Enter Something in box",
    })

  }
  else{
    setMetaAndDataToRedux()
}

  
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
    <div         className="max-sm:mx-2">

      <Editor
        apiKey="ukp011qdo98a3trdt1pioac8ckm1chcarn52oalmcaxiq4qg"
        onInit={(evt, editor) => {
          editorRef.current = editor;
        }}

        initialValue={ArticlesData.content}
        init={{
          // change theme from here
          skin: localStorages  == "dark" ? "oxide-dark": "oxide",
          content_css: localStorages == "dark" ? "dark" : "default",
          quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
                
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
            valid_elements : "@[id|class|style|title|lang|xml::lang|onclick|ondblclick|"
          + "onmousedown|onmouseup|onmouseover|onmousemove|onmouseout|onkeypress|"
          + "onkeydown|onkeyup],a[rel|rev|charset|hreflang|tabindex|accesskey|type|"
          + "name|href|target|title|class|onfocus|onblur],strong/b,em/i,strike,u,"
          + "#p,-ol[type|compact],-ul[type|compact],-li,br,img[longdesc|usemap|"
          + "src|border|alt=|title|hspace|vspace|width|height|align],-sub,-sup,"
          + "-blockquote,-table[border=0|cellspacing|cellpadding|width|frame|rules|"
          + "height|align|summary|bgcolor|background|bordercolor],-tr[rowspan|width|"
          + "height|align|valign|bgcolor|background|bordercolor],tbody,thead,tfoot,"
          + "#td[colspan|rowspan|width|height|align|valign|bgcolor|background|bordercolor"
          + "|scope],#th[colspan|rowspan|width|height|align|valign|scope],caption,-div,"
          + "-code,-pre,address,-h1,-h2,-h3,-h4,-strong ,-h5,-h6,hr[size|noshade],-font[face"
          + "|size|color],dd,dl,dt,cite,abbr,acronym,del[datetime|cite],ins[datetime|cite],"
          + "object[classid|width|height|codebase|*],param[name|value|_value],embed[type|width"
          + "|height|src|*],script[src|type],map[name],area[shape|coords|href|alt|target],bdo,"
          + "button,col[align|char|charoff|span|valign|width],colgroup[align|char|charoff|span|"
          + "valign|width],dfn,fieldset,form[action|accept|accept-charset|enctype|method],"
          + "input[accept|alt|checked|disabled|maxlength|name|readonly|size|src|type|value],"
          + "kbd,label[for],legend,noscript,optgroup[label|disabled],option[disabled|label|selected|value],"
          + "q[cite],samp,select[disabled|multiple|name|size],small,"
          + "textarea[cols|rows|disabled|name|readonly],tt,var,big" , 
    
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
    </div>


      
      <div className="my-3 mx-2">
      <Button className="lg:w-[14rem] max-sm:w-full" onClick={() => finaliseContent()}>Finalise Content</Button>
      </div>

    </>
  );
};

export default TinyMceEditor;
