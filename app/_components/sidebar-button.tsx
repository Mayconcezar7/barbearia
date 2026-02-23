import React from "react"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetClose,
  SheetTitle,
} from "./ui/sheet"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import {
  Calendar1Icon,
  HomeIcon,
  LogInIcon,
  LogOut,
  MenuIcon,
} from "lucide-react"
import Link from "next/link"
import { quickSearchOptions } from "./_constants/searchQuick"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "./ui/dialog"
import { DialogTitle } from "@radix-ui/react-dialog"

import logoGoogle from "../../public/google.svg";

const SidebarButton = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader className="">
          <SheetTitle className="text-start text-lg font-bold">Menu</SheetTitle>
        </SheetHeader>

        {/*<div className="flex items-center justify-start gap-3 border-b border-solid py-5">
              <Avatar>
                <AvatarImage
                  alt=""
                  src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D"
                />
              </Avatar>

              <div className="flex flex-col">
                <p className="truncate text-base font-bold">Maycon Cezar</p>
                <p className="truncate text-xs font-normal">
                  maycon.cezar.souza@gmail.com
                </p>
              </div>
            </div>*/}

        <div className="flex items-center justify-between gap-3 border-b border-solid py-5">
          <h2 className="text-base font-bold">Olá. Faça seu login!</h2>

          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" >
                <LogInIcon size={18} />
              </Button>
            </DialogTrigger>
            <DialogContent className="flex w-[90%] flex-col items-center">
              <DialogTitle className="text-base font-bold">
                Faça login na plataforma
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-600">
                Conecte-se usando sua conta do Google
              </DialogDescription>
              <Button variant="outline" className="w-full">
                <Image alt="login usando conta do google" src={logoGoogle} width={18} height={18}/>
                Google</Button>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex flex-col gap-2 border-b border-solid py-5">
          <SheetClose>
            <Button
              className="flex w-full items-center justify-start text-sm font-normal"
              variant="ghost"
            >
              <Link href="/" className="flex items-center gap-2">
                <HomeIcon size={18} />
                Ìnicio
              </Link>
            </Button>
          </SheetClose>

          <Button
            className="flex items-center justify-start text-sm font-normal"
            variant="ghost"
          >
            <Calendar1Icon size={18} />
            Agendamentos
          </Button>
        </div>

        <div className="flex flex-col gap-2 border-b border-solid py-5">
          {quickSearchOptions.map((option) => (
            <Button
              className="flex items-center justify-start text-sm font-normal"
              variant="ghost"
              key={option.title}
            >
              <Image
                alt={option.title}
                src={option.imageUrl}
                width={18}
                height={18}
              />
              {option.title}
            </Button>
          ))}
        </div>

        <div className="flex flex-col gap-2 py-5">
          <Button
            className="flex items-center justify-start text-sm font-normal"
            variant="ghost"
          >
            <LogOut />
            Sair da conta
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default SidebarButton
