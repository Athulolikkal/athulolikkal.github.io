//<---------------------------------bubble sort----------------------------------------------->

// function bubbleSort(arr){
//     let swapped;
//     do{
//          swapped=false
//         for(let i=0;i<arr.length-1;i++){
//             if(arr[i]>arr[i+1]){
//                 let temp=arr[i]
//                 arr[i]=arr[i+1]
//                 arr[i+1]=temp;
//                 swapped=true
//             }
//         }
//     }
//     while(swapped){

//     }
//     return arr

// }

// console.log(bubbleSort([8,6,1,3,4]));

//<---------------------------------------insertSort--------------------------------------------------->

// function insertSort(arr){
//     for(i=1;i<arr.length;i++){
//         let insert=arr[i]
//         let j=i-1
//    while(j>=0&&arr[j]>insert){
//     arr[j+1]=arr[j]
//     j=j-1
//    }
//    arr[j+1]=insert
   
   
//     }
//     return arr
// }

// console.log(insertSort([8,6,1,3,4]));

//-----------------------------------------quick sort----------------------------------------------------->

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

//     return[...quickSort(left),pivot,...quickSort(right)]

// }

// console.log(quickSort([8,6,1,3,4]));

//-----------------------------------------merge sort------------------------------------------------------->

// function mergeSort(arr){
//     if(arr.length<2){
//         return arr
//     }
//     let mid=Math.floor(arr.length/2)
//     let left=arr.slice(0,mid)
//     let right=arr.slice(mid)

//     return sort(mergeSort(left),mergeSort(right))
// }

// function sort(left,right){
//     let newArr=[]
//     while(left.length&&right.length){

//         if(left[0]<=right[0]){
//             newArr.push(left.shift())
//         }else{
//             newArr.push(right.shift())

//         }


//     }

//     return[...newArr,...left,...right]
// }

// console.log(mergeSort([8,6,1,3,4]));


// function sort(arr){

//     if(arr.length<2){
//         return arr
//     }
//     let mid=Math.floor(arr.length/2)
//     let left=arr.slice(0,mid)
//     let right=arr.slice(mid)
//     return merge(sort(left),sort(right))
// }

// function merge(left,right){
//     let newArr=[]
//     while(left.length&&right.length){
//         if(left[0]<=right[0]){
//             newArr.push(left.shift())
//         }else{
//             newArr.push(right.shift())
//         }
//     }
//     return[...newArr,...left,...right]
// }

// console.log(sort([8,6,1,3,4]));

// function Quick(arr){
//     if(arr.length<2){
//         return arr
//     }
//    let pivot=arr[arr.length-1]
//    let left=[]
//    let right=[]
//    for(let i=0;i<arr.length-1;i++){
//     if(arr[i]<pivot){
//         left.push(arr[i])
//     }else{
//         right.push(arr[i])
//     }
//    }
//    return[...Quick(left),pivot,...Quick(right)]
// }

// console.log(Quick([8,6,1,3,4]));

//quick sorting

function Sorting(arr){
    if(arr.length<2){
        return arr
    }
        let pivot=arr[arr.length-1]
        let left=[];
        let right=[]
        for(let i=0;i<arr.length-1;i++){
            if(arr[i]<pivot){
                left.push(arr[i])
            }else{
                right.push(arr[i])
            }
        }
        return[...Sorting(left),pivot,...Sorting(right)]

}

console.log(Sorting([8,5,1,6,3]));


//merge

function merge(arr){
    if(arr.length<2){
        return arr
    }
    let mid=Math.floor(arr.length/2)
    let left=arr.slice(0,mid)
    let right=arr.slice(mid)
    return sort(merge(left),merge(right))
}

function sort(left,right){
    let newArr=[]
    while(left.length&&right.length){
        if(left[0]<=right[0]){
            newArr.push(left.shift())
        }
        else{
            newArr.push(right.shift())
        }
    }

    return[...newArr,...left,...right]
}

console.log(merge([8,5,1,6,3]));