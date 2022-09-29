import { useEffect, useState } from 'react'
import { X } from 'phosphor-react'
import { useForm } from 'react-hook-form';
import { listAll, ref as storageRef, StorageReference, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import { useStorage, useStorageTask } from 'reactfire';

interface Props {
    show: boolean;
    basePath?: StorageReference;
}

interface Folder {
    name: string;
}

export const NewFolder = (props: Props) => {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);

    /* update showModal based on props */
    useEffect(() => {
        setShowModal(props.show);
    }, [props.show])


    const storage = useStorage();

    const { register, handleSubmit, formState: { errors }, setError } = useForm<Folder>(
        {
            defaultValues: {
                name: ''
            }
        }
    );

    const onSubmit = async (data: Folder) => {

        const file = new File([], '.exists');

        const path = props.basePath?.fullPath + '/' + data.name + '/' + file.name;
        const ref = storageRef(storage, path);
        setLoading(true);
        await uploadBytes(ref, file);
        setLoading(false)
        setShowModal(false)
    }

    return (
        <>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-2xl font-semibold">
                                        New Folder
                                    </h3>
                                </div>
                                {/*body*/}

                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="relative p-6 flex-auto">

                                        {/* input for folder name */}
                                        <div className="relative w-full flex flex-col">
                                            <label htmlFor='name' className="text-slate-500 text-sm font-semibold mb-2">Folder Name</label>
                                            <input type="text" className="p-3 rounded-md shadow-md bg-neutral-100" disabled={loading} placeholder='Enter folder name' {...register('name')} />
                                        </div>

                                    </div>
                                    {/*footer*/}
                                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                        <button
                                            className="text-red-500 background-transparent 
                                            font-bold uppercase px-6 py-2 text-sm outline-none 
                                            focus:outline-none mr-1 mb-1 ease-linear transition-all 
                                            duration-150
                                            disabled:opacity-50"
                                            type="button"
                                            disabled={loading}
                                            onClick={() => setShowModal(false)}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            className="bg-teal-500 text-white active:bg-emerald-600 
                                            font-bold uppercase text-sm px-6 py-3 rounded 
                                            shadow hover:shadow-lg outline-none 
                                            focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150
                                            disabled:opacity-50"
                                            type="submit"
                                            disabled={loading}
                                        >
                                            Create Folder
                                        </button>
                                        {loading ? 
                                            (
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
                                            )
                                        : null }
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}
