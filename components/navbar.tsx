"use client"
import { BaggageClaim, DoorOpen, Heart, ShoppingCart, User, User2 } from "lucide-react"
import { useRouter } from "next/navigation"
import MenuList from "./MenuList"
import ItemsMenuMobile from "./items-menu-mobile"
import ToggleTheme from "./ToggleTheme"
import { useCart } from "@/hooks/useCart"
import { useLovedProducts } from "@/hooks/useLovedProducts"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Button } from "./ui/button"
import { useAuth } from "@/context/AuthContext"

export default function Navbar() {
    const router = useRouter()
    const cart = useCart()
    const { lovedItems } = useLovedProducts()
    const { user, logout } = useAuth()

    return (
        <div className="flex items-center justify-between p-4 mx-auto cursor-pointer sm:max-w-4xl md:max-w-6xl">
            <h1 className="text-3xl" onClick={() => router.push("/")}>
                Brad
                <span className="font-bold">Dev</span>
            </h1>
            <div className=" items-center justify-between hidden sm:flex">
                <MenuList />
            </div>
            <div className="flex sm:hidden">
                <ItemsMenuMobile />
            </div>
            <div className=" flex items-center justify-between gap-2 sm:gap-7">
                {cart.items.length === 0 ? (
                    <ShoppingCart strokeWidth="1" className="cursor-pointer" onClick={() => router.push("/cart")} />
                ) : (
                    <div className="flex gap-1" onClick={() => router.push("/cart")}>
                        <BaggageClaim strokeWidth={1} className="cursor-pointer" />
                        <span>{cart.items.length}</span>
                    </div>
                )}
                <Heart strokeWidth="1" className={`cursor-pointer ${lovedItems.length > 0 && `fill-black dark:fill-white`}`} onClick={() => router.push("/loved-products")} />
                {user === null ? (
                    <User strokeWidth="1" className="cursor-pointer" onClick={() => router.push("/login")} />
                ): (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <User strokeWidth="1" className="cursor-pointer" onClick={() => router.push("/login")} />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <User className="mr-2 h-4 w-4" />
                                    <span>Profile</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator /> 
                                <DropdownMenuItem onClick={() => logout()} className="cursor-pointer">
                                    <DoorOpen className="mr-2 h-4 w-4" />
                                    <span>LogOut</span>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
                
                <ToggleTheme />
            </div>
        </div>
    )
}
