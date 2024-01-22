function formatQuestionAnswer(item, isLast) {
  const questionAnswer = `
    {
      "@type": "Question",
      "name": "${item.question}",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "${item.answer}"
      }
    }`;

  return isLast ? questionAnswer : `${questionAnswer},`;
}
function Ampshield  (result){
  const amps = `
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [${result}]
}
</script>
`
return amps
}
function NonAmpshield  (result){
  const nonamps = `\t<div class="card-view-content">
  <h2></h2>
  <div itemscope itemtype="https://schema.org/FAQPage">
    ${result}
    </div>
     lastFaqText
    </div>  
`
return nonamps
}
function formatHtmlQuestionAnswer(item) {
  return `
    <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
      <h3 itemprop="name">${item.question}</h3>
      <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
        <div itemprop="text">
          <p>${item.answer}</p>
        </div>
      </div>
    </div>`;
}
function faqMap(data) {
  const lines = data.split("\n");
  const FAQ = [];

  // Loop through the lines to extract questions and answers
  for (let i = 0; i < lines.length; i += 2) {
    if (lines[i].startsWith("/q+")) {
      const question = lines[i].substring(3); // Remove "/q+"
      const answer = lines[i + 1].substring(3); // Remove "/a+"
      FAQ.push({ question, answer });
    }
  }

  return FAQ;
}

 function Processed_Faq_for_Non_AMP(data) {
  const FAQ = faqMap(data);
  const articles = FAQ.map((item, index) => formatHtmlQuestionAnswer(item)).join('');
 const result  = NonAmpshield(articles)
  return result
}

 function Processed_Faq_Non_AMP(data) {
  const FAQ = faqMap(data);
  const articles = FAQ.map((item, index) => formatQuestionAnswer(item, index === FAQ.length - 1)).join('');
  let result  = Ampshield(articles)
  return result;
}

export function FAQS(data){
  const FAQNAMP = Processed_Faq_for_Non_AMP(data)
  const FAQAMP = Processed_Faq_Non_AMP(data)

  return [FAQNAMP,FAQAMP]
} 

