"use client"

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
  DialogTitle,
  DialogHeader,
  DialogClose,
} from "./ui/dialog"

import logoGoogle from "@/public/google.svg"

import { authClient } from "../_lib/auth-client"
import { useRouter } from "next/navigation"

const SidebarButton = () => {
  const { data: session } = authClient.useSession()

  const router = useRouter()

  async function handlerSignInWithGoogle() {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    })
  }

  async function handlerLogoutandGoogle() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/")
        },
      },
    })
  }

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

        {session ? (
          <div className="flex items-center justify-start gap-3 border-b border-solid py-5">
            <Avatar>
              <AvatarImage alt="" src={`${session.user?.image}`} />
            </Avatar>

            <div className="flex flex-col">
              <p className="truncate text-base font-bold">
                {session.user?.name}
              </p>
              <p className="truncate text-xs font-normal">
                {session.user?.email}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-3 border-b border-solid py-5">
            <h2 className="text-base font-bold">Olá. Faça seu login!</h2>

            <Dialog>
              <DialogTrigger>
                <Button size="sm">
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

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handlerSignInWithGoogle}
                >
                  <Image
                    alt="login usando conta do google"
                    src={logoGoogle}
                    width={18}
                    height={18}
                  />
                  Google
                </Button>
              </DialogContent>
            </Dialog>
          </div>
        )}

        <div className="flex flex-col gap-2 border-b border-solid py-5">
          <SheetClose asChild>
            <Button
              className="flex w-full items-center justify-start text-sm font-normal"
              variant="ghost"
              asChild
            >
              <Link href="/" className="flex items-center gap-2">
                <HomeIcon size={18} />
                Início
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
            <SheetClose asChild key={option.title}>
              <Button
                className="flex items-center justify-start text-sm font-normal"
                variant="ghost"
                key={option.title}
                asChild
              >
                <Link href={`/barbershop?service=${option.title}`}>
                  <Image
                    alt={option.title}
                    src={option.imageUrl}
                    width={18}
                    height={18}
                  />
                  {option.title}
                </Link>
              </Button>
            </SheetClose>
          ))}
        </div>

        {session && (
          <div className="flex flex-col gap-2 py-5">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className="flex items-center justify-start text-sm font-normal"
                  variant="ghost"
                >
                  <LogOut />
                  Sair da conta
                </Button>
              </DialogTrigger>

              <DialogContent className="w-[80%]">
                <DialogHeader>
                  <DialogTitle>Sair</DialogTitle>
                </DialogHeader>
                <DialogDescription className="text-center">
                  Deseja mesmo sair da plataforma?
                </DialogDescription>
                <div className="flex w-full items-center justify-center gap-3">
                  <DialogClose asChild>
                    <Button variant="secondary" className="w-[40%]">
                      Cancelar
                    </Button>
                  </DialogClose>

               
                    <Button
                      variant="destructive"
                      onClick={handlerLogoutandGoogle}
                      className="w-[40%]"
                    >
                      Sair
                    </Button>
                 
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

export default SidebarButton
