import React from 'react'
import { MagnifyingGlass, List, Cloud } from 'phosphor-react'
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export const Navbar = (props: { onSearch: (val: string) => void }) => {

    const { onSearch } = props;

    const auth = getAuth();
    const navigate = useNavigate();

    const logout = () => {
        /* Firebase logout */
        signOut(auth).then(() => {
            navigate('/login');
        }).catch((error) => {
            console.log('logoff error', error);
        });
    }

    return (
        <div id="navbar" className="grid grid-cols-12 justify-between p-2 items-center bg-neutral-100">

            <div id="branding" className="col-span-3 ml-3 flex items-center">
                <Cloud className='inline text-teal-500' size="30" weight="fill" />

                {/* O tailwind é Mobile-First, ou seja, sm:flex indica que será flex em dispositivos sm e acima, e o hidden será aplicado em xs */}
                <div id="vertical_line" className="border-l border-teal-500 h-6 mx-1 hidden sm:flex" />
                <span className=" text-2xl font-bold hidden sm:flex text-teal-500">MyDrive</span>
            </div>

            <div id="search" className="flex items-center col-span-6 relative">
                <MagnifyingGlass size="20" className="absolute ml-2" />
                <input type="text" name="search"
                    className="w-full h-10 rounded-md border-2 py-2 pl-8 pr-4 border-neutral-200"
                    placeholder="Search"
                    onChange={(e) => onSearch(e.target.value)} />
            </div>

            <div id="logout" className="flex justify-end items-center col-span-3 mr-8">
                {/* logout button */}
                <button className="bg-teal-500 hover:bg-teal-400 text-neutral-100 font-bold py-2 px-4 rounded" onClick={logout}>
                    Logout
                </button>
            </div>
        </div>
    )
}
