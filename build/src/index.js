const hi = () => "hi";
class Block {
    data;
    constructor(data) {
        this.data = data;
    }
    static hello() {
        return "hello";
    }
}
// myPackage.d.ts에 기재된(declare) Type으로 JS npm 모듈을
// strict 모드에서 사용 할 수 있음
// tsconfig.json에 allowJS 추가 시 .d.ts 없이 JS의 Type을 추론하여 사용할 수 있음
import { init, exit } from "../cusModu/myPackage";
// JS code 수정 없이 @ts-check와 함께 comment에 추가한 라인으로
// TS에서 Type과 function parameter를 활용할 수 있음
init({ debug: true, url: "thisIsString" });
exit(123);
