//--------------------------------------------------bubble sort------------------------------------------------->

//ascending order-------------------------------------------------------------->

// function bubbleSort(arr){
//     let swapped
//     do{
//         swapped=false
//         for(let i=0;i<arr.length-1;i++){
//             if(arr[i]>arr[i+1]){
//                 let temp=arr[i]
//                 arr[i]=arr[i+1]
//                 arr[i+1]=temp
//                 swapped=true;
//             }
//         }


//     }while(swapped){

//     }

//     return arr;
// }

// console.log(bubbleSort([1,2,5,-6,3,0]));

//descending order----------------------------------------------------------------------->

// function bubbleDescendingOrder(arr) {
// let swapped
//     do{
//        swapped=false
//        for(let i=0;i<arr.length-1;i++){
//         if(arr[i]<arr[i+1]){
//             let temp=arr[i];
//             arr[i]=arr[i+1];
//             arr[i+1]=temp
//             swapped=true
//         }}
//     }while(swapped){

// }
//    return arr 
// }


// console.log(bubbleDescendingOrder([1,2,5,-6,3,0]));


//<----------------------------------------------insertSort--------------------------------------------------------->
//<----------------------ascendingOrder---------------------------->

// function insertSort(arr) {

//     for(let i=1;i<arr.length;i++){
        
//         let insert=arr[i]
//         let j=i-1;

//         while(j>=0&&arr[j]>insert){
//             arr[j+1]=arr[j]
//             j=j-1
//         }
//         arr[j+1]=insert
    
    
//     }
//     return arr
    
// }

// console.log(insertSort([1,2,5,-6,3,0]));


//<----------------------descendingOrder---------------------------->


// function insertSortDescendingOrder(arr){
//     for(let i=1;i<arr.length;i++){
//         let value=arr[i]
//         let j=i-1

//         while(j>=0&&arr[j]<value){
//             arr[j+1]=arr[j];
//             j=j-1
//         }
//         arr[j+1]=value
//     }
//     return arr
// }

// console.log(insertSortDescendingOrder([1,2,5,-6,3,0]));




//<---------------------------------------------quick sort-------------------------------------------------->
//<--------------------------ascendingOrder--------------------------------->

// function quickSort(arr){
//     if(arr.length<2){
//         return arr
//     }
    
//     let pivot=arr[arr.length-1]
//     let left=[]
//     let right=[]
//     for(let i=0;i<arr.length-1;i++){
//         if(arr[i]<pivot){
//             left.push(arr[i])
//         }else{
//             right.push(arr[i])
//         }
//     }
// return [...quickSort(left),pivot,...quickSort(right)]
// }


// console.log(quickSort([1,-2,5,-6,3,0]));

//<-------------------------descendingOrder--------------------------------->

// function quickSort(arr){
//     if(arr.length<2){
//         return arr
//     }
//     let pivot=arr[arr.length-1]
//     let left=[]
//     let right=[]
//     for(let i=0;i<arr.length-1;i++){
//         if(arr[i]>pivot){
//             left.push(arr[i])
//         }else{
//             right.push(arr[i])
//         }
//     }
// return[...quickSort(left),pivot,...quickSort(right)]
// }

// console.log(quickSort([1,-2,5,-6,3,0]));



//<---------------------------------------mergeSort----------------------------------------------------------->

//ascending order------------------------------------------>

// function mergeSort(arr){
   
//     if(arr.length<2){
//         return arr
//     }
//    let mid=Math.floor(arr.length/2)
//     let left=arr.slice(0,mid)
//     let right=arr.slice(mid)

//     return merge(mergeSort(left),mergeSort(right))
// }

// function merge(left,right){
//     let sort=[];
//     while(left.length&&right.length){
//         if(left[0]<=right[0]){
//             sort.push(left.shift())
//         }else{
//             sort.push(right.shift())
//         }
//     }
//     return[...sort,...left,...right]
// }


// console.log(mergeSort([1,-2,5,-6,3,0]));


//descending order------------------------------------------------>

// function mergeSort(arr){
//     if(arr.length<2){
//         return arr
//     }
//    let midd=Math.floor(arr.length/2);
//     let left=arr.slice(0,midd)
//     let right=arr.slice(midd)
//     return sort(mergeSort(left),mergeSort(right))

// }

// function sort(left,right){
//   let sortarr=[]
//     while(left.length&&right.length){
         
//         if(left[0]>=right[0]){
//             sortarr.push(left.shift())
//         }else{
//             sortarr.push(right.shift())
//         }
//     }
//     return[...sortarr,...left,...right]
// }

//  console.log(mergeSort([1,-2,5,-6,3,0]));

//<--------------------------selection sort----------------------------------------------------->

//<--------ascending order------------------------------

// function selectionSort(arr){
//     for(let i=0;i<arr.length-1;i++){
//         let min=i
       
//         for(let j=i+1;j<arr.length;j++){
            
//             if(arr[j]<arr[min]){
//                 min=j
//           }
       
//         }
//         if(min!==i){
//             let temp=arr[i]
//             arr[i]=arr[min]
//             arr[min]=temp

//         }
//     }

//     return arr;
// }

// console.log(selectionSort([1,-2,5,-6,3,0]));


//<--------descending order------------------------------

// function selectionSort(arr){
//     for(let i=0;i<arr.length-1;i++){
//         let min=i
//         for(let j=i+1;j<arr.length;j++){
//             if(arr[j]>arr[min]){
//                 min=j
//             }
//         }
//         if(min!==i){
//             let temp=arr[i]
//             arr[i]=arr[min]
//             arr[min]=temp
//         }
//     }
//     return arr
// }

// console.log(selectionSort([1,-2,5,-6,3,0]));


//input : 
//output : 


function selection(arr){
    for(let i=0;i<arr.length-1;i++){
       let min=i
        for(let j=i+1;j<arr.length;j++){
            if(arr[j]<arr[min]){
                min=j
            }
        }
        if(min!==i){
            let temp=arr[i]
            arr[i]=arr[min]
            arr[min]=temp
        }
    }
    return arr
}

console.log(selection([1,-2,5,-6,3,0]));
