import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from './_components/app-sidebar';
import { ProtectedBlock } from './_components/protected-block';

const Layout = ({ children }: { children: React.ReactNode }) => (
  <SidebarProvider
    style={
      {
        '--sidebar-width': '22rem',
      } as React.CSSProperties
    }
  >
    <AppSidebar />
    <SidebarInset>
      <ProtectedBlock>{children}</ProtectedBlock>
    </SidebarInset>
  </SidebarProvider>
);

export default Layout;
