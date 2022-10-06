import { uploadBytes, uploadBytesResumable, ref as storageRef } from 'firebase/storage';
import { Plus } from 'phosphor-react';
import React, { ChangeEvent, MouseEventHandler, useCallback, useEffect, useRef, useState } from 'react'
import { useStorage } from 'reactfire';
import { UploadContextMenu } from './menus/UploadContextMenu';
import { NewFolder } from './modals/NewFolder';

interface Props {
    onUpload: (e: ChangeEvent) => void
    onNewFolder: (name: string) => Promise<void>
}

export const UploadWidget = (props: Props) => {

    const { onUpload, onNewFolder } = props;

    const buttonLocation = useRef<HTMLDivElement>(null);
    const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });

    const [showUploadMenu, setShowUploadMenu] = useState(false);
    const [showNewFolder, setShowNewFolder] = useState(false);

    const uploadInput = useRef<HTMLInputElement>(null);

    const openUploadMenu = useCallback((event: any) => {
        event.preventDefault()
        if (buttonLocation.current) {
            setAnchorPoint({ x: buttonLocation.current.offsetWidth, y: buttonLocation.current.offsetHeight })
        }
        setShowUploadMenu(true);
    }, [setAnchorPoint, setShowUploadMenu])

    /* close upload menu when clicking anywhere else on screen */
    useEffect(() => {
        const closeMenu = (event: MouseEvent) => {
            /* check if not clicked in the button */
            if (!document.getElementById('uploadButton')?.contains(event.target as Node)) {
                setShowUploadMenu(false);
            }
        }
        window.addEventListener('click', closeMenu)
        return () => {
            window.removeEventListener('click', closeMenu)
        }
    }, [setShowUploadMenu])

    return (
        <div className="fixed bottom-0 right-0 m-10" ref={buttonLocation} id="uploadButton">
            <input type="file" name="file" multiple onChange={onUpload} ref={uploadInput} hidden={true} />
            {/* round button */}
            <button className="bg-teal-500 hover:bg-teal-700 text-white font-bold p-3 rounded-full" onClick={openUploadMenu} >
                <Plus size={28} />
            </button>

            {
                showUploadMenu ? (
                    <UploadContextMenu
                        anchor={anchorPoint}
                        onNewFolder={() => { setShowNewFolder(true) }}
                        onUpload={() => { uploadInput.current?.click() }}
                    />
                ) : null
            }


            {
                showNewFolder ? (
                    <NewFolder
                        onClose={() => { setShowNewFolder(false) }}
                        onCreate={onNewFolder}
                    />
                ) : null
            }


        </div>
    )
}
