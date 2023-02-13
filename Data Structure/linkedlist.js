
// class Node{
//     constructor(value){
//         this.value=value;
//         this.next=null;
//     }
// }

// class LinkedList{
//     constructor(){
//         this.head=null;
//         this.tail=null;
//         this.size=0;
//     }

//  prepand(value){

// let node =new Node(value)
   
// if(this.size===0){
//         this.head=node;
//         this.tail=node;
        
//     }
//     else{
      
//         node.next=this.head;
//         this.head=node
   
//     }
//   this.size++ 

// }

// print(){
    
//     if(this.size===0){
//         console.log('no items found');
//     }
//     else{
//         let curr=this.head
//         let list=''
//         while(curr){
            
//                 list+=`${curr.value} `
//                 curr= curr.next
//         }
//         console.log(list);
//     }
// }

// secondLargest(){

//     let curr=this.head;
//     let large=0
//     let second=0
//     // let possi=0;
//     while(curr){
//         if(curr.value>large){
//             second=large
//             large=curr.value
        
//         }
//        else if(curr.value<large&&curr.value>second){
//            second=curr.value
//           }
//         curr=curr.next
// }

//     console.log(second)
// }

// arryReverse(){
//     if(this.size===0){
//         return false;
//     }
//        let prev=null;
//         let curr=this.head
        
//     while(curr){
//     let next=curr.next;
//     curr.next=prev;
//     prev=curr;
//     curr=next
//     }
//     this.head=prev 
// }

// primeNumber(value){
    
//     let prime=true;
   
//     for(let i=2;i<value;i++){
        
//        if(value%i==0){
//             prime=false;
//             break;
//             }
//     }
//     if(prime){
//         console.log('is prime');
//     }
//     else{
//         console.log('not prime');
//     }

// }                                

//  binarytodecimal(){
  
//   let curr=this.head;
//     let decimal=0;
//     let possi=this.size-1;
//     while(curr){
//         decimal+=curr.value*2**possi;
//         curr=curr.next;
//         possi--
        
//     }

// console.log(decimal);

// }

// append(value){
//     let node=new Node(value)
//     if(this.size===0){
//         this.head=node;
//         this.tail=node;
       
//     }

//     else{

//         this.tail.next=node;
//         this.tail=node;
//     }

// this.size++
// }

// getArray(array){
//     array.forEach((i)=>{
//         return this.append(i)
//     })

// }

// decimalToBinary(value){ 

//     let arr=[]
//     let rem=0;
//     let num=value
   
//  while(num>0){
//     rem=num%2
//     num=Math.floor(num/2)
//     arr.unshift(rem)
//  }

//  return this.getArray(arr)
//     }


// searchItem(value){
//     let curr=this.head
//     let poss=0;
//     while(curr){
//         if(curr.value===value){
//             return poss
//         }
//         else{
//             poss++
//             curr=curr.next
//         }
//     }
// return fasle
// }

// }







// let link=new LinkedList()
// link.append(1)
// link.append(0)
// link.append(0)
// link.append(0)
// link.append(0)
// link.binarytodecimal()
// link.decimalToBinary(8)
// link.secondLargest()
// link.arryReverse()
// link.print()
// link.primeNumber(15)


//<--------------------------------------------doubly------------------------------------------------------->

// class Node{
//     constructor(value){
//         this.value=value;
//         this.next=null;

//     }
// }

// class LinkedList{
//     constructor(){
//         this.head=null;
//         this.tail=null;
//         this.prev=null;
//         this.size=0;
//     }

// prepend(value){
   
//   let node=new Node(value) 
//     if(this.size===0){
//         this.head=node
//         this.tail=node
//     }
//     else{
//         node.next=this.head
//        this.head.prev=node
//         this.head=node

//     }
// this.size++
// }
// append(value){

//     let node=new Node(value)
   
  
//     if(this.size===0){
//         console.log(value);
//         this.head=node
//         this.tail=node
//     }
//     else{
//         this.tail.next=node;
//         node.prev=this.tail;
//         this.tail=node;
//     }

//     this.size++
// }

// print(){
//     if(this.size===0){
//         return false
//     }
//     let curr=this.head
//     let arrayList=''
//     while(curr){
//         arrayList+=`${curr.value} `
//         curr=curr.next
//     }
// console.log(arrayList);
// }
// }

// let list=new LinkedList()
// list.append(10)
// list.append(20)
// list.append(30)
// list.append(40)
// list.append(50)
// console.log(list);
// list.print()


//<---------------------------------------------
