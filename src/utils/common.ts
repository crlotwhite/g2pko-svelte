const HANGUL_OFFSET = 0xac00;
const ONSET_OFFSET = 0x10ff;
const NUCLEUS_OFFSET = 0x1160;
const CODA_OFFSET = 0x11a7;

// const ONSET = Array.from(
//     { length: 0x115F - 0x1100 },
//     (_, i) => String.fromCharCode(0x1100 + i)
// );
// const NUCLEUS = Array.from(
//   { length: 0x11A8 - 0x1161 },
//   (_, i) => String.fromCharCode(0x1161 + i)
// );
// const CODA = Array.from(
//     { length: 0x1200 - 0x11A8 },
//     (_, i) => String.fromCharCode(0x11A8 + i)
// );

function isHangul(text: string): boolean {
    if (text.length !== 1) return false;
    return /[가-힣]/.test(text);
}

function decompose(text: string): string {
    if (text.length === 0) return '';

    let charCode = text.charCodeAt(0);
    let base = charCode - HANGUL_OFFSET;
    let coda = base % 28;
    let nucleus = 1 + Math.floor(((base - coda) % 588) / 28);
    let onset = 1 + Math.floor(base / 588);
    if (coda !== 0) {
        return [
            String.fromCharCode(ONSET_OFFSET + onset),
            String.fromCharCode(NUCLEUS_OFFSET + nucleus),
            String.fromCharCode(CODA_OFFSET + coda)
        ].join('');
    } else {
        return [
            String.fromCharCode(ONSET_OFFSET + onset),
            String.fromCharCode(NUCLEUS_OFFSET + nucleus)
        ].join('');
    }
}

function compose(onset: string, nucleus: string, coda: string = ''): string {
    let onsetCode = onset.charCodeAt(0) - ONSET_OFFSET;
    let nucleusCode = nucleus.charCodeAt(0) - NUCLEUS_OFFSET;
    let codaCode = coda ? coda.charCodeAt(0) - CODA_OFFSET : 0;
    let charCode = HANGUL_OFFSET + 588 * onsetCode + 28 * nucleusCode + codaCode;
    return String.fromCharCode(charCode);
}

function decomposeAll(text: string): string {
    return text.split('').map(decompose).join('');
}

function composeAll(text: string): string {
    let result = '';
    for (let i = 0; i < text.length;) {
        if (text[i + 2].charCodeAt(0) >= 0x11A8) {
            result += compose(text[i], text[i + 1], text[i + 2]);
            i += 3;
        }
        else {
            result += compose(text[i], text[i + 1]);
            i += 2;
        }
    }
    return result;
}

export { isHangul, decompose, compose, decomposeAll, composeAll };