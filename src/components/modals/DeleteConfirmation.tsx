import React from 'react'

interface Props {
    onClose: () => void;
    onConfirm: () => void;
    type: string;
}

export const DeleteConfirmation = (props: Props) => {

    const { onClose, onConfirm, type } = props

    return (
        <>
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className="relative my-6 mx-auto">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-2xl">
                                Are you sure you want to delete this {type}?
                            </h3>
                        </div>
                        {/*body*/}

                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                            <button
                                className="text-red-500 background-transparent 
                                    font-bold uppercase px-6 py-2 text-sm outline-none 
                                    focus:outline-none mr-1 mb-1 ease-linear transition-all 
                                    duration-150
                                    disabled:opacity-50"
                                type="button"
                                onClick={onClose}
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
                                onClick={onConfirm}
                            >
                                Confirm
                            </button>

                        </div>

                    </div>
                </div>
            </div >
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}
