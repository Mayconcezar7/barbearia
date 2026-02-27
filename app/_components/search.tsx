"use client"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { SearchIcon } from "lucide-react"
import { useState } from "react"

import{useRouter} from "next/navigation"

const Search = () => {
    const router = useRouter()

    const [search , setSearch] = useState("")
    

    function handlerSearch(e: React.FormEvent) {
        e.preventDefault()
        router.push(`/barbershop?title=${search}`)
    }

  return (
    <form onSubmit={handlerSearch} className="flex items-center gap-2">
      <Input placeholder="Buscar" value={search} onChange={(e)=> setSearch(e.target.value)}/>
      <Button size="icon" type="submit">
        <SearchIcon />
      </Button>
    </form>
  )
}

export default Search
