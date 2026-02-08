import { GalleryVerticalEnd } from "lucide-react"
import { LoginForm } from "@/components/login-form"
import { useAuthStore } from "@/store/auth-store"
import { useNavigate } from "react-router"
import type { LoginRequest } from "@/types/user";
import cookie from "react-cookies"
import { login } from "@/service/user"

export default function Login(){
    const Navigate = useNavigate();
    const AuthLogin = useAuthStore((s) => s.login);
    
    const handleSumbit = (values: LoginRequest) => {
        login(values).then((res) => {
            const apikey = res?.data?.apiKey ?? "";
            const id = res?.data?.id ?? "";
            const name = res?.data?.name ?? "";
            const email = res?.data?.email ?? "";

            cookie.save("api_key", apikey, {
                path: "/",
                maxAge: 60*60*24*7,
            });

            AuthLogin({
                apikey,
                user: {id, name, email},
            });
            Navigate("/", {replace: true});
        });
    };
    return(
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <a href="#" className="flex items-center gap-2 self-center font-medium">
                    <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                        <GalleryVerticalEnd className="size-4" />
                    </div>
                    Lepyo Inc.
                </a>
                <LoginForm onlogin={handleSumbit} />
            </div>
        </div>
    )
}