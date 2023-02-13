


function sum(arr,target){
    let set=new Map()
   
    for(let i=0;i<arr.length;i++){
    


        if(set.has(target-arr[i])){

            return [set.get(target-arr[i]),i]
            
        }
        set.set(arr[i],i)
    
    }
   
}

console.log(sum([1,2,3,4,5],5));

