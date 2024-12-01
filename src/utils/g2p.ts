import { ONSET, CODA, VOWEL } from './constant';

function g2p(text: string): string {
    text = diphthongRunle(text);
    text = diphthongRunle(text);
    text = codaSimplification(text);
    text = clusteredCoda1(text);
    text = clusteredCoda2(text);
    return text;
}

// Rule 5. Diphthong Runle
function diphthongRunle(text: string): string {
    text = text.replaceAll(new RegExp(`(?<=[^${ONSET['ㅇ']}${ONSET['ㄹ']}])${VOWEL['ㅖ']}`, 'g'), VOWEL['ㅔ']);
    text = text.replaceAll(new RegExp(`(?<=[^${ONSET['ㅇ']}])${VOWEL['ㅢ']}`, 'g'), VOWEL['ㅣ']);
    return text;
}

// Rule 9. Coda Simplification
function codaSimplification(text: string): string {
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

// Rule 10. Clustered Coda1
function clusteredCoda1(text: string): string {
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

// Rule 11. Clustered Coda2
function clusteredCoda2(text: string): string {
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
/*
1. ‘ㅎ(ㄶ, ㅀ)’ 뒤에 ‘ㄱ, ㄷ, ㅈ’이 결합되는 경우에는, 뒤 음절 첫소리와 합쳐서 [ㅋ, ㅌ, ㅊ]으로 발음한다.
〔붙임 1〕 받침 ‘ㄱ(ㄺ), ㄷ, ㅂ(ㄼ), ㅈ(ㄵ)’이 뒤 음절 첫소리 ‘ㅎ’과 결합되는 경우에도, 역시 두 소리를 합쳐서 [ㅋ, ㅌ, ㅍ, ㅊ]으로 발음한다.
〔붙임 2〕 규정에 따라 ‘ㄷ’으로 발음되는 ‘ㅅ, ㅈ, ㅊ, ㅌ’의 경우에는 이에 준한다.
2. ‘ㅎ(ㄶ, ㅀ)’ 뒤에 ‘ㅅ’이 결합되는 경우에는, ‘ㅅ’을 [ㅆ]으로 발음한다.
3. ‘ㅎ’ 뒤에 ‘ㄴ’이 결합되는 경우에는, [ㄴ]으로 발음한다.
〔붙임〕 ‘ㄶ, ㅀ’ 뒤에 뒤에 모음으로 시작된 어미나 접미사가 결합되는 경우에는, ‘ㅎ’을 발음하지 않는다.
3. ‘ㅎ(ㄶ, ㅀ)’ 뒤에 ‘ㄴ’이 결합되는 경우에는, [ㄴ]으로 발음한다.

*/
// Rule 12. Coda H
function codaH(text: string): string {
    return text;
}

// Rule Tensification

export { g2p };