// /app/page.tsx
import "bootstrap/dist/css/bootstrap.min.css";
import { fetch_account } from "@/assessts/function/fetch";
import { cookies, headers  } from "next/headers";
import { redirect } from "next/navigation";

const HomePage = async () => {
    try {
        const headersList = headers();
        const cookieStore = cookies();
        const accessToken = cookieStore.get("token");

        if(!accessToken)
            throw new Error("Err")

        const token: string = accessToken.value; 
        
        if(!headersList.get('user-agent'))
            throw new Error("Err")

        //@ts-ignore
        const account = await fetch_account(token, headersList.get('user-agent'));

        if(account['account']['role'] == 'student')
            redirect('/student');
    } catch(err) {
        redirect('/auth/login');
    }
        
};

export default HomePage;
