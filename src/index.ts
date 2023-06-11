import crypto from "crypto";

interface BlockShape {
    // 현재 Block의 hash 값
    hash: string;
    // 직전 Block의 hash 값
    prevHash: string;
    // 순서
    height: number;
    // 데이터
    data: string;
}

// Hash는 길고 굉장히 이상한 데이터 표시형태이지만, 결정론적임

class Block implements BlockShape {
    // hash는 prevHash, height, data을 계산하여 생성되는 값
    public hash: string;
    constructor(
        public prevHash: string,
        public height: number,
        public data: string
    ) {
        // static method는 OOP에서 자주 활용되며
        // class안에서 사용하는 method 이며
        // class instance가 없어도 부를 수 있는 method 임
        this.hash = Block.calculateHash(prevHash, height, data);
    }
    static calculateHash(prevHash: string, height: number, data: string) {
        const toHash = `${prevHash}${height}${data}`;
    }
}
