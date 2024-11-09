import { CodeXml, Signal, User } from "lucide-react";
import NavLink from "./nav-link";
import { ModeToggle } from "./mode-toggle";

export const Header = () => {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6 first:gap-10">
        <CodeXml className="size-6" />

        <nav className="flex items-center space-x-4 lg:space-x-6">
          <NavLink to="/desenvolvedores">
            <User className="size-4" />
            Desenvolvedores
          </NavLink>

          <NavLink to="/niveis">
            <Signal className="size-4" />
            Níveis
          </NavLink>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};
