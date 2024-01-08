import { useSelector } from "react-redux";

const cheerio = require("cheerio");

function contentEditor(content, after_first_para) {
  // Your HTML string with 10 p tags
  const htmlString = content;

  const $ = cheerio.load(htmlString, { xmlMode: true });

  // Select the first <p> tag and insert content after it
  $("p:first-child").after(after_first_para);

  // Get the modified HTML
  const modifiedHtml = $.html();
  //  modifiedHtml.remove("html")

  return modifiedHtml;
}

function imgfornonamp(path, imageurl, imagealt) {
  const img = `
    <div align="center"> 
        <img src="/${path}/images/${imageurl}" alt="${imagealt}" class="img-responsive" />
    </div><br />
    `;
  return img;
}

function imgforamp(path, imageurl, imagealt) {
  const img = `
    <div> 
        <amp-img src="/${path}/images/${imageurl}" alt="${imagealt}" layout="responsive" width="1280" height="720"></amp-img>
    </div> <br>`;
  return img;
}

function addDivsContent(html ,  ArticlesData , amp) {
  const sections = html.split("<h2>");

  const filteredSections = sections.filter(
    (section) => section.trim().length > 0
  );

  let a = filteredSections.map((section, index) => {
    
    if (index == 0) {
      if(ArticlesData.imageurl != ""){
        console.log(ArticlesData.imageurl)
        return `<div class="card-view-content">${section
          .split("<p>")
          .map((p, pIndex) => {
            if (pIndex === 1) {
  
              if(amp == false){
  
                return `${p} 
                <div align="center"> 
                <img src="/${ArticlesData.path}/images/${ArticlesData.imageurl}" alt="${ArticlesData.imagealt}" class="img-responsive" />
                </div><br />
                `;
              }else{
                
                
                return `${p} 
                <div> 
                <amp-img src="/${ArticlesData.path}/images/${ArticlesData.imageurl}" alt="${ArticlesData.imagealt}" layout="responsive" width="1280" height="720"></amp-img>
            </div> <br>
                `;
              }
            }
            return p;
          }).join("<p>")}</div>`;
      }else{
        return `<div class="card-view-content">${section}</div>`;
      }
      
    } 
    else {
      return `<div class="card-view-content"><h2>${section}</div>`;
    }
  });
  console.log(a);

  return a;
}

 function Processed_Content_For_Non_AMP() {
  const ArticlesData = useSelector((state) => state.ArticlesData);
  let a = addDivsContent(ArticlesData.content , ArticlesData ,false);
  return a;
}
 function Unprocessed_Content() {
  const a = useSelector((state) => state.ArticlesData);
  return a;
}

 function Processed_Content_For_AMP() {
  const ArticlesData = useSelector((state) => state.ArticlesData);
  let a = addDivsContent(ArticlesData.content , ArticlesData , true);
  return a
}



export function processed_Content(){
  let AmpContent = Processed_Content_For_AMP()
  let NonAmpContent = Processed_Content_For_Non_AMP()
  let Rawcontent = Unprocessed_Content()

  return [AmpContent,NonAmpContent , Rawcontent]
}