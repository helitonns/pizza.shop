import { Separator } from "@radix-ui/react-separator";
import { Home, Pizza, UtensilsCrossed } from "lucide-react";
import { AccountMenu } from "./account-menu";
import { NavLink } from "./nav-link";
import { ThemeToggle } from "./theme/theme-toggle";


export function Header(){
  return(
    <header className="border-b">
      <div className="flex items-center h-16 gap-6 px-6">
        <Pizza className="w-6 h-6" />
        
        <Separator orientation="vertical" className="h-6"/>
        
        <nav className="flex items-center space-x-4 lg:space-x-6">
          <NavLink to="/">
            <Home className="w-4 h-4" />
            Início
          </NavLink>
          
          <NavLink to="/orders">
            <UtensilsCrossed className="w-4 h-4" />
            Pedidos
          </NavLink>
        </nav>

        <div className="flex items-center gap-2 ml-auto">
          <ThemeToggle />
          <AccountMenu />
        </div>
      </div>
    </header>
  );
}