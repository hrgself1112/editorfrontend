
export function extractFileNamesFromUrls(urls) {
    const parts = urls.split("/");
    return parts[parts.length - 1];
}

