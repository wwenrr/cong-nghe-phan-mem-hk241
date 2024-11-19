import { redirect } from "next/navigation";
import { fetch_account } from "@/assessts/function/fetch";
import { cookies, headers  } from "next/headers";

export default async function NotFoundPage() {
   let account = null

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
      account = await fetch_account(token, headersList.get('user-agent'));          
   } catch(err) {
      //@ts-ignore
      console.log("err: ", err.message);
      redirect('/auth/login');
   }

   if(account['account']['role'] === 'student') {
      redirect('/student');
   }
};
