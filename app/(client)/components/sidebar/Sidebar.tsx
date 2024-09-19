"use client"
import React from 'react'
import { BookOpen, Zap } from "lucide-react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const GettingStartedMenu = [
  {
    label: "Introduction",
    href: "/",
    icon: <BookOpen className="w-4 h-4" />,
  },
  {
    label: "Quick Start",
    href: "/quick-start",
    icon: <Zap className="w-4 h-4" />,
  }
];

const MoviesMenu = [
  {
    label: "Discover",
    href: "/reference/movies/discover",
    method: "GET",
  },
  {
    label: "Details",
    href: "/reference/movies/details",
    method: "GET",
  },
  {
    label: "Popular",
    href: "/reference/movies/popular",
    method: "GET",
  },
  {
    label: "Top Rated",
    href: "/reference/movies/top-rated",
    method: "GET",
  }
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="col-span-3 hidden md:block">
      <div className="sticky top-24">
        <nav>
          <ul>
            <li className="mb-4">
              <h2 className="text-foreground font-semibold text-lg mb-2">
                Getting Started
              </h2>
              <ul className="pl-2">
                {GettingStartedMenu.map((item, index) => (
                  <li
                    key={index}
                    className={cn(
                      "mb-1 hover:bg-secondary py-1 px-2 rounded-md",
                      pathname === item.href ? "bg-secondary" : ""
                    )}
                  >
                    <Link
                      scroll={false}
                      href={item.href}
                      className="flex items-center justify-between space-x-2 text-foreground/80 hover:text-foreground"
                    >
                      <span className="flex items-center gap-2">
                        {item.icon}
                        {item.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className="mb-4">
              <h2 className="text-foreground font-semibold text-lg mb-2">
                Movies
              </h2>
              <ul className="pl-2">
                {MoviesMenu.map((item, index) => (
                  <li
                    key={index}
                    className={cn(
                      "mb-1 hover:bg-secondary py-1 px-2 rounded-md",
                      pathname === item.href ? "bg-secondary" : ""
                    )}
                  >
                    <Link
                      scroll={false}
                      href={item.href}
                      className="flex items-center justify-between space-x-2 text-foreground/80 hover:text-foreground"
                    >
                      <span className="flex items-center gap-2">
                        {item.label}
                      </span>
                      {item.method && (
                        <Badge
                          variant="outline"
                          className={`ml-2 ${
                            item.method === "GET"
                              ? "bg-green-100 text-green-800 border-green-300"
                              : ""
                          }`}
                        >
                          {item.method}
                        </Badge>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}
