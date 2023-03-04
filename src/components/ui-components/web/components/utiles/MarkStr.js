const ignorWords = ['or','and','OR','AND']

export default function Mark(keyword, text) {
    try {
        const srchArray = keyword.split(' ')
        return SearchArray(srchArray,text)
    } catch (error) {
        console.log(error)
        return text
    }

}

export function MarckScore(keyword, text){
    try {
        const scoreText = text.length
        const srchArray = keyword.split(' ')
        const af = SearchArray(srchArray,text,true)
        let scoreKeyword = 0
        af.map((n)=>{
            if(n>0){
                scoreKeyword =+ n
            }
            return null
        })
        //console.log(scoreKeyword)
        return scoreKeyword*100/scoreText
        
    } catch (error) {
        console.warn(error)
        return -1
    }
}

function SearchArray(srchArray,text,isScore = false){
    const af = srchArray.map((word)=>{
        if(ignorWords.find(e => e === word)){
            return 0
        }
        const index = text.toLowerCase().indexOf(word.toLowerCase())
        const end = word.length+index
        if(index<0){
            return 0
        }
        text = text.slice(0,end)+'</b>'+text.slice(end,text.length)
        text = text.slice(0,index)+'<b>'+text.slice(index,text.length)
        return end - index
    })
    if(isScore){
        return af
    }
    return text
}
/*
aaeR gene; synonyms: yhcS,qseA; products: LysR-type transcriptional regulator AaeR,

*/