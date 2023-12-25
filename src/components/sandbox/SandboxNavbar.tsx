'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react'

type Props = {}

const SandboxNavbar: React.FC<Props> = (props) => {
  const pathname = usePathname()

  const menuItems = [
    { label: 'One', href: '/sandbox/one' },
    { label: 'Two', href: '/sandbox/two' },
    { label: 'Three', href: '/sandbox/three' },
  ]

  return (
    <Navbar isBordered>
      <NavbarBrand>
        <p className="font-bold text-inherit">ACME</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((menuItem) => {
          return (
            <NavbarItem isActive={pathname === menuItem.href} key={menuItem.href}>
              <Link href={menuItem.href}>{menuItem.label}</Link>
            </NavbarItem>
          )
        })}
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="end"></NavbarContent>
    </Navbar>
  )
}

export default SandboxNavbar
