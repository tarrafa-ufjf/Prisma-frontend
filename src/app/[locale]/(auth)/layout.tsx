import Sidebar from "@/components/ui/sidebar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1">
                <main>
                    {children}
                </main>
            </div>
        </div>
    );
}

