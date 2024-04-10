// Binary Search Tree
// Tree node
class TreeNode {
    constructor(val, leftN, rightN) {
        this.value = val;
        this.left = leftN;
        this.right = rightN;
    }
}
let mainNode = new TreeNode("Do you prefer a vacation spot in the East Coast or the West Coast?", WestNode, EastNode);
let EastNode = new TreeNode("East it is!\nDo you prefer Northeast or Southeast?", );
let WestNode = new TreeNode("East it is!\nDo you prefer Northwest or Southwest?", );
let NENode = new TreeNode("NorthEast it is!\nDo you prefer ?", );
let NWNode = new TreeNode("NorthWest it is!\nDo you prefer ?", );
let SENode = new TreeNode("SouthEast it is!\nDo you prefer ?", );
let SWNode = new TreeNode("SouthWest it is!\nDo you prefer ?", );