import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { NavItem } from './Navitems';

interface MobileNavLinkProps {
  item: NavItem;
  onMenuClose: () => void;
}

const MobileNavLink = ({ item, onMenuClose }: MobileNavLinkProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasSubmenu = item.submenu && item.submenu.length > 0;

  return (
    <div className="w-full">
      <div className="flex items-center">
        <Link
          href={item.href}
          className="flex items-center gap-3 py-3 px-4 text-base font-poppins font-medium text-foreground/70 hover:text-primary hover:bg-primary/5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 rounded-lg flex-1"
          onClick={onMenuClose}
        >
          {item.icon && (
            <div className="flex-shrink-0 p-1.5 rounded-md bg-primary/10">
              <item.icon className="h-4 w-4 text-primary" />
            </div>
          )}
          <span className="flex-1">{item.title}</span>
        </Link>
        
        {hasSubmenu && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-center p-3 text-foreground/70 hover:text-primary hover:bg-primary/5 transition-all duration-200 rounded-lg mr-2"
            aria-label={`Toggle ${item.title} submenu`}
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
        )}
      </div>

      {hasSubmenu && isExpanded && (
        <div className="ml-4 mt-2 space-y-1 border-l-2 border-primary/20 pl-4">
          {item.submenu?.map((subItem) => (
            <Link
              key={subItem.id}
              href={subItem.href}
              className="flex items-center gap-3 py-2 px-3 font-poppins text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all duration-200 rounded-lg group"
              onClick={onMenuClose}
            >
              {subItem.icon && (
                <div className="flex-shrink-0 p-1 rounded bg-muted group-hover:bg-primary/10 transition-colors duration-200">
                  <subItem.icon className="h-3 w-3 text-muted-foreground group-hover:text-primary" />
                </div>
              )}
              <div className="flex-1">
                <div className="font-medium">{subItem.title}</div>
                {subItem.description && (
                  <div className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                    {subItem.description}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileNavLink;