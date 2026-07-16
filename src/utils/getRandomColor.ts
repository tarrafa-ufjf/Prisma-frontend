/**
 * Gera uma cor hexadecimal aleatória
 * @returns {string} Cor no formato #RRGGBB
 */
export function getRandomHexColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}

/**
 * Gera múltiplas cores hexadecimais aleatórias
 * @param {number} count - Quantidade de cores a gerar
 * @returns {string[]} Array de cores hexadecimais
 */
export function getRandomHexColors(count: number) {
    return Array.from({ length: count }, () => getRandomHexColor());
}
