import { Modal } from "./Modal";
import { SideBar } from "./SideBar";

import { ReactNode, useState } from 'react'

type Props = {
    children: ReactNode
}




export const Layout = ({children}:Props)=>{

    const [abierto,setAbierto] = useState(false)
    
    return (
    
        <div className={`bg-[#0d0d1a] grid grid-cols-1 md:grid-cols-[20%_80%] w-full h-full`}>

            <SideBar onTransaccion={() => setAbierto(true)} />
            <Modal abierto={abierto} onCerrar={()=> setAbierto(false)}></Modal>
            <main className="w-full h-full overflow-auto">
            {children}
            </main>
            
        </div>
        )
}