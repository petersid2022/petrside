function isWord(str: string) { // Use lowercase 'string' instead of 'String'
    let alphaNumericFound = false;
    for (let i = 0; i < str.length; i++) {
        const code = str.charCodeAt(i);
        if ((code > 47 && code < 58) || // numeric (0-9)
            (code > 64 && code < 91) || // upper alpha (A-Z)
            (code > 96 && code < 123)) { // lower alpha (a-z)
            alphaNumericFound = true;
            return alphaNumericFound;
        }
    }
    return alphaNumericFound;
}

export default function WordCount({ input }: { input: string }) {
    const text = input.split(/\s+/)
    let wordCount = 0
    for (let i = 0; i < text.length; i++) {
        if (text[i] !== ' ' && isWord(text[i])) {
            wordCount++
        }
    }
    return Math.ceil((wordCount/225))
}
