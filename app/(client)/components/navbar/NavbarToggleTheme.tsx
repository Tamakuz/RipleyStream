"use client";

import React, { useEffect, useState, useMemo } from 'react';
import { useTheme } from 'next-themes';
import { MdOutlineWbSunny } from "react-icons/md";
import { IoMdMoon } from "react-icons/io";

export const NavbarToggleTheme = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = useMemo(() => {
    return () => setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  if (!mounted) return null;

  return (
    <button
      className="p-2 rounded-md focus:outline-none"
      onClick={toggleTheme}
    >
      {theme === 'dark' ? <MdOutlineWbSunny className="w-5 h-5" /> : <IoMdMoon className="w-5 h-5" />}
    </button>
  );
};