
export function extractFileNamesFromUrls(urls) {
    console.log(urls)
    const parts = urls.split("/");
    return parts[parts.length - 1];
}

