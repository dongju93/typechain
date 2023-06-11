// JS로 짜여진 (대부분) node_modules(npm)을 사용 할 떄
// strict 모드에서 TS로 declare가 필요하다
// JS code 이지만 TS의 protectrion을 받고 싶을 때 사용
// JSDoc을 활용하여 함수 바로 위에 comment를 적어줘야 함
// @ts-check
/**
 * Initialize program
 * @param {object} config
 * @param {boolean} config.debug
 * @param {string} config.url
 * @returns boolean
 */
export function init(config) {
    return true;
}
/**
 * Exit the program
 * @param {number} code
 * @returns number
 */
export function exit(code) {
    return code + 1;
}
