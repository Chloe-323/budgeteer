import { Button, Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, EnvelopeIcon, XMarkIcon } from '@heroicons/react/24/outline'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import logo from "../../../public/logo.png";
import { ContactButton } from './elements';
import { IHasChildrenProps } from './layout';
import { UserChip } from './userchip';

interface IPage {
    name: string,
    href: string,
}


const navigation = [
    { name: 'About', href: '/about' },
    { name: 'Dashboard', href: '/dashboard' },

]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export function Navbar(props: IHasChildrenProps) {

    return (
        <Disclosure as="nav" className="bg-cascade-100">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 font-raleway">
                <div className="relative flex h-16 items-center justify-between">

                    {/* Mobile menu button*/}
                    <MobileMenuButton />

                    {/* Left side of navbar */}
                    <LeftNavbar />

                    {/* Right side of navbar */}
                    <RightNavbar />
                </div>
                {/* Mobile Menu */}
                <MobileMenu />

            </div>


        </Disclosure>
    )
}

function LeftNavbar() {
    return (
        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            {/* Logo */}
            <div className="flex flex-shrink-0 items-center">
                <a href="/">
                    <Image
                        alt=""
                        src={logo}
                        className="h-8 w-auto dark:invert"
                    />
                </a>
            </div>
            {/* Menu Options */}
            <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                    {navigation.map((item) => (
                        NavbarMenuItem(item)
                    ))}
                </div>
            </div>
        </div>
    );
}

function NavbarMenuItem(item: IPage) {
    const [isSelected, setSelected] = useState(false);

    useEffect(() => {
        console.log(window.location.pathname)
        setSelected(window.location.pathname === item.href);
    }, [])

    return (
        <a
            key={item.name}
            href={item.href}
            aria-current={isSelected ? 'page' : undefined}
            className={classNames(
                isSelected ?
                    'bg-cascade-400 text-foreground' :
                    'text-cascade-700 hover:bg-cascade-400 hover:text-foreground',
                'rounded-md px-3 py-2 text-sm font-medium',
            )}
        >
            {item.name}
        </a>
    );
}

function RightNavbar() {
    return (
            <UserChip/>
    );
}

function MobileMenuButton() {
    return (
        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-cascade-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
            </DisclosureButton>
        </div>
    );
}

function MobileMenu() {
    return (
        <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                    MobileMenuItem(item)
                ))}
            </div>
        </DisclosurePanel>
    );
}

function MobileMenuItem(item: IPage) {
    const [isSelected, setSelected] = useState(false);

    useEffect(() => {
        setSelected(window.location.pathname === item.href);
    }, [])

    return (
        <DisclosureButton
            key={item.name}
            as="a"
            href={item.href}
            aria-current={isSelected ? 'page' : undefined}
            className={classNames(
                isSelected ?
                    'bg-cascade-400 text-foreground' :
                    'text-cascade-7-- hover:bg-cascade-400 hover:text-foreground',
                'block rounded-md px-3 py-2 text-base font-medium',
            )}
        >
            {item.name}
        </DisclosureButton>
    );
}