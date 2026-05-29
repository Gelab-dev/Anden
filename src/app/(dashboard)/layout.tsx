import { auth } from '@/lib/auth';
import { NavbarDashboard } from '@/components/navbar-dashboard';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div
      style={{
        fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
        background: 'var(--color-surface)',
        color: '#EDEBE8',
        minHeight: '100vh',
      }}
    >
      <NavbarDashboard userName={session?.user?.name} />
      {children}
    </div>
  );
}