import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  FilePlus2,
  Upload,
  BarChart3,
  TrendingUp,
  Database,
  Menu,
  X,
} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NavItem {
  to: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { to: '/', label: '首页', icon: LayoutDashboard },
  { to: '/data-entry', label: '数据录入', icon: FilePlus2 },
  { to: '/data-import', label: '数据导入', icon: Upload },
  { to: '/comparison', label: '报表对比', icon: BarChart3 },
  { to: '/trends', label: '核心指标趋势', icon: TrendingUp },
  { to: '/ratios', label: '财务比率分析', icon: BarChart3 },
  { to: '/data-list', label: '数据列表', icon: Database },
];

function NavContent({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="flex flex-col gap-1 px-3 py-4">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/'}
          onClick={onNavigate}
          className={({ isActive }) =>
            cn(
              'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
              isActive
                ? 'bg-primary text-primary-foreground glow-border'
                : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
            )
          }
        >
          <item.icon className="h-4 w-4 shrink-0" />
          <span className="truncate">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

const AppLayout: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* 桌面端侧边栏 */}
      <aside className="hidden md:flex md:w-60 shrink-0 flex-col border-r border-border bg-sidebar">
        <div className="flex h-16 items-center gap-2 border-b border-border px-5">
          <div className="h-8 w-8 rounded-md bg-primary glow-border" />
          <span className="text-base font-bold gradient-text">财务报表比对</span>
        </div>
        <NavContent />
      </aside>

      {/* 移动端头部 + Sheet */}
      <div className="flex flex-1 min-w-0 flex-col">
        <header className="md:hidden flex h-14 items-center gap-3 border-b border-border px-4">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="shrink-0">
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-60 bg-sidebar p-0">
              <SheetTitle className="sr-only">导航菜单</SheetTitle>
              <div className="flex h-16 items-center gap-2 border-b border-border px-5">
                <div className="h-8 w-8 rounded-md bg-primary glow-border" />
                <span className="text-base font-bold gradient-text">财务报表比对</span>
              </div>
              <NavContent onNavigate={() => setOpen(false)} />
            </SheetContent>
          </Sheet>
          <span className="text-base font-bold gradient-text">财务报表比对系统</span>
        </header>

        <main className="flex-1 min-w-0 overflow-x-hidden p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;