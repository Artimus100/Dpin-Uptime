"use client"
import { useAuth} from "@clerk/nextjs"
import { useEffect, useState } from "react"
import axios from "axios"
import { API_BACKEND_URL } from "@/config"


interface Website {
    id: string
    url: string
    ticks:{
        id: string;
        createdAt: string;
        status: string
        latency: number
    }[];
}





export function useWerbsites(){
    const {getToken} = useAuth()
    const [websites, setWebsites] = useState<Website[]>([])

    async function refereshWebsites(){
        const token = await getToken()
        const response = await axios.get(`${API_BACKEND_URL}/websites`,{
            headers:{
                Authorization: token,
            }
        })

        setWebsites(response.data.websites)

    }
    useEffect (()=>{ 
        refereshWebsites()

        const interval = setInterval(()=>{
            refereshWebsites()
        }, 1000 * 60 * 1)
        return ()=> clearInterval(interval)
        
    }, []);

    return websites;
}