import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import MobileMenu from "./MobileMenu";
import NavLink from "./NavLink";
import { routes } from "./navigation";

/**
 * En-tête commun à toutes les pages.
 * Server component : seuls le menu mobile et les liens actifs sont des composants clients.
 */
export default function Header() {
  return (
    <header>
      {/* Mobile et tablette */}
      <MobileMenu />

      {/* Desktop */}
      <div className="hidden justify-center px-4 pt-10 lg:flex">
        <div className="w-full max-w-[782px] rounded-[10px] bg-blanc px-[100px] py-2 shadow-[0px_4px_4px_0px_rgba(182,182,182,0.05)]">
          <div className="flex items-center justify-between">
            <nav aria-label="Navigation principale">
              <ul className="flex items-center gap-7 text-sm text-noir">
                <li>
                  <NavLink href={routes.home} className="hover:text-main-red">
                    Accueil
                  </NavLink>
                </li>
                <li>
                  <NavLink href={routes.about} className="hover:text-main-red">
                    À propos
                  </NavLink>
                </li>
              </ul>
            </nav>

            <Link href={routes.home}>
              <Image src="/images/logo.svg" alt="Kasa - Accueil" width={113} height={40} />
            </Link>

            <div className="flex items-center gap-7">
              <NavLink href={routes.addProperty} className="text-sm text-main-red hover:underline">
                +Ajouter un logement
              </NavLink>
              <div className="flex items-center gap-2 text-noir">
                <NavLink href={routes.favorites} className="hover:text-main-red">
                  <Icon name="favoris" label="Favoris" />
                </NavLink>
                <span aria-hidden="true" className="h-[5px] w-px bg-noir" />
                <NavLink href={routes.messages} className="hover:text-main-red">
                  <Icon name="message" label="Messagerie" />
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
