
//<------------------------------secondLargest------------------------------------->

// function secondLargest(arr){
//     console.log(arr);
//     let largest=0;
//     let secondLargest=0;
//     for(let i=0;i<arr.length;i++){
//         if(arr[i]>largest){
           
//             secondLargest=largest
//             largest=arr[i]
//         }
//        else if(arr[i]<largest && arr[i]>secondLargest){
           
//             secondLargest=arr[i]
//         }
//     }
//     return secondLargest
// }


// let array=[10,15,30,10,45,8]
// console.log(secondLargest(array))



//<--------------------------------reverseString------------------------------------->

// function reverseString(){
// let string='brototype'
// let reverse=''
// //console.log(string.length-1);
// for(let i=string.length-1;i>=0;i--){
//     reverse+=string[i];
// }
// console.log(reverse);
// }

// reverseString()


//<----------------------------------plaindrom----------------------------------------->

// function plaindrome(){
//     let string='racecar';
//     let length=Math.floor((string.length)/2)
//     let totalLength=string.length
//     console.log(length);
//     for(let i=0;i<length;i++){
//         if(string[i]!==string[totalLength-i-1]){
//              return false
//         }
//     }
//    return true
// }
//   console.log(plaindrome());  

//--------------find a posstion of the alpha----------------------------------->

// function findAlpha(string,alpha){
 
//     for(let i=0;i<string.length;i++){

//    if(string[i]===alpha){

//     return i;
    
// }
// }
// return false
// }
// console.log(findAlpha('athul','u'));


//--------------------------------------concatination------------------------------------

// function array(){
//   let arr=[1,2,3,4]
//   let abc=[5,6,7,8]
  
//   let length=arr.length+abc.length
//   console.log(length);
//   for(let i=0;i<length;i++){
   
//   if(i<length/2){
//       arr[i]=arr[i]
//     }else{

//     arr[i]=abc[i-length/2]
//     }
//    }
// console.log(arr);
// }

// array()


//<--------------same array insertion dual time------------------------>

// function arryInsertion(arr) {
//   let array = [];
  
//   for (let i = 0; i < arr.length * 2; i++) {
//       array[i] = arr[i % arr.length];
//   }
//   console.log(array);
// }
// let array = [1,2,3,4,5];
// arryInsertion(array);

//------------------------------------------------------

// function binarySerach(arr,target){
// //    console.log(arr,target);
//     let left=0;
//     let right=arr.length-1;
    
//     while(left<=right){
     
//         let middle=Math.floor((left+right)/2) 
//         // console.log(middle,'gfhfy');
//         // console.log(arr[middle]);
//         if(target===arr[middle]){
//             return middle
//         }
//         if(target<arr[middle]){
//             right=middle-1
//         }
//         else{
//             left=middle+1
//         }
   
   
//     }


// }

// let array=[1,2,3,4,5,6,7]
// console.log(binarySerach(array,4));

//<-------------------------------------recursive--binary--search-------------------------------------------> 


// function recursiveBinarySearch(arr,target){
//     return search(arr,target,0,arr.length-1)

// }

// function search(arr,target,left,right){

//     if(left>right){
//         return false
//     }
//     let middle=Math.floor((right+left)/2)
//   if(target===arr[middle]){
//         return middle
//     }
//    else if(target<arr[middle]){
//     return recursiveBinarySearch(arr,target,left,middle-1)
//     }
//     else {
//         return recursiveBinarySearch(arr,target,middle+1,right)
//     }
// }

// let array=[1,2,3,4,5,6,7]                
// console.log(recursiveBinarySearch(array,4));




// var removeDuplicates = function(nums) {
//     let i=0;
//     for(let j=1;j<nums.length;j++){
//         if(nums[j]!==nums[i]){
//             i++
//             nums[i]=nums[j]
//         }
//     }

//     let newArr=[];
// for(let k=0;k<i+1;k++){
//     newArr.push(nums[k])
// }
// return newArr
// };
// console.log(removeDuplicates([1,1,4,3,2,2]))



// let duplicate =function(arr){
    //     return[...new Set(arr)];
// }
// console.log(duplicate([1,1,4,3,2,2]))







// function arraySort(arr){
// let largest=0;
// let secondLargest=0;
// for(let i=0;i<arr.length;i++){
//     if(arr[i]>largest){
//         secondLargest=largest;
//         largest=arr[i]
//     }else if(arr[i]>secondLargest&&arr[i]<largest){
//         secondLargest=arr[i]

//     }

// }
// console.log(largest);
// console.log(secondLargest);
// let total=largest+secondLargest
// arr.sort((a,b)=>a-b)
// arr.splice(arr.length-1,0,total)
// console.log(arr);

//     // arr.sort()
//     // console.log(arr,'hjhjh');

// }

// let arr=[80,15,10,95,75]
// arraySort(arr);

// let num=321
// let reverse=num.toString().split('').reverse('').join('')
// console.log(reverse);


// function binarySearch(arr,target){

//     let right=arr.length;
//     let left=0;
//     while(left<right){
//         let middle=Math.floor((right+left)/2);
//         if(arr[middle]===target){
//             return middle
//         }
//         else if(arr[middle]<target){
//             right=middle-1
//         }
//         else{
//             left=middle+1
//         }
//     }
   
// }

// console.log(binarySearch([1,2,3,4,5,6],4));


// function peak(arr) {

   
//     for(let i=1;i<arr.length-1;i++){
   
//     if(arr[i]>arr[i-1]&&arr[i]>arr[i+1]){

//       console.log(arr[i]);
   
//     }

// }
    
// }


// peak([1,3,2,5,7,4]);


// function binarySearch(arr,target){

//     let left=0;
// let right=arr.length;

// while(left<right){
//     let middle=Math.floor((left+right)/2)
//     if(arr[middle]===target){
//         return middle
//     }
//     else if(arr[middle]<target){
//         right=middle-1
//     }
//     else{
//         left=middle+1
//     }
// }

// }

// console.log(binarySearch([12,4,8,50,45,20],20));


// function array(){
//     let a='aab#bba'
//     let b='aad#bba'
//     //console.log(a.length,'jhjhj');
//     a = a.replace('#','')
//    b=b.replace('#','')
//     console.log(a,b);
// }

// array()

