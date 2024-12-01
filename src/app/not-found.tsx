import { redirect } from "next/navigation";
import { fetch_account, get_manager_account } from "@/assessts/function/fetch";
import { cookies, headers  } from "next/headers";

export default async function NotFoundPage() {
   let account = null
   const headersList = headers();
   const cookieStore = cookies();
   const accessToken = cookieStore.get("token");

   if(!accessToken)
      throw new Error("Không có token")

   const token: string = accessToken.value; 
   
   if(!headersList.get('user-agent'))
      throw new Error("Không có user-agent")

   try {
      //@ts-ignore
      account = await fetch_account(token, headersList.get('user-agent'));      
      
      if(account['account']['role'] === 'student') {
         redirect('/student');
      }

   } catch(err) {
      //@ts-ignore
      account = await get_manager_account(token, headersList.get('user-agent'));

      if(account['account']['role'] === 'manager') {
         redirect('/manager');
      }

      //@ts-ignore
      console.log("err: ", err.message);
      redirect('/login');
   }   
};
