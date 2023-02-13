// class HashTable{
//     constructor(size){
//         this.table=new Array(size);
//         this.size=size
//     }
    
//     hash(key){
//         let total=0;
//         for(let i=0;i<key.length;i++){
//             total+=key.charCodeAt(i)
//           }
//           return total%this.size
// }

//     set(key,value){
//         const index=this.hash(key)
//         this.table[index]=value
//     }

//     get(key){
//         const index=this.hash(key)
//         return this.table[index]
//     }
//     remove(key)
//     {
//         const index=this.hash(key)
//       if(this.table[index]){
//         this.table[index]=undefined
//       }else{
//         console.log('no item found');
//       }
//     }
//     print(){
//         for(let i=0;i<this.table.length;i++){
//             if(this.table[i]){
//                 console.log(i,this.table[i]);
//             }
//         }
//     }
// }

// let hashtable=new HashTable(60)
// hashtable.set('name','athul')
// hashtable.set('age',21)
// hashtable.set('place','wayanad')
// hashtable.print()
// hashtable.remove('place')
// hashtable.print()


//<---------------------------------collisionControlledHashTable------------------------------->


// class HashTable{
//     constructor(size){
//         this.table=new Array(size)
//         this.size=size
//     }
//     hash(key){
//         let total=0
//         for(let i=0;i<key.length;i++){
//             total+=key.charCodeAt(i)
//         }
//         return total%this.size
       
//     }

//     set(key,value){
//         let index=this.hash(key)
//         let bucket=this.table[index]
//         if(!bucket){
//             this.table[index]=[[key,value]]
//         }else{
//             let sameKey=bucket.find(item=>item[0]===key)
//           //changing the value of the same key item
//             if(sameKey){
//                 sameKey[1]=value
//             }else{
//                 bucket.push([key,value])
//             }
//         }
//     }
// get(key){
//     let index=this.hash(key)
//     let bucket=this.table[index]
//     if(bucket){
//         let sameKey=bucket.find(item=>item[0]===key)
//         if(sameKey){
//             return sameKey[1]//return value
//         }
//     }
//     return undefined
// }
// remove(key){
//     let index=this.hash(key)
//     let bucket=this.table[index]
//     if(bucket){
//         let sameKey=bucket.find(item=>item[0]===key)
//         if(sameKey){
//             bucket.splice(bucket.indexOf(sameKey),1)
//         }
//     }

// }
// display(){
//     for(let i=0;i<this.table.length;i++){
       
//         if(this.table[i]){
          
//             console.log(i,this.table[i]);
//         }
//     }
// }
// }

// let table=new HashTable(50)
// table.set('name','athul')
// table.set('mane',452)

// table.display()
// table.set('age',21)
// table.set('place','wayanad')
// table.display()
// table.remove('place')
// table.display()
// console.log(table.get('mane'));
// console.log(table.get('age'));


//<--------------------------------------

// class HashTable{
   
//    constructor(size){
   
//     this.table=new Array(size)
//     this.size=size
// }

// hash(key){
//     let total=0;
//     for(let i=0;i<key.length;i++){
//         total+=key.charCodeAt(i)
//     }
//     return total%this.size
// }
// set(key,value){
//     let index=this.hash(key)
//     //console.log(this.table[index],'hdhbc');
//     let bucket=this.table[index];
//     if(!bucket){
//         this.table[index]=[[key,value]]
//     }
//     else{
//         let sameKey=bucket.find(item=>item[0]===key)
//    if(sameKey){
//     sameKey[1]=value
//    }else{
//     bucket.push([key,value])
//    }
   
//     }
// }
// get(key){
//     let index=this.hash(key)
//     let bucket=this.table[index]
//     if(bucket){
//         let sameKey=bucket.find(item=>item[0]===key)
//         if(sameKey){
//             return sameKey[1]
//         }
//     }
//     return undefined
// }
// remove(key){
//     let index=this.hash(key)
//     let bucket=this.table[index]
//     if(bucket){
//         let sameKey=bucket.find(item=>item[0]===key)
//         if(sameKey){
//             bucket.splice(bucket.indexOf(sameKey),1)
//         }
//     }
// }
// display(){
//     for(let i=0;i<this.table.length;i++){
//         if(this.table[i]){
//             console.log(i,this.table[i]);
//         }
//     }
// }
    
// }

// let table=new HashTable(50)
// table.set('name','athul')
// table.set('mane',452)

// table.display()



class HashTable{
    constructor(size){
        this.table=new Array(size);
        this.size=size;
    }
    hash(key){
        let total=0;
        for(let i=0;i<key.length;i++){
            total+=key.charCodeAt(i);

        }
        return total%this.size
    }
    set(key,value){
        let index=this.hash(key)
        let bucket=this.table[index]
        if(!bucket){
            this.table[index]=[[key,value]]
        }
        else{
            let sameKey=bucket.find(item=>item[0]===key)
            if(sameKey){
                sameKey[1]=value
            }
            else{
                bucket.push([key,value])
            }
            }
    }
    get(key){
        let index=this.hash(key)
        let bucket=this.table[index]
        if(bucket){
            let sameKey=bucket.find(item=>item[0]===key)
            if(sameKey){
                return sameKey[1]
            }
        }
        return undefined
    }
    remove(key){
        let index=this.hash(key)
        let bucket=this.table[index]
        if(bucket){
            let sameKey=bucket.find(item=>item[0]===key)
            if(sameKey){
                bucket.splice(bucket.indexOf(sameKey),1)
            }
        }
    }

    display(){
        for(let i=0;i<this.table.length;i++){
            if(this.table[i]){
                console.log(i,this.table[i]);
            }
            
        }
    }
}

let table=new HashTable(50)
table.set('name','athul')
table.set('mane',452)
table.remove('name')
table.display()
