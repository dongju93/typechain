// crypto.d.ts 파일이 이미 crypto packag에 존재
// JS로만 짜여진 package의 경우(older or .d.ts 미존재)
// https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master
// DefinitelyTyped repository에서 community의 노력으로 작성된 .d.ts 파일이 존재하는지 확인
import crypto from "crypto";

// 1.Block의 type을 interface object로 지정해줌
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

// 2. BlockShape의 type을 상속받고 block의 hash 구성할 때 계산될 식과 암호화 알고리즘을 지정함
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
        // toHash에 prevHash, height, data 값을 1개의 string으로 대입시킴
        const toHash = `${prevHash}${height}${data}`;
        // createHash 내장함수를 활용하여 sha256 알고리즘으로 Hash를 생성하는데
        // 해당 알고리즘은 toHash 의 값을 update하는데 사용되고
        // hex로 encoding된 Hash 값을 return 해주고
        // encoding된 hash 값은 더는 호출 할 수 없다 (복제 방지?)
        return crypto.createHash("sha256").update(toHash).digest("hex");
    }
}

// 3. Block을 생성하고 더하는 함수를 직접 구현(implement)함
class Blockchain {
    // Block은 hash된 예민한 data를 품고 있기 때문에
    // Blockchain class 안에서만 호출되어야 안전
    private blocks: Block[];
    constructor() {
        // blocks 초기화
        this.blocks = [];
    }
    // 직전 순서의 Block의 hash 값을 불러와 현재 Block의 hash를 계산해야하기 때문에
    // 현재 block의 length-1 block의 hash 값을 return 하는 함수 작성
    private getPrevHash() {
        if (this.blocks.length === 0) return "";
        return this.blocks[this.blocks.length - 1].hash;
    }
    // Blockchain class 외부에서 특정 data를 담아 block을 생성하려고 할때
    // 호출할 필요가 있기 때문에 public으로 생성
    public addBlock(data: string) {
        // 생성될 Block의 parameter는 BlockShape를 implements한 Block class의 object를 따름
        const newBlock = new Block(
            // 직전 block의 hash(getPrevHash) 값과
            // 현재 block의 length+1로 다음 순서로 block의 순서(height)를 지정하고
            // string type으로 입력받은 data값으로 다음 block의 Hash 값을 생성
            this.getPrevHash(),
            this.blocks.length + 1,
            data
        );
        // blocks array에 위에서 생성된 newBlock을 push 함
        this.blocks.push(newBlock);
    }
    public getBlock() {
        // private로 지정된 blocks array가 public으로 호출되고 있기 때문에
        // 외부에서 getBlock을 호출 할 때 private로 지정된 block array에 접근하여
        // prevHash, height, data를 임의로 지정해 block을 생성할 수 있음 (security breach)
        // blockchain.getBlock().push(new Block("dsfas", 7, "wqewqe"))

        // [...this.blocks]은 this.blocks 배열의 모든 요소를 새로운 배열에 복사하여 ruetn 함
        // 반환된 새 배열은 this.blocks와 별개인 새로운 객체
        // getBlock()으로 blocks array에 임의로 값을 push 하더라도 사용자 local array에서 벌어지는 일임
        // class의 block에 영향을 미치지 않음
        return [...this.blocks];
    }
}

// 4. Blockchain으로 구현된 함수를 직접 호출하여 정상작동하는지 확인
const blockchain = new Blockchain();
// addBlock 에서 parameter로 지정한 string = data 입력
blockchain.addBlock("firstblock");
blockchain.addBlock("secondblock");
blockchain.addBlock("Thirdblock");

console.log(blockchain.getBlock());

// Blockchain class에서 보안 취약점이 있을 때
// public getBlock() {
//    return this.blocks;
// }
// BlockShape의 type을 implements한 Block은
// Blcokchain class의 blocks[]의 type으로 지정되었고
// getBlock()애서 this.block을 호출하기 때문에
// getBlock()에서 blocks[]에 push할 때 new Block에 명시된 type와 순서로 입력 가능
blockchain.getBlock().push(new Block("fakePrevHash", 99, "HackerMan"))