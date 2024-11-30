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
    text = text.replaceAll(/(?<=[^\u{1105}\u{110B}])\u{1168}/ug, '\u1166');
    text = text.replaceAll(/(?<=[^\u{110B}])\u{1174}/ug, '\u1175');
    return text;
}

// Rule 9. Coda Simplification
function codaSimplification(text: string): string {
    text = text.replaceAll(/[\u11A9\u11BF](?!\u110B)|[\u11A9\u11BF]$|[\u11A9\u11BF](?=[\s\.!\?])/g, '\u11A8');
    text = text.replaceAll(/[\u11BA\u11BB\u11BD\u11BE\u11C0](?!\u110B)|[\u11BA\u11BB\u11BD\u11BE\u11C0]$|[\u11BA\u11BB\u11BD\u11BE\u11C0](?=[\s\.!\?])/g, '\u11AE');
    text = text.replaceAll(/\u11C1(?!\u110B)|\u11C1$|\u11C1(?=[\s\.!\?])/g, '\u11B8');
    return text;
}

// Rule 10. Clustered Coda1
function clusteredCoda1(text: string): string {
    // 예외: 밟, 넓
    text = text.replaceAll(/\u1107\u1161\u11B2(?!\u110B)|\u1107\u1161\u11B2$|\u1107\u1161\u11B2(?=[\s\.!\?])/g, '\u1107\u1161\u11B8');
    text = text.replaceAll(/\u1102\u1165\u11B2(?!\u110B)|\u1102\u1165\u11B2$|\u1102\u1165\u11B2(?=[\s\.!\?])/g, '\u1102\u1165\u11B8');

    text = text.replaceAll(/\u11AA(?!\u110B)|\u11AA$|\u11AA(?=[\s\.!\?])/g, '\u11A8');
    text = text.replaceAll(/\u11AC(?!\u110B)|\u11AC$|\u11AC(?=[\s\.!\?])/g, '\u11AB');
    text = text.replaceAll(/[\u11B2\u11B3\u11B4](?!\u110B)|[\u11B2\u11B3\u11B4]$|[\u11B2\u11B3\u11B4](?=[\s\.!\?])/g, '\u11AF');
    text = text.replaceAll(/\u11B9(?!\u110B)|\u11B9$|\u11B9(?=[\s\.!\?])/g, '\u11B8');
    return text;
}

// Rule 11. Clustered Coda2
function clusteredCoda2(text: string): string {
    text = text.replaceAll(/\u11B0(?!\u110B)|\u11B0$|\u11B0(?=[\s\.!\?])/g, '\u11A8');
    text = text.replaceAll(/\u11B1(?!\u110B)|\u11B1$|\u11B1(?=[\s\.!\?])/g, '\u11B7');
    text = text.replaceAll(/\u11B5(?!\u110B)|\u11B5$|\u11B5(?=[\s\.!\?])/g, '\u11B8');
    return text;
}

// Rule 12. Coda H
function codaH(text: string): string {
    return text;
}

// Rule Tensification

export { g2p };