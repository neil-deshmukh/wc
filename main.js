const { argv } = require('node:process')
const { crawlpage } = require('./crawl.js')

async function main(){
    if(argv.length == 3){
        let pages = await crawlpage(argv[2], argv[2], {})
        for(let url in pages){
            console.log(`${url}: ${pages[url]}`)
        }
        return
    }
    console.error('Error!!! wrong number of arguments given.')
}

main()