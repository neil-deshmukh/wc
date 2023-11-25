const { argv } = require('node:process')
const { crawlpage } = require('./crawl.js')

function main(){
    if(argv.length == 3){
        console.log(crawlpage(argv[2], argv[2], {}))
        return
    }
    console.error('Error!!! wrong number of arguments given.')
}

main()