import Link from "next/link"

const HeaderNotLogin = () => {
    return <header className="relative bg-white w-full">
        <div className="flex justify-between m-4 items-center">
            <h1 className="text-xl font-bold">Toko Mafia</h1>
            <button className="bg-blue-500 py-2 px-4 text-white"><Link href="/login">Login</Link></button>
        </div>
    </header>
}

export default HeaderNotLogin