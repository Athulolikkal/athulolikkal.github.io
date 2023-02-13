
//--------------find numbers sum of that numbers are 15----------------------------


// let a=[6,5,4,10,11,12]
//  for(let i=0;i<a.length;i++){
//     for(j=i+1;j<=a.length;j++){
//         if(a[i]+a[j]==15){
//             console.log(i,j);
//         }
//     }
//  }


//<----------------sum of 10 numbers------------------------->

//O(n)
// let num=10;
// var sum=0;
// for(let i=1;i<=10;i++){
// sum=sum+i;

// }
// console.log(sum,'sum');


//<-------sum of 10 numbers O(1)---------------------------------------------->
// let target=10;
// var sum= target*(target+1)/2
// console.log(sum,'summm');

// function fibonacci(n){
//     const fib=[0,1]
//     for (let i=2;i<n;i++){
//         fib[i]=fib[i-1]+fib[i-2]

//     }
//     return fib
// }

// console.log(fibonacci(5),'55555');
// console.log(fibonacci(6),'666');
// console.log(fibonacci(8),'777');


//---------------------powerOfTwo------------------------------------

// function powerOfTwo(n){
// if(n<1){
//     return false
// }
// while(n>1){
//     if(n%2!=0){
//         return false

//     }
//    n=n/2 
// }
// return true
// }

// console.log(powerOfTwo(2));
// console.log(powerOfTwo(8));
// console.log(powerOfTwo(10));


// power of two O(1)


//---------------- function powerOfTwo(n)-----------------------

// if(n<1){
//     return false
// }
// console.log(n &(n-1));

// return(n & (n-1))==0

// }

// console.log(powerOfTwo(1));
// console.log(powerOfTwo(2));
// console.log(powerOfTwo(3));
// console.log(powerOfTwo(4));
// console.log(powerOfTwo(5));
// console.log(powerOfTwo(6));
// console.log(powerOfTwo(7));
// console.log(powerOfTwo(8));
// console.log(powerOfTwo(9));
// console.log(powerOfTwo(10));


//<--------------------------recursion---------------------------------->

//----------fibnocci----------->

// function fb(n){
//     if(n<2){
//         return n;
//     }
//     return fb(n-1)+fb(n-2)

// }

// console.log(fb(1));
// console.log(fb(2));
// console.log(fb(3));
// console.log(fb(4));

//-------------------------factorial------------------------------->

// let factorial=function(num){

//     if(num==1){
//         return 1
//        }
//   return num*factorial(num-1)
// }
// console.log(factorial(5));


//-----------------sum of array------------------------------------>

// let sumArray=function(arr){

//     if(arr.length===0){

//         let sum=0
//         return sum
//     }
//     return arr[0]+sumArray(arr.slice(1));
// }

// let abc=[10,20,30,40,50]
// console.log(sumArray(abc));


//<-------------------maximum of array----------------------------->

// let maximum=function(arr){
//     if(arr.length===0){
//        return false
//     }

//    let max= maximum(arr.slice(1))
//     return Math.max(max,arr[0])
// }

// let array=[12,14,16,11,8,5,9]
// console.log(maximum(array));


//<--------------------------binary search------------------------->

//large num in array

// let binarySerach=function(arr,target){

//  let leftIndex=0;
//  let rightIndex=arr.length-1;
//  while(leftIndex<=rightIndex){
//     let middleIndex=Math.floor((leftIndex+rightIndex)/2)
//     if(target===arr[middleIndex]){
//         return middleIndex
//     }
//    if(target<arr[middleIndex]){
//     rightIndex=middleIndex-1
//    }else{
//     leftIndex=middleIndex+1
//    }
// }
// }

// let array=[10,20,30,40,50,60]
//  let target=40;
// console.log(binarySerach(array,target));



//<---------------------------------array-sorting----------------------------------------------->

// let a=[10,15,25,45,71,17,5,16]
// let b= a.sort((a,b)=>b-a)
// console.log(b);







///<--------not recursive its in O(1)---------------------------------->

// let max=function(arr){

// let greatValue=Math.max(...arr);
// return greatValue


// }

// let array=[12,14,16,11,8,5,9]
// console.log(max(array));



//<-------------------------------------Linked List------------------------------------->

//--node creating-----------------

class Node{
    constructor(value){
        this.value=value;
        this.next=null;
    }
}



