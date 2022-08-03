
console.log(import.meta.env)
export default class api {
    static url:string=import.meta.env.VITE_API_BASE_URL
    static headers={"Content-Type":"application/json","Platform":import.meta.env.VITE_PLATFORM,"Version":import.meta.env.VITE_VERSION}

    static get(path:string,query:Object):Promise<any>{
        var queryStr=Object.keys(query)
        .map(key => `${key}=${query[key]}`)
        .join('&');
       
        return fetch(api.url+path+"?"+queryStr,{
            "method":"GET",
            headers:api.headers
        }).then((res)=>{
            return res.json();
        });
    }
    static post(path:string,param:any):Promise<any>{
        return fetch(api.url+path,{
            "method":"POST",
            headers:api.headers,
            body:JSON.stringify(param)
        }).then((res)=>{
            return res.json();
        });
    }
}