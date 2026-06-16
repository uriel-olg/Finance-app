import { Modal } from "./Modal";
import { SideBar } from "./SideBar";
import type { ReactNode } from "react";
import { useState } from 'react'

type Props = {
    children: ReactNode
}




export const Layout = ({children}:Props)=>{

    const [abierto,setAbierto] = useState(false)
    
    return (
    
        <div className={`bg-[#0d0d1a] flex flex-col md:grid md:grid-cols-[15%_85%] w-full h-full`}>

            <SideBar onTransaccion={() => setAbierto(true)}/>
            <Modal abierto={abierto} onCerrar={()=> setAbierto(false)}></Modal>
            <main className="w-full h-full overflow-auto">
            {children}
            </main>
            
        </div>
        )
}