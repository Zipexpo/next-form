import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function ManageFormPage() {
    const session = await getServerSession(authOptions);
    console.log(session)
    return <div className="py-10">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Manage your form</h1>
        
    </div>
}