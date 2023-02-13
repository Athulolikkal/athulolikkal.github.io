class Node{
    constructor(value){
        this.value=value;
        this.next=null;
    }
}

// class Queue{
//     constructor(){
//         this.front=null;
//         this.rear=null;
//         this.size=0;
//     }

//     enqueue(value){
//         let node=new Node(value)
//         if(this.size===0){
//             this.front=node;
//             this.rear=node;
//         }
//       else{
//         this.rear.next=node;
//         this.rear=node
//       }  
//         this.size++
   
//     }

    
// }


function selectionSort(arr){
    for(let i=0;i<arr.length-1;i++){
        
        let min=i
       
        for(let j=i+1;j<arr.length;j++){
            if(ar){
                let temp=arr[i]
                arr[i]=arr[j]
                arr[j]=temp;
            }
        }
    }
    return arr
}

console.log(selectionSort([3,52,8,6]));