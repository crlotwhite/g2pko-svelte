import { ONSET, CODA, VOWEL } from './constant';

function g2p(text: string): string {
    text = diphthong(text);
    text = lenition(text);
    text = clusterSimplification1(text);
    text = clusterSimplification2(text);
    text = aspiration(text);
    return text;
}

// Rule 5. Diphthong Runle
function diphthong(text: string): string {
    text = text.replaceAll(new RegExp(`(?<=[^${ONSET['ㅇ']}${ONSET['ㄹ']}])${VOWEL['ㅖ']}`, 'g'), VOWEL['ㅔ']);
    text = text.replaceAll(new RegExp(`(?<=[^${ONSET['ㅇ']}])${VOWEL['ㅢ']}`, 'g'), VOWEL['ㅣ']);
    return text;
}

// Rule 9. Lenition of plain stops
function lenition(text: string): string {
    const pair = [
        { from: `${CODA['ㄲ']}${CODA['ㅋ']}`, to: CODA['ㄱ'] },
        { from: `${CODA['ㅅ']}${CODA['ㅆ']}${CODA['ㅈ']}${CODA['ㅊ']}${CODA['ㅌ']}`, to: CODA['ㄷ'] },
        { from: `${CODA['ㅍ']}`, to: CODA['ㅂ'] },
    ];

    for (const { from, to } of pair) {
        text = text.replaceAll(new RegExp(`${from}(?!${ONSET['ㅇ']})|${from}$|${from}(?=[\\s\\.\\!\\?])`, 'g'), to);
    }

    return text;
}

// Rule 10. Consonant Cluster Simplification 1
function clusterSimplification1(text: string): string {
    const pair = [
        { from: `${ONSET['ㅂ']}${VOWEL['ㅏ']}${CODA['ㄼ']}`, to: `${ONSET['ㅂ']}${VOWEL['ㅏ']}${CODA['ㅂ']}` },
        { from: `${ONSET['ㄴ']}${VOWEL['ㅓ']}${CODA['ㄼ']}`, to: `${ONSET['ㄴ']}${VOWEL['ㅓ']}${CODA['ㅂ']}` },
        { from: `${CODA['ㄳ']}`, to: CODA['ㄱ'] },
        { from: `${CODA['ㄵ']}`, to: CODA['ㄴ'] },
        { from: `${CODA['ㄼ']}${CODA['ㄽ']}${CODA['ㄾ']}`, to: CODA['ㄹ'] },
        { from : `${CODA['ㅄ']}`, to: CODA['ㅂ'] },
    ];

    for (const { from, to } of pair) {
        text = text.replaceAll(new RegExp(`${from}(?!${ONSET['ㅇ']})|${from}$|${from}(?=[\\s\\.\\!\\?])`, 'g'), to);
    }

    return text;
}

// Rule 11. Consonant Cluster Simplification 2
function clusterSimplification2(text: string): string {
    const pair = [
        { from: `${CODA['ㄺ']}`, to: `${CODA['ㄱ']}` },
        { from: `${CODA['ㄻ']}`, to: `${CODA['ㅁ']}` },
        { from: `${CODA['ㄿ']}`, to: `${CODA['ㅂ']}` },
    ];

    for (const { from, to } of pair) {
        text = text.replaceAll(new RegExp(`${from}(?!${ONSET['ㅇ']})|${from}$|${from}(?=[\\s\\.\\!\\?])`, 'g'), to);
    }

    return text;
}

// Rule 12. Aspiration of stops
function aspiration(text: string): string {
    const group1 = [
        { from1: CODA['ㅎ'], to1: '' },
        { from1: CODA['ㄶ'], to1: CODA['ㄴ'] },
        { from1: CODA['ㅀ'], to1: CODA['ㄹ'] },
    ]
    const group2 = [
        { from2: ONSET['ㄱ'], to2: CODA['ㅋ'] },
        { from2: ONSET['ㄷ'], to2: CODA['ㅌ'] },
        { from2: ONSET['ㅈ'], to2: CODA['ㅊ'] },
        { from2: ONSET['ㅅ'], to2: CODA['ㅆ'] },
    ]

    for (const { from1, to1 } of group1) {
        for (const { from2, to2 } of group2) {
            text = text.replaceAll(new RegExp(`${from1}${from2}`, 'g'), `${to1}${to2}`);
        }
    }

    const pair = [
        { from: `${CODA['ㄱ']}`, to: ONSET['ㅋ'] },
        { from: `${CODA['ㄷ']}`, to: ONSET['ㅌ'] },
        { from: `${CODA['ㅂ']}`, to: ONSET['ㅍ'] },
        { from: `${CODA['ㅈ']}`, to: ONSET['ㅊ'] },
        { from: `${CODA['ㄺ']}`, to: `${CODA['ㄹ']}${ONSET['ㅋ']}` },
        { from: `${CODA['ㄼ']}`, to: `${CODA['ㄹ']}${ONSET['ㅍ']}` },
        { from: `${CODA['ㄵ']}`, to: `${CODA['ㄴ']}${ONSET['ㅊ']}` },
    ]

    for (const { from, to } of pair) {
        text = text.replaceAll(new RegExp(`${from}${ONSET['ㅎ']}`, 'g'), to);
    }

    text = text.replaceAll(new RegExp(`${CODA['ㅎ']}(?:(?=${ONSET['ㄴ']})|(?=${ONSET['ㅇ']}))`, 'g'), CODA['ㄴ']);
    text = text.replaceAll(new RegExp(`${CODA['ㄶ']}(?:(?=${ONSET['ㄴ']})|(?=${ONSET['ㅇ']}))`, 'g'), CODA['ㄴ']);
    text = text.replaceAll(new RegExp(`${CODA['ㅀ']}(?:(?=${ONSET['ㄴ']})|(?=${ONSET['ㅇ']}))`, 'g'), CODA['ㄹ']);


    for (const { from, to } of pair) {
        text = text.replaceAll(new RegExp(`${from}(?!${ONSET['ㅇ']})|${from}$|${from}(?=[\\s\\.\\!\\?])`, 'g'), to);
    }

    return text;
}

// Rule 13. Liaison Rule
function liaison(text: string): string {
    const codas = Object.keys(CODA);
    const onsets = Object.keys(ONSET);

    for (const coda of codas) {
        if (onsets.includes(coda)) {
            text = text.replaceAll(new RegExp(`${CODA[coda]}${ONSET['ㅇ']}`, 'g'), ONSET[coda]);
        }
    }

    const pair = [
        { from: CODA['ㄳ'], to: `${CODA['ㄱ']}${ONSET['ㅆ']}` },
        { from: CODA['ㄵ'], to: `${CODA['ㄴ']}${ONSET['ㅈ']}` },
        { from: CODA['ㄺ'], to: `${CODA['ㄹ']}${ONSET['ㄱ']}` },
        { from: CODA['ㄻ'], to: `${CODA['ㄹ']}${ONSET['ㅁ']}` },
        { from: CODA['ㄽ'], to: `${CODA['ㄹ']}${ONSET['ㅆ']}` },
        { from: CODA['ㄾ'], to: `${CODA['ㄹ']}${ONSET['ㅌ']}` },
        { from: CODA['ㄿ'], to: `${CODA['ㄹ']}${ONSET['ㅍ']}` },
        { from: CODA['ㅄ'], to: `${CODA['ㅂ']}${ONSET['ㅆ']}` },
    ];

    for (const { from, to } of pair) {
        text = text.replaceAll(new RegExp(`${from}${ONSET['ㅇ']}`, 'g'), to);
    }

    return text;
}

// Ru

// Rule Tensification

export { g2p };