class linkedList{
    constructor(){
        this.head=null;
        this.tail=null;
        this.size=0;
    }
isEmpty(){
    return this.size===0
}
getSize(){
    return this.size
}
prepend(value){
    let node=new Node(value)
    if(this.isEmpty()){
        this.head=node;
        this.tail=node;
    }else{
    node.next=this.head;
    this.head=node
}
this.size++
}


append(value){

    let node=new Node(value)
    if(this.isEmpty()){
        this.head=node;
        // this.tail=node;

    }else{

//    this.tail.next=node;
//    this.tail=node;


            let prev=this.head;
        while(prev.next){
            prev=prev.next
        }
       prev.next=node

    }
  this.size++
}


insert(value,index){
    if(index<0||index>this.size){
        console.log('invaliddd insertion');
    }
    if(index===0){
        this.prepend(value)
    }else{
        let node=new Node(value);
         let prev=this.head
        for(let i=0;i<index-1;i++){
            prev=prev.next
        }
        node.next=prev.next
        prev.next=node
        this.size++
    }
}

print(){
    if(this.isEmpty()){
        console.log('no items found');
    }else{
        let curr=this.head;
        let arrayList=''
        while(curr){
            arrayList+=`${curr.value} `
            curr=curr.next //traversing the pointer
        }
    console.log(arrayList);
    }
}


removeElement(index){
    if(index<0||index>=this.size){
        console.log('item not found');
    }
    let remove
    if(index===0){
        remove=this.head
        this.head=this.head.next
    }   
    let prev=this.head
    for(let i=0;i<index-1;i++){
        prev=prev.next
    }
     remove=prev.next
    prev.next=remove.next
    this.size--
}


removeValue(value){
    if(this.size===0){
        console.log('failed to value')
        return null
    }
    if(this.head.value===value){
       console.log(this.head.value);
        this.head=this.head.next
        this.size--
        return value
    }
    else{
        let prev=this.head
        while(prev.next&&prev.next.value!==value){
            prev=prev.next
        }
        if(prev.next){
            let remove=prev.next
            prev.next=remove.next;
            this.size--
            return value
        }
        return null
    }
}

search(value){
    if(this.size===0){
        return false
    }
    let curr=this.head
    let i=0
    while(curr){
       if(curr.value===value){
        return i
       }
       else{
        curr=curr.next
        i++
       }
    }
return false
}


reverse(){
    if(this.size===0){
        return false;
    }
    let prev=null;
    let curr=this.head;
    while(curr){
        let next=curr.next
        curr.next=prev
        prev=curr
        curr=next

    }
    this.head=prev
}

insertValue(value,element){
    if(this.size===0){
        return false
    }
    if(this.head.value===value){
        this.prepend(element)
    }
    else{
        let node=new Node(element)
        let prev=this.head;
        while(prev){
            if(prev.value===value){
            console.log(prev.value);
            node.next=prev.next
            prev.next=node
            this.size++
         }
        prev=prev.next
        }
}
}

insertBeforeValue(value,element){
        let node=new Node(element)
        if(this.head.value===value){
        //  return this.prepend(element)
       
        node.next=this.head.next
        this.head.next=node;
        
      
        }
        
        let curr=this.head;
        while(curr.next&&curr.next.value!==value){
                curr=curr.next
        }
        if(curr.next){
      let next=curr.next;
      curr.next=node
      node.next=next
       this.size++
        }
}


}

const list=new linkedList()
console.log(list.isEmpty());
console.log(list.getSize());
list.print()
list.prepend(10)
list.prepend(20)
list.prepend(30)
list.prepend(40)


list.prepend(5)
list.prepend(20)
list.insert(40,)
list.print()
list.removeValue(20)
list.print()
console.log(list.search(40));
// list.reverse()
// list.print()
// list.insertBeforeValue(40,10)
// list.print()



//<----------------------converting--array--to--linked--list-------------------------->//

// class Node {
//     constructor(value) {
//         this.value = value;
//         this.next = null;
//     }
// }

// class linkedList {
//     constructor() {
//         this.head = null;
//         this.tail = null
//         this.size = 0;
//     }

//     isEmpty() {
//         return this.size === 0;

//     }
//     getSize() {
//         return this.size
//     }

//     insert(value) {

//         let node = new Node(value)

//         if (this.size === 0) {

//             this.head = node;
//             this.tail = node;
//         }
//         else {
//             this.tail.next = node;
//             this.tail = node;



//         }
//         this.size++



//     }

