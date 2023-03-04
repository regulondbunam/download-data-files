import FastaFormat from './FastaFormat'
import GenBankFormat from './GenBankFormat'
import CountElements from './CountElements'

function sequence(
    elemtType = 'nan',
    sequence,
    format,
    header = '',
    countElements = false
) {
    let seq
    let infoseq = ''
    if (countElements && elemtType === 'gene') {
        let size = 0
        let elements = CountElements(sequence)
        infoseq = elements.map((element) => {
            size += element.n
            return `${element.l}:${element.n} `
        }).join(' ')
        infoseq = `size:${size} ${infoseq}`
    }
    switch (format) {
        case 'fasta':
            seq = new FastaFormat(sequence)
            return (
                `
                    ${header}<br>
                    ${infoseq}<br>
                    ${seq.formatSequence}
                    `
            )
        case 'genbank':
            seq = new GenBankFormat(sequence)
            return (
                `
                ${header}<br>
                ${infoseq}<br>
                ${seq.formatSequence}
                `
            )
        default:
            return ""
    }
}

export default sequence;
