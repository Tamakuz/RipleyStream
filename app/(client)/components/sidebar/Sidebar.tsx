"use client"
import React from 'react'
import { BookOpen, Zap } from "lucide-react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
const SidebarMenus = [
  {
    label: "Getting Started",
    children: [
      {
        label: "Introduction",
        href: "/",
        icon: <BookOpen className="w-4 h-4" />,
      },
      {
        label: "Quick Start",
        href: "/quick-start",
        icon: <Zap className="w-4 h-4" />,
      },
    ]
  }
]

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="col-span-3">
      <div className="sticky top-24">
        <nav>
          <ul>
            {SidebarMenus.map((menu, index) => (
              <li key={index} className="mb-4">
                <h2 className="text-foreground font-semibold text-lg mb-2">
                  {menu.label}
                </h2>
                <ul className="pl-2">
                  {menu.children.map((child, childIndex) => (
                    <li
                      key={childIndex}
                      className={cn(
                        "mb-1 hover:bg-secondary py-1 px-2 rounded-md",
                        pathname === child.href ? "bg-secondary" : ""
                      )}
                    >
                      <Link
                        href={child.href}
                        className="flex items-center space-x-2 text-foreground/80 hover:text-foreground"
                      >
                        {child.icon}
                        <span>{child.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
