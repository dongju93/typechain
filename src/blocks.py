import hashlib

class Block:
    def __init__(self, previous_hash, data):
        self.previous_hash = previous_hash
        self.data = data
        self.hash = self.calculate_hash()

    def calculate_hash(self):
        return hashlib.sha256((str(self.previous_hash) + str(self.data)).encode()).hexdigest()

class Blockchain:
    def __init__(self):
        self.chain = [Block("0", "Initial Block")]  # genesis block creation

    def add_block(self, data):
        new_block = Block(self.chain[-1].hash, data)
        self.chain.append(new_block)

# Initialize blockchain
my_blockchain = Blockchain()

# Add blocks
my_blockchain.add_block("First Block")
my_blockchain.add_block("Second Block")
my_blockchain.add_block("Third Block")

# Print block data and hash
for block in my_blockchain.chain:
    print(f"Data: {block.data}, Hash: {block.hash}")
