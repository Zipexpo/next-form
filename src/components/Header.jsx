import Link from "next/link";
import { signOut } from "next-auth/react";
import { NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport, navigationMenuTriggerStyle} from "./ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/route";
import { cn } from "@/lib/utils";
import "./Header.scss"
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";

const Header = async()=>{
    const session = await getServerSession(authOptions);
    const isAuth = session;
    return <div className="bg-slate-200 border-b-2 py-3 px-5 md:px-10 lg:px-30">
        <div className="flex justify-between content-center w-full">
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <Link href="/" legacyBehavior passHref>
                            <NavigationMenuLink className={cn(navigationMenuTriggerStyle(),"menu-home menu-item")}>
                                NEXT-form
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="/manage-form" legacyBehavior passHref>
                            <NavigationMenuLink className={cn(navigationMenuTriggerStyle(),"menu-item")}>
                                Manage Form
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="/question" legacyBehavior passHref>
                            <NavigationMenuLink className={cn(navigationMenuTriggerStyle(),"menu-item")}>
                                Survey
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            {isAuth?<DropdownMenu>
                <DropdownMenuTrigger>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem href="account">Account</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem><LogoutButton/></DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>:<LoginButton/>}
        </div>
    </div>
}
export default Header;