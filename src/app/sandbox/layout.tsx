import SandboxNavbar from '@/components/sandbox/SandboxNavbar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="sandbox-layout">
      <div>
        <SandboxNavbar />
      </div>
      <div className="container mx-auto p-4">{children}</div>
    </div>
  )
}
