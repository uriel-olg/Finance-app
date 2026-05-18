import { SideBar } from "./SideBar";

import { ReactNode } from 'react'

type Props = {
    children: ReactNode
}

export const Layout = ({children}:Props)=>(
        <div className="bg-[#0d0d1a] flex w-full h-full">
            <SideBar></SideBar>
            <main className="w-full h-full overflow-auto">
            {children}
            </main>
        </div>
)