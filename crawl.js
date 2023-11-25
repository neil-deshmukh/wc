function normalizeURL(url){
    let urlObj = new URL(url)
    let hostpath = `${urlObj.hostname}${urlObj.pathname}`
    if(hostpath.slice(-1) == '/'){
        hostpath = hostpath.slice(0, -1)
    }
    return hostpath
}

function geturlfromhtml(htmlbody, baseURL){
    const jsdom = require('jsdom')
    const { JSDOM } = jsdom
    let dom = new JSDOM(htmlbody)
    allas = dom.window.document.querySelectorAll('a')
    urls = []
    for(let as of allas){
        if(as.href[0] == '/'){
            try {
                urlObj = new URL(`${baseURL}${as.href}`)
                urls.push(urlObj.href)
            } catch(err) {
                console.log(`Some thing went wrong in relative url section: ${err.message}`)
            }
        } else{
            try {
                urlObj = new URL(as.href)
                urls.push(urlObj.href)
            } catch(err) {
                console.log(`Some thing went wrong in absolute url section: ${err.message}`)
            }
        }
    }
    return urls
}

async function crawlpage(baseURL, curURL, pages){
}

module.exports = {
    normalizeURL,
    geturlfromhtml,
    crawlpage
}