import Link from "next/link"
import CustomHead from "../components/CustomHead"
import HeaderNotLogin from "../components/HeaderNotLogin"

const ResetPass = () => {
    return <main className="absolute md:bg-gray-100 inset-0"> 
    <CustomHead title="Reset Password"/>
    <HeaderNotLogin/>
    <div className="flex justify-center items-center">
        <div className="mt-24 border border-gray-500 m-5 md:w-2/6 rounded-md p-2 bg-gray-50">
            <h1 className="font-bold text-xl m-2">Reset Password</h1>
            <div className="relative mt-1">
                <div className="flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-gray-300"></div>
                </div>
            </div>
            <div className="m-2 text-base">
                <p>Masukkan email atau username untuk mencari akun anda.</p>
            </div>
            <div className="w-full border border-gray-300 rounded-lg mt-3 text-lg">
                <input className="w-full p-1 md:p-2"/>
            </div>
            <div className="space-x-3 flex justify-end m-3 text-lg text-white">
                <button className="w-28 bg-gray-500 p-1 "><Link href="/login">Cancel</Link></button>
                <button className="w-28 bg-blue-500 ">Search</button>
            </div>
        </div>
    </div></main>
}

export default ResetPass