//     arrayToLinkedList(array) {
// class Node{
//     constructor(value){
//         this.value=value;
//         this.next=null;
//     }
// }



// class linkedList{
//     constructor(){
//         this.head=null;
//         this.tail=null;
//         this.size=0;
//     }
// isEmpty(){
//     return this.size===0
// }
// getSize(){
//     return this.size
// }
// prepend(value){
//     let node=new Node(value)
//     if(this.isEmpty()){
//         this.head=node;
//         this.tail=node;
//     }else{
//     node.next=this.head;
//     this.head=node
// }
// this.size++
// }


// append(value){

//     let node=new Node(value)
//     if(this.isEmpty()){
//         this.head=node;
//         // this.tail=node;

//     }else{

// //    this.tail.next=node;
// //    this.tail=node;


//             let prev=this.head;
//         while(prev.next){
//             prev=prev.next
//         }
//        prev.next=node

//     }
//   this.size++
// }


// insert(value,index){
//     if(index<0||index>this.size){
//         console.log('invaliddd insertion');
//     }
//     if(index===0){
//         this.prepend(value)
//     }else{
//         let node=new Node(value);
//          let prev=this.head
//         for(let i=0;i<index-1;i++){
//             prev=prev.next
//         }
//         node.next=prev.next
//         prev.next=node
//         this.size++
//     }
// }

// print(){
//     if(this.isEmpty()){
//         console.log('no items found');
//     }else{
//         let curr=this.head;
//         let arrayList=''
//         while(curr){
//             arrayList+=`${curr.value} `
//             curr=curr.next //traversing the pointer
//         }
//     console.log(arrayList);
//     }
// }


// removeElement(index){
//     if(index<0||index>=this.size){
//         console.log('item not found');
//     }
//     let remove
//     if(index===0){
//         remove=this.head
//         this.head=this.head.next
//     }   
//     let prev=this.head
//     for(let i=0;i<index-1;i++){
//         prev=prev.next
//     }
//      remove=prev.next
//     prev.next=remove.next
//     this.size--
// }


// removeValue(value){
//     if(this.size===0){
//         console.log('failed to value')
//         return null
//     }
//     if(this.head.value===value){
//        console.log(this.head.value);
//         this.head=this.head.next
//         this.size--
//         return value
//     }
//     else{
//         let prev=this.head
//         while(prev.next&&prev.next.value!==value){
//             prev=prev.next
//         }
//         if(prev.next){
//             let remove=prev.next
//             prev.next=remove.next;
//             this.size--
//             return value
//         }
//         return null
//     }
// }

// search(value){
//     if(this.size===0){
//         return false
//     }
//     let curr=this.head
//     let i=0
//     while(curr){
//        if(curr.value===value){
//         return i
//        }
//        else{
//         curr=curr.next
//         i++
//        }
//     }
// return false
// }


// reverse(){
//     if(this.size===0){
//         return false;
//     }
//     let prev=null;
//     let curr=this.head;
//     while(curr){
//         let next=curr.next
//         curr.next=prev
//         prev=curr
//         curr=next

//     }
//     this.head=prev
// }

// insertValue(value,element){
//     if(this.size===0){
//         return false
//     }
//     if(this.head.value===value){
//         this.prepend(element)
//     }
//     else{
//         let node=new Node(element)
//         let prev=this.head;
//         while(prev){
//             if(prev.value===value){
//             console.log(prev.value);
//             node.next=prev.next
//             prev.next=node
//             this.size++
//          }
//         prev=prev.next
//         }
// }
// }

// insertBeforeValue(value,element){
//         let node=new Node(element)
//         if(this.head.value===value){
//         //  return this.prepend(element)
       
//         node.next=this.head.next
//         this.head.next=node;
        
      
//         }
        
//         let curr=this.head;
//         while(curr.next&&curr.next.value!==value){
//                 curr=curr.next
//         }
//         if(curr.next){
//       let next=curr.next;
//       curr.next=node
//       node.next=next
//        this.size++
//         }
// }


// }

// const list=new linkedList()
// console.log(list.isEmpty());
// console.log(list.getSize());
// list.print()
// list.prepend(10)


// list.prepend(5)
// list.prepend(20)
// list.insert(40,)

// list.removeValue(10)
// list.print()
// console.log(list.search(20));
// // list.reverse()
// // list.print()
// list.insertBeforeValue(40,10)
// list.print()



//<----------------------converting--array--to--linked--list-------------------------->//

// class Node {
//     constructor(value) {
//         this.value = value;
//         this.next = null;
//     }
// }

