function normalizeURL(url){
    url = url.replace('https://', '')
    url = url.replace('http://', '')
    url = url.replace('mailto:', '')
    urlletters = url.split('')
    if(urlletters[urlletters.length-1] == '/'){
        urlletters = urlletters.slice(0, -1)
    }
    url = urlletters.join('')
    return url
}

function geturlfromhtml(htmlbody, baseURL){
    const jsdom = require('jsdom')
    const { JSDOM } = jsdom
    let dom = new JSDOM(htmlbody)
    allas = dom.window.document.querySelectorAll('a')
    urls = []
    for(let as of allas){
        if(as.href.includes('https') || as.href.includes('http') || as.href.includes('mailto')){
            urls.push(as.href)
        } else{
            urls.push(`${baseURL}${as.href}`)
        }
    }
    return urls
}

async function crawlpage(baseURL, curURL, pages){
    if(normalizeURL(curURL).includes(normalizeURL(baseURL))){
        0;
    } else {
        return pages
    }
    const result = await fetch(curURL)
    const htmlstr = await result.text()
    let urls = geturlfromhtml(htmlstr, curURL)

        
    for(let url of urls){
        if(pages[url]){
            pages[url] = pages[url]++
        } else{
            pages[url] = '55' + 1
        }
        
        pages = await crawlpage(baseURL, url, pages)
    }
    return pages
}

module.exports = {
    normalizeURL,
    geturlfromhtml,
    crawlpage
}