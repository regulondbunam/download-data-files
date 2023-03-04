export default class FastaFormat {

    constructor(sequence) {
        this.sequence = sequence
        this.size = sequence.length
        this.formatSequence = ''
        this.Format(sequence)
    }

    Format(sequence) {
        this.count = 0
        this.formatSequence = [].map.call(sequence, (x, index) => {
            this.count += 1
            if (this.count === 60) {
                this.count = 0;
                return `${x}<br>`
            } else {
                return x;
            }
        }).join('')
    }
}
