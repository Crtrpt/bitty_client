export default class api {
    static url:string="http://127.0.0.1:9081/api/v1/"
    static headers={"Content-Type":"application/json","Platform":"vue","Version":"0.0.1"}

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