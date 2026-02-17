import React from "react"
import { Card, CardContent } from "./ui/card"
import Image from "next/image"
import SidebarButton from "./sidebar-button"


const Header = () => {
  return (
    <Card>
      <CardContent className="flex flex-row items-center justify-between p-4">
        <Image
          alt="FSW Barber"
          src="/logoHeader.webp"
          height={18}
          width={120}
        />
        <SidebarButton/>
        
      </CardContent>
    </Card>
  )
}

export default Header
