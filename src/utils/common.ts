import { HANGUL_OFFSET, ONSET_OFFSET, NUCLEUS_OFFSET, CODA_OFFSET } from './constant';

function isHangul(text: string): boolean {
    if (text.length !== 1) return false;
    return /[가-힣]/.test(text);
}

function checkAll(text: string): boolean {
    return text.split('').every(isHangul);
}

export { isHangul, checkAll };