// class linkedList {
//     constructor() {
//         this.head = null;
//         this.tail = null
//         this.size = 0;
//     }

//     isEmpty() {
//         return this.size === 0;

//     }
//     getSize() {
//         return this.size
//     }

//     insert(value) {

//         let node = new Node(value)

//         if (this.size === 0) {

//             this.head = node;
//             this.tail = node;
//         }
//         else {
//             this.tail.next = node;
//             this.tail = node;



//         }
//         this.size++



//     }

//     arrayToLinkedList(array) {

//         array.forEach((i) => {
//             this.insert(i)
//         });

//     }


//     print() {
//         if (this.isEmpty()) {
//             console.log('no items found');
//         } else {
//             let curr = this.head;
//             let arrayList = ''
//             while (curr) {
//                 arrayList += `${curr.value} `
//                 curr = curr.next //traversing the pointer
//             }
//             console.log(arrayList);
//         }
//     }
// }

// let list = new linkedList()
// let arr = [12, 3, 4, 5, 6]
// list.arrayToLinkedList(arr)
// list.print()



//<------------------------------------converting binary to decimal----------------------------->


// class Node{
//     constructor(value){
//         this.value=value;
//         this.next=null;
//     }
// }

// class linkedList{
//     constructor(){
//         this.head=null;
//         this.tail=null
//         this.size=0;
//     }


// isEmpty(){
//     return this.size===0;
// }

// insert(value){

//    let node=new Node(value)
//    if(this.isEmpty()){
//         console.log("ghjkl");  
//         this.head=node
//         this.tail=node
//     }
//     else{
//         this.tail.next=node;
//         this.tail=node;
//     }
//      this.size++
// }
// getArray(array){

//     array.forEach((i)=>{
//         return this.insert(i)
//     })

// }

// print(){
//     if(this.size==0){
//         return false
//     }else{
//         let current=this.head
//         let listArray=''
//         while(current){
            
//           listArray +=`${current.value} `
//           current=current.next
//         }
//       console.log(listArray);
//     }
// }

// convertToDecimal(){
  







//     let curr=this.head
//     let decimal=0;
//     let possi=this.size-1;

//     while(curr){
//         decimal+=curr.value*2**possi;
//         curr=curr.next
//         possi--
//     }

//    console.log(decimal);
// }

//  convertToBinary(number){
//     let arr=[];
//     let rem=0
//     let num=number

//     console.log(num,"number");
//     while (num>0) {
//         rem=num % 2;
//         num=Math.floor(num / 2);
        
//         arr.unshift(rem);
//         // console.log(rem);
//     }
//     console.log(arr);
//     return this.getArray(arr)
// }
    

// largeNumber(){
//     let curr=this.head
//     let large=this.head.value
//     // console.log(large,'largeee');
//     let possi=0;
   
//     while(curr){
      
//         if(curr.value>large){
//             large=curr.value
//             possi++
//         }
        
//         curr=curr.next  

//     }
//    console.log(large,'is the larget number');
//     return large
// }


// secondLargest(){
//     let curr=this.head;
//     let large=this.head.value
//    let second=this.head.value
//     let possi=0;
//     while(curr){
//         if(this.curr.value>large){
//             second=large
//             large=this.curr.value
//             curr=curr.next
        
//         }
//         if(this.curr.value<large&&this.curr.value>second){
//            second=this.curr.value
//            curr=curr.next
        
//         }
//      console.log(second)
//     }


// }














//  removeDuplicateElements() {
//     let current = this.head;
//     let set = new Set();
    
//     set.add(current.value);
    
//     while (current.next) {
//     if (set.has(current.next.value)) {
//     current.next = current.next.next;
//     } else {
//     set.add(current.next.value);
//     current = current.next;
//     }
//     }
//     }


// }

// function name(a1,a2) {
//     return [a1,a2]    
// }





// let list=new linkedList()////
// let array=[1,0,0,0]
// list.getArray(array);
// list.convertToDecimal()
// list.print()
// list.convertToBinary(16)
// list.print()
// let array=[25,45,71,20,10,58]
// list.getArray(array)
// list.largeNumber()

// let array=[25,15,11,25,10,11]
// list.getArray(array)
// list.print()

// list.removeDuplicateElements()
// list.print()


// function factorial(value){
//     if(value<2){
//         return value
//     }
//     return value*factorial(value-1)
// }

// console.log(factorial(5)); 
