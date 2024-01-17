import { ClipboardCopyIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"


export function CopyButton({children}) {

  const { toast } = useToast()
  
  const copyToClipboard = async () => {
    try {
      // Get the text content from the hidden p element
      const textToCopy = document.querySelector('.hidden-text a').outerHTML;
      // Use the Clipboard API to copy the text
      await navigator.clipboard.writeText(textToCopy);

      alert('Text successfully copied to clipboard');
    } catch (error) {
      console.error('Unable to copy text to clipboard', error);
    }
  };

  return (
    <Button variant="outline" onClick={copyToClipboard} size="icon">
      <ClipboardCopyIcon className="h-4 w-4" />
      <p className="hidden hidden-text">{children}</p>
    </Button>
  )
}
