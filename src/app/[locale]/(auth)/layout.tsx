import Sidebar from "@/components/ui/sidebar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex min-w-0 max-w-full overflow-x-hidden">
            <Sidebar />
            <div className="min-w-0 max-w-full flex-1 overflow-x-hidden">
                <main className="min-w-0 max-w-full overflow-x-hidden">
                    {children}
                </main>
            </div>
        </div>
    );
}

