//<---------------------------------------------queue data structure------------------------------------------------>

//-----------Array-----------------

// class Queue{
//     constructor(){
//         this.items=[]
//     }
// enqueue(value){
//     this.items.push(value)
// }
// dequeue(){
//     return this.items.shift()
// }
// peek(){
//     return this.items[0]
// }
// print()
// {
//     console.log(this.items.toString());
// }
// size(){
//     return this.items.length-1
// }

// }

// let queue=new Queue()

// console.log(queue.size);

// queue.enqueue(50);
// queue.enqueue(60);
// queue.enqueue(80);
// queue.enqueue(100);
// queue.print()
// console.log(queue.dequeue());
// queue.print()
// console.log(queue.peek());

//----------------

// class Queue{
//     constructor(){
//         this.item=[]
//         this.rare=0;
//         this.front=0;
//     }
//     enqueue(value){
//         this.item[this.rare]=value
//         this.rare++
//     }
//     dequeue(){
//        delete this.item[this.front]
//        this.front++
//     }
//     print(){
//         console.log(this.item.toString());
//     }
//     isEmpty(){
//       return  this.rare-this.front===0;
//     }
//     size(){
//         return this.rare-this.front
//     }
//     peek(){
//         return this.item[this.front]
//     }
// }

// let queue=new Queue()


// console.log(queue.isEmpty());
// queue.enqueue(50);
// queue.enqueue(60);
// queue.enqueue(80);
// queue.enqueue(100);
// queue.print()
// console.log(queue.peek());
// console.log(queue.dequeue());
// queue.print()
// console.log(queue.peek());
// console.log(queue.size());
//console.log(queue.isEmpty());

//------------------------linkedlist-------------------------------

// class Node{                         
//     constructor(value){
//         this.value=value
//         this.next=0;
//     }
// }
// class Queue{
//     constructor(){
//         this.head=null;
//         this.tail=null;
//         this.size=0
//     }
//  enqueue(value){
//    let node=new Node(value)
   
//     if(this.size===0){
//         this.head=node;
//         this.tail=node;
// }else{
//     this.tail.next=node
//     this.tail=node
// }
// this.size++
//  }
//  dequeue(){
//     if(this.size===0){
//         return null;
//     }else{
//         this.head=this.head.next

//     }
//     this.size--
//  }
//  peek(){
//     return this.head.value
//  }
// print(){
//     let curr=this.head
//     let list=''
//     while(curr){
//         list+=`${curr.value} `
//         curr=curr.next
//     }
//     console.log(list);
// }

// getSize(){
//     return this.size
    
// }
// }

// let queue=new Queue()

// queue.enqueue(50);
// queue.enqueue(60);
// queue.enqueue(80);
// queue.enqueue(100);
// queue.print()
// console.log(queue.peek());
// console.log(queue.dequeue());
// queue.print()
// console.log(queue.peek());
// console.log(queue.getSize());

//<-------------------------Queue---------------------------

// class Node{
//     constructor(value){
//         this.value=value
//         this.next=null;
//     }
// }

// class Queue{
//     constructor(){
//         this.front=null;
//         this.rear=null;
//         this.size=0
//     }

//     enqueue(value){
//        let node=new Node(value)
//         if(this.size===0){
//             this.front=node;
//             this.rear=node;
//         }
//         else{
//             this.rear.next=node;
//             this.rear=node;
        
//         }
//         this.size++
//     }
//     dequeue(){
//         if(this.size===0){
//             return null;
//         }
//         else{
//             let remove=this.front.value
//             this.front=this.front.next
//             this.size--
//             return remove
//         }
//         }
//         print(){
//             let curr=this.front;
//             let list=''
//             while(curr){
//                 list+=`${curr.value} `
//                 curr=curr.next
//             }
//             console.log(list);
//         }
//         peek(){
//             return this.front.value
//         }
// }

// let queue=new Queue()
// queue.enqueue(10)
// queue.enqueue(20)
// queue.enqueue(30)
// queue.enqueue(40)
// queue.print()
// console.log(queue.peek());
// console.log(queue.dequeue());
// queue.print()