// class Mystack{
//     constructor(){
//         this.items=[]
//     }

//     push(value){
//         this.items.push(value)
//       if(this.items.length>1){
//         for(let i=0;i<this.items.length-1;i++){
//             this.items.push(this.items.shift())
//         }
//       }
// }
//     pop(){

//         if(this.items.length===0){
//             return false
//         }else{
//             return this.items.shift()
//         }
//       }
// }

// let stack=new Mystack()
// stack.push(10)
// stack.push(20)
// stack.push(30)
// stack.push(40)
// console.log(stack.pop());  


class myQueue{
    constructor(){
        this.items=[]
    }
    enqueue(value){
        this.items.push(value)
        for(let i=0;i<this.items.length-1;i++){
            this.items.push(this.items.shift())
        }
    }
    dequeue(){
        return this.items.pop()
    }
}

let queue=new myQueue()
queue.enqueue(10)
queue.enqueue(20)
queue.enqueue(30)
queue.enqueue(40)
console.log(queue.dequeue());