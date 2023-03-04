export default class GeneBankFormat {

    constructor(sequence) {
        this.sequence = sequence
        this.size = sequence.length
        this.formatSequence = ''
        this.Format(sequence)
    }
    /*
        01 gatcctccat atacaacggt atctccacct caggtttaga tctcaacaac ggaaccattg
        61 ccgacatgag acagttaggt atcgtcgaga gttacaagct aaaacgagca gtagtcagct
    */

    Format(sequence) {
        const size = sequence.length
        const spaceNumber = size.toString().length
        let count = 0, innerCount = 0, line = ''
        this.formatSequence = [].map.call(sequence, (x, index) => {
            count += 1
            innerCount += 1
            line = ''
            if(count===1){
               // console.log(spaceNumber)
                for(let i = 0; i<spaceNumber-(index.toString().length);i++){
                    line += "&nbsp;"
                }
                return `\t${line}${index+1} ${x}`
            }
            if (count === 60) {
                count = 0;
                innerCount = 0
                return `${x}<br>`
            }
            if (innerCount === 10){
                innerCount = 0
                return `${x} `
            } 
            return x;
        }).join('')
    }
}