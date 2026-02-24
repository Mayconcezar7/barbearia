import React from "react"
import { Card, CardContent } from "./ui/card"
import Image from "next/image"
import SidebarButton from "./sidebar-button"
import Link from "next/link"

const Header = () => {
  return (
    <Card className="rounded-none">
      <CardContent className="flex flex-row items-center justify-between p-4">
        <Link href="/">
          <Image
            alt="FSW Barber"
            src="/logoHeader.webp"
            height={18}
            width={120}
          />
        </Link>
        <SidebarButton />
      </CardContent>
    </Card>
  )
}

export default Header
