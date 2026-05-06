import { SideBar } from "./SideBar";

import { ReactNode } from 'react'

type Props = {
    children: ReactNode
}

export const Layout = ({children}:Props)=>(
        <div className="bg-[#0d0d1a] flex w-full h-full">
            <SideBar></SideBar>
            <main className="flex w-3/4 m-auto min-h-full">
            {children}
            </main>
        </div>
)