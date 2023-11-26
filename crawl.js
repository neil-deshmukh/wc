// let contype = res.headers.get('Content-Type')
// if(!contype.includes('text/html')) {
//     console.log(`Error! Non html response found`)
//     return pages
// }

function normalizeURL(url){
    let urlObj = new URL(url)
    let hostpath = `${urlObj.hostname}${urlObj.pathname}`
    if(hostpath.length = 0 && hostpath.slice(-1) == '/'){
        hostpath = hostpath.slice(0, -1)
    }
    return hostpath
}

function geturlfromhtml(htmlbody, baseURL){
    const jsdom = require('jsdom')
    const { JSDOM } = jsdom
    let dom = new JSDOM(htmlbody)
    let allas = dom.window.document.querySelectorAll('a')
    let urls = []
    for(let as of allas){
        if(as.href[0] == '/'){
            try {
                let urlObj = new URL(`${baseURL}${as.href}`)
                urls.push(urlObj.href)
            } catch(err) {
                console.log(`Some thing went wrong in relative url section: ${err.message}`)
            }
        } else{
            try {
                let urlObj = new URL(as.href)
                urls.push(urlObj.href)
            } catch(err) {
                console.log(`Some thing went wrong in absolute url section: ${err.message}`)
            }
        }
    }
    return urls
}

async function crawlpage(baseURL, curURL, pages){
    if(!normalizeURL(curURL).includes(normalizeURL(baseURL))){
        return pages
    }
    let normalizedCurUrl = normalizeURL(curURL)
    if(normalizedCurUrl in pages){
        pages[normalizedCurUrl] = pages[normalizedCurUrl] + 1;
        return pages
    }
    pages[normalizedCurUrl] = 1;

    console.log(`actively crawling ${curURL}`)
    try {
        let res = await fetch(curURL)

        if(res.status > 399){
            console.log(`Error! in fetching with status code: ${res.status}`)
            return pages
        }

        let htmlstr = await res.text()

        let allUrls = geturlfromhtml(htmlstr, baseURL)

        for(let url of allUrls){
            pages = await crawlpage(baseURL, url, pages)
        }
    } catch(err) {
        console.log(`Something went wrong while fetching: ${err.message}`)
    }
    return pages
}

module.exports = {
    normalizeURL,
    geturlfromhtml,
    crawlpage
}