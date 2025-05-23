import { useEffect, useState } from "react"

const useFetch=<T>(fetchFunction:()=> Promise<T>,autoFetch = true)=>{
    const [data,setData] = useState<T | null>(null);
    const [loding,setLoding]  =useState(false);
    const [error,setError] = useState<Error | null>(null); 

    const fetchData = async () =>{
        try {
            setLoding(true);
            setError(null)

            const result = await fetchFunction();
            setData(result)
        }catch(err){
            // @ts-ignore
            setError(err instanceof Error ? err: new Error('An error occured'))
        }finally{
            setLoding(false);
        }
    }
    const reset = () =>{
        setData(null);
        setLoding(false);
        setError(null);
    }
    
    useEffect(()=>{
        if(autoFetch){
            fetchData();
        }
    },[]);
    return {data,loding,error,refetch:fetchData, reset}

}
export default useFetch;