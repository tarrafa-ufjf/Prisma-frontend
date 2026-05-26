import LoginPage from "@/components/auth/login";

interface PageProps {
    searchParams: Promise<{
        redirectTo?: string,
    }>
}

export default async function Page({ searchParams }: PageProps) {
    const params = await searchParams
    return <LoginPage redirectTo={params.redirectTo} />
};
