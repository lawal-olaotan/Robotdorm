export function getUserId (){
    const getData = fetch('/api/getInfo').then(res => res.json()).then(data => {
       return data;
    }) 
    return getData
}