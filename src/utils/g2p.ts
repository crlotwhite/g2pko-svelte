import { ONSET, CODA, VOWEL } from './constant';
import { decomposeAll } from './common';

function g2p(text: string): string {
    text = exceptionWords(text);
    text = diphthong(text);
    text = liaison(text);
    text = palatalization(text);
    text = liquidToNasalAssimilation(text);
    text = nasalization(text);
    text = nasalInsertion(text);
    text = lateralization(text);
    text = tensification(text);
    text = epenthesis(text);
    text = lenition(text);
    text = clusterSimplification1(text);
    text = clusterSimplification2(text);
    text = aspiration(text);
    return text;
}

function exceptionWords(text: string): string {
    const pair = [
        { from: decomposeAll('의견란'), to: decomposeAll('의견난') },
        { from: decomposeAll('임진란'), to: decomposeAll('임진난') },
        { from: decomposeAll('생산량'), to: decomposeAll('생산냥') },
        { from: decomposeAll('결단력'), to: decomposeAll('결딴녁') },
        { from: decomposeAll('공권력'), to: decomposeAll('공꿘녁') },
        { from: decomposeAll('동원령'), to: decomposeAll('동원녕') },
        { from: decomposeAll('상견례'), to: decomposeAll('상견녜') },
        { from: decomposeAll('횡단로'), to: decomposeAll('횡단노') },
        { from: decomposeAll('이원론'), to: decomposeAll('이원논') },
        { from: decomposeAll('입원료'), to: decomposeAll('이붠뇨') },
        { from: decomposeAll('구근류'), to: decomposeAll('구근뉴') },
    ];

    for (const { from, to } of pair) {
        text = text.replaceAll(from, to);
    }

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

// Rule 13, 14, 15
function liaison(text: string): string {
    // Rule 15. Consonant Substitution with Liaison
    const pair1 = [
        { from: CODA['ㄲ'], to: ONSET['ㅋ'] },
        { from: CODA['ㅋ'], to: ONSET['ㅋ'] },
        { from: CODA['ㅅ'], to: ONSET['ㄷ'] },
        { from: CODA['ㅆ'], to: ONSET['ㄷ'] },
        { from: CODA['ㅈ'], to: ONSET['ㄷ'] },
        { from: CODA['ㅊ'], to: ONSET['ㄷ'] },
        { from: CODA['ㅌ'], to: ONSET['ㄷ'] },
        { from: CODA['ㅍ'], to: ONSET['ㅂ'] },
    ]

    for (const { from, to } of pair1) {
        text = text.replaceAll(new RegExp(`${from}${ONSET['ㅇ']}(?=[${VOWEL['ㅏ']}${VOWEL['ㅓ']}${VOWEL['ㅗ']}${VOWEL['ㅜ']}${VOWEL['ㅟ']}])`, 'g'), to);
    }

    // Rule 13. Liaison Rule
    const codas = Object.keys(CODA);
    const onsets = Object.keys(ONSET);

    for (const coda of codas) {
        if (onsets.includes(coda)) {
            text = text.replaceAll(new RegExp(`${CODA[coda]}${ONSET['ㅇ']}`, 'g'), ONSET[coda]);
        }
    }

    // Rule 14. Consonant Cluster
    const pair2 = [
        { from: CODA['ㄳ'], to: `${CODA['ㄱ']}${ONSET['ㅆ']}` },
        { from: CODA['ㄵ'], to: `${CODA['ㄴ']}${ONSET['ㅈ']}` },
        { from: CODA['ㄺ'], to: `${CODA['ㄹ']}${ONSET['ㄱ']}` },
        { from: CODA['ㄻ'], to: `${CODA['ㄹ']}${ONSET['ㅁ']}` },
        { from: CODA['ㄽ'], to: `${CODA['ㄹ']}${ONSET['ㅆ']}` },
        { from: CODA['ㄾ'], to: `${CODA['ㄹ']}${ONSET['ㅌ']}` },
        { from: CODA['ㄿ'], to: `${CODA['ㄹ']}${ONSET['ㅍ']}` },
        { from: CODA['ㅄ'], to: `${CODA['ㅂ']}${ONSET['ㅆ']}` },
    ];

    for (const { from, to } of pair2) {
        text = text.replaceAll(new RegExp(`${from}${ONSET['ㅇ']}`, 'g'), to);
    }

    return text;
}

// Rule 17. Palatalization
function palatalization(text: string): string {
    text = text.replaceAll(new RegExp(`${CODA['ㄷ']}(?=${ONSET['ㅇ']}${VOWEL['ㅣ']})`, 'g'), ONSET['ㅈ']);
    text = text.replaceAll(new RegExp(`${CODA['ㅌ']}(?=${ONSET['ㅇ']}${VOWEL['ㅣ']})`, 'g'), ONSET['ㅊ']);
    text = text.replaceAll(new RegExp(`${CODA['ㄾ']}(?=${ONSET['ㅇ']}${VOWEL['ㅣ']})`, 'g'), `${CODA['ㄹ']}${ONSET['ㅊ']}`);
    text = text.replaceAll(new RegExp(`${CODA['ㄷ']}(?=${ONSET['ㅎ']}${VOWEL['ㅣ']})`, 'g'), `${ONSET['ㅊ']}`);
    return text;
}

// Rule 18. Nasalization
function nasalization(text: string): string {
    text = text.replaceAll(new RegExp(`[${CODA['ㄱ']}${CODA['ㄲ']}${CODA['ㅋ']}${CODA['ㄳ']}${CODA['ㄺ']}](?=[${ONSET['ㄴ']}${ONSET['ㅁ']}])`, 'g'), `${CODA['ㅇ']}`);
    text = text.replaceAll(new RegExp(`[${CODA['ㄷ']}${CODA['ㅅ']}${CODA['ㅆ']}${CODA['ㅈ']}${CODA['ㅊ']}${CODA['ㅌ']}${CODA['ㅎ']}](?=[${ONSET['ㄴ']}${ONSET['ㅁ']}])`, 'g'), `${CODA['ㄴ']}`);
    text = text.replaceAll(new RegExp(`[${CODA['ㅂ']}${CODA['ㅍ']}${CODA['ㄼ']}${CODA['ㄿ']}${CODA['ㅄ']}](?=[${ONSET['ㄴ']}${ONSET['ㅁ']}])`, 'g'), `${CODA['ㅁ']}`);
    return text;
}

// Rule 19. Liquid-to-Nasal Assimilation
function liquidToNasalAssimilation(text: string): string {
    text = text.replaceAll(new RegExp(`(?<=[${CODA['ㅁ']}${CODA['ㅇ']}${CODA['ㄱ']}${CODA['ㅂ']}])${ONSET['ㄹ']}`, 'g'), `${CODA['ㄴ']}`);

    return text;
}

// Rule 20. Lateralization
function lateralization(text: string): string {
    text = text.replaceAll(new RegExp(`(?<=${CODA['ㄹ']})${ONSET['ㄴ']}`, 'g'), `${ONSET['ㄹ']}`);
    text = text.replaceAll(new RegExp(`${CODA['ㄴ']}(?=${ONSET['ㄹ']})`, 'g'), `${CODA['ㄹ']}`);
    text = text.replaceAll(new RegExp(`[${CODA['ㄾ']}${CODA['ㅀ']}]${ONSET['ㄴ']}`, 'g'), `${CODA['ㄹ']}${ONSET['ㄹ']}`);
    return text;
}

// Rule 23. Tensification
function tensification(text: string): string {
    const pair = [
        { from: ONSET['ㄱ'], to: ONSET['ㄲ'] },
        { from: ONSET['ㄷ'], to: ONSET['ㄸ'] },
        { from: ONSET['ㅂ'], to: ONSET['ㅃ'] },
        { from: ONSET['ㅅ'], to: ONSET['ㅆ'] },
        { from: ONSET['ㅈ'], to: ONSET['ㅉ'] },
    ];

    for (const { from, to } of pair) {
        text = text.replaceAll(new RegExp(`(?<=[${CODA['ㄱ']}${CODA['ㄲ']}${CODA['ㅋ']}${CODA['ㄳ']}${CODA['ㄺ']}])${from}`, 'g'), to);
        text = text.replaceAll(new RegExp(`(?<=[${CODA['ㄷ']}${CODA['ㅅ']}${CODA['ㅆ']}${CODA['ㅈ']}${CODA['ㅊ']}${CODA['ㅌ']}])${from}`, 'g'), to);
        text = text.replaceAll(new RegExp(`(?<=[${CODA['ㅂ']}${CODA['ㅍ']}${CODA['ㄼ']}${CODA['ㄿ']}${CODA['ㅄ']}])${from}`, 'g'), to);
    }

    // Rule 24.
    for (const { from, to } of pair) {
        if (from === ONSET['ㄱ'] || from === ONSET['ㅂ']) continue;
        text = text.replaceAll(new RegExp(`(?<=[${CODA['ㄴ']}${CODA['ㄵ']}${CODA['ㅁ']}${CODA['ㄻ']}])${from}`, 'g'), to);
    }

    text = text.replaceAll(new RegExp(`(?<=[${CODA['ㄴ']}${CODA['ㄵ']}${CODA['ㅁ']}${CODA['ㄻ']}])${ONSET['ㄱ']}(?!${VOWEL['ㅣ']})`, 'g'), ONSET['ㄲ']);

    // Rule 25.
    for (const { from, to } of pair) {
        if (from === ONSET['ㅂ']) continue;
        text = text.replaceAll(new RegExp(`(?<=[${CODA['ㄼ']}${CODA['ㄾ']}])${from}`, 'g'), to);
    }

    // Rule 26.
    for (const { from, to } of pair) {
        if (from === ONSET['ㄱ'] || from === ONSET['ㅂ']) continue;
        text = text.replaceAll(new RegExp(`(?<=[${CODA['ㄹ']}])${from}`, 'g'), to);
    }

    return text
}

// Rule 29. Nasal Insertion
function nasalInsertion(text: string): string {
    text = text.replaceAll(new RegExp(`(?<=[^${Object.values(VOWEL).join('')}])${ONSET['ㅇ']}(?=[${VOWEL['ㅣ']}${VOWEL['ㅑ']}${VOWEL['ㅕ']}${VOWEL['ㅛ']}${VOWEL['ㅠ']}])`, 'g'), ONSET['ㄴ']);
    return text;
}

// Rule 30. Epenthesis
function epenthesis(text: string): string {
    // Rule 30.1
    const tenseConsonantPair = [
        { from: ONSET['ㄱ'], to: ONSET['ㄲ'] },
        { from: ONSET['ㄷ'], to: ONSET['ㄸ'] },
        { from: ONSET['ㅂ'], to: ONSET['ㅃ'] },
        { from: ONSET['ㅅ'], to: ONSET['ㅆ'] },
        { from: ONSET['ㅈ'], to: ONSET['ㅉ'] },
    ];

    for (const { from, to } of tenseConsonantPair) {
        text = text.replaceAll(new RegExp(`(?<=${CODA['ㅅ']})${from}`, 'g'), to);
    }

    // Rule 30.2
    text = text.replaceAll(new RegExp(`${CODA['ㅅ']}(?=[${ONSET['ㄴ']}${ONSET['ㅁ']}])`, 'g'), CODA['ㄴ']);

    // Rule 30.3
    text = text.replaceAll(new RegExp(`${CODA['ㅅ']}${ONSET['ㅇ']}(?=${VOWEL['ㅣ']})`, 'g'), `${CODA['ㄴ']}${ONSET['ㄴ']}`);

    return text;
}
export { g2p };