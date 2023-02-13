
//<--------------------------------------------------stack---------------------------------------------->

//-----------------------------------In Array-----------------------------------

// class Stack{
//     constructor(){
//     this.items=[]
//     }
//     push(element){
//         this.items.push(element)
//     }             
//     pop(){
//       return this.items.pop()
//     }
//     peek(){
//         return this.items[this.items.length-1]
//     }
//     isEmpty(){
//       return  this.items.length===0
//     }
//     size(){
//        return this.items.length
//     }
//     print(){
//         console.log(this.items.toString());
//     }


// }

// let stack=new Stack()
// stack.isEmpty()
// stack.push(50)
// stack.push(40)
// stack.push(30)
// stack.push(20)
// stack.push(10)
// stack.push(0)
// stack.print()
// stack.pop()
// stack.print()
// console.log(stack.isEmpty());
// console.log(stack.peek());

//------------------------------------In Linked List--------------------------------------

// class Node{
//     constructor(value){
//         this.value=value
//         this.next=null
//     }
    
// }

// class Stack{
//     constructor(){
//         this.top=null;
//         this.bottom=null;
//         this.size=0;
//     }
//     push(value){
//        let node=new Node(value)
//         if(this.size===0)
//         {
//             this.top=node;
//             this.bottom=node;
//         }
//         else{
//            node.next=this.top
//            this.top=node
//         }
//         this.size++
//     }
//     pop(){
//         if(this.size===0){
//             return false
//         }
//         else{
//             this.top=this.top.next

//         }
//         this.size--
//     }

//     print(){
//         let curr=this.top
//         let list=''
//         while(curr){
//             list+=`${curr.value} `
//             curr=curr.next
//         }
//     console.log(list);
//     }

// peek(){
//     return this.top?this.top.value:null
// }
// }


// let stack=new Stack()

// stack.push(50)
// stack.push(40)
// stack.push(30)
// stack.push(20)
// stack.push(10)
// stack.print()
// stack.pop()
// stack.print()
// console.log(stack.peek());


//-------------------------stack-----------------------------