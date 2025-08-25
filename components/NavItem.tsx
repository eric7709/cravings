"use client";
import { useUIStore } from "@/store/useUIStore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface NavItemProps {
  icon: ReactNode;
  label: string;
  badge?: boolean;
  link?: string;
  onClick?: () => void;
}

export default function NavItem({
  icon,
  label,
  badge,
  link,
  onClick,
}: NavItemProps) {
  const { closeDrawer, startLoading } = useUIStore();
  const pathname = usePathname();
  const isActive = link ? pathname === link : false;

  const baseClasses = `flex items-center cursor-pointer gap-2.5 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200 relative ${
    isActive
      ? "bg-blue-50 text-blue-600"
      : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
  }`;

  const handleLinkClick = () => {
    // Only start loading if navigating to a different page
    if (link && pathname !== link) {
      startLoading();
    }
    
    setTimeout(() => {
      closeDrawer();
    }, 200);
  };

  const renderBadge = () => (
    badge && (
      <span className="absolute right-2 h-2 w-2 bg-red-500 rounded-full"></span>
    )
  );

  if (link) {
    return (
      <Link href={link} onClick={handleLinkClick}>
        <div className={baseClasses}>
          {icon}
          <span>{label}</span>
          {renderBadge()}
        </div>
      </Link>
    );
  }

  return (
    <button onClick={onClick} type="button" className={baseClasses}>
      {icon}
      <span>{label}</span>
      {renderBadge()}
    </button>
  );
}