import React from 'react';
import { NavigationMenuLink } from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface ListItemProps extends React.ComponentPropsWithoutRef<'li'> {
  title: string;
  href: string;
  icon?: LucideIcon;
  description?: string;
  children?: React.ReactNode;
}

const ListItem = React.forwardRef<
  React.ElementRef<'li'>,
  ListItemProps
>(({ className, title, href, icon: Icon, description, children, ...props }, ref) => {
  return (
    <li ref={ref} {...props}>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className={cn(
            'group block select-none rounded-lg p-3 leading-none no-underline outline-none transition-all duration-200 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
        >
          <div className="flex items-start gap-3">
            {Icon && (
              <div className="flex-shrink-0 mt-0.5">
                <Icon className="h-4 w-4 text-muted-foreground group-hover:text-accent-foreground" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium leading-none mb-1">
                {title}
              </div>
              {(description || children) && (
                <p className="text-xs leading-snug text-muted-foreground group-hover:text-accent-foreground/80 line-clamp-2">
                  {description || children}
                </p>
              )}
            </div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});

ListItem.displayName = 'ListItem';

export default ListItem;