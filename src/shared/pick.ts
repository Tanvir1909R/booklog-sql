

const pick = <O extends object,K extends keyof O>(obj:O,keys:K[]):Partial<O> => {
  let finalObj:Partial<O> ={};
  for(let key of keys){
    if(obj && Object.hasOwnProperty.call(obj,key)){
        finalObj[key] = obj[key]
    }
  }

  return finalObj
 
}

export default pick