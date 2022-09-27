import axios from 'axios';
import { deleteObject, StorageReference } from 'firebase/storage'
import { ReactElement, useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import ReactTooltip from 'react-tooltip';
import { useStorageDownloadURL } from 'reactfire';
import { FileSkeleton } from './thumbnails/FileSkeleton';
import { FileThumbnail } from './thumbnails/FileThumbnail';
import { FolderThumbnail } from './thumbnails/FolderThumbnail';
import { ImageThumbnail } from './thumbnails/ImageThumbnail';
import { ReferenceContextMenu } from './menus/ReferenceContextMenu';
import fileDownload from 'js-file-download'

interface Props {
    target: StorageReference
    type: 'item' | 'prefix'
}

const imageExtensions = ['image/jpg', 'image/jpeg', 'image/png', 'image/bmp', 'image/svg', 'image/webp'];

export const ReferenceContainer = (props: Props) => {

    const [thumbnail, setThumbnail] = useState<ReactElement>(<FileSkeleton />);

    const { target, type } = props

    const [downloadBlob, setDownloadBlob] = useState<Blob | null>(null);

    let downloadData: { status: string, data: string } = { status: 'loading', data: '' };
    if (type === 'item') {

        downloadData = useStorageDownloadURL(target, {
            suspense: true,
        });

        const { status, data: itemURL } = downloadData;

        /* Get mime type of file using axios */
        useEffect(() => {
            const fetchMimeType = async () => {
                const response = await axios.get(itemURL, {
                    responseType: 'blob'
                });
                setDownloadBlob(response.data);
                const mimeType = response.headers['content-type'];
                console.log(mimeType)
                if (imageExtensions.includes(mimeType)) {
                    setThumbnail(<ImageThumbnail url={itemURL} />);
                } else {
                    setThumbnail(<FileThumbnail mimeType={mimeType} />);
                }
            }
            fetchMimeType();
        }, []);
    }

    const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = useCallback((event: any) => {
        event.preventDefault()
        setAnchorPoint({ x: event.pageX, y: event.pageY })
        setShowMenu(true)
    }, [setAnchorPoint, setShowMenu])

    /* Close context menu when user clicks or right-clicks anywhere else */

    /* Close context menu when this loses focus */
    useEffect(() => {
        const closeMenu = () => {
            setShowMenu(false)
        }
        window.addEventListener('click', closeMenu)
        return () => {
            window.removeEventListener('click', closeMenu)
        }
    }, [setShowMenu])


    const downloadTarget = () => {
        console.log("tried to download")
        /* Download file from blob */
        if (downloadBlob) {
            fileDownload(downloadBlob, target.name);
        }
    }

    const deleteTarget = () => {
        /* ask confirmation to the user */
        const confirmation = window.confirm(`Are you sure you want to delete ${name}?`)
        if (confirmation && target) {
            /* Delete target */
            deleteObject(target).then(() => {
                toast("File deleted successfully", {
                    type: "success",
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    style: {}
                });
                console.log("deleted")
            }).catch((error) => {
                toast("Error deleting file", {
                    type: "error",
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
                console.log(error)
            })

        }
    }


    return (
        <>
            <div className="flex m-2 rounded-lg overflow-hidden flex-col max-w-[48vw] hover:opacity-80" onContextMenu={openMenu}>
                <a href="">
                    <div id="thumbnail" className="w-48">
                        {type === 'prefix' ? (<FolderThumbnail />) : thumbnail}
                    </div>
                    <div className="p-4 bg-teal-500 hover:bg-teal-400 w-48" data-tip={target.name}>
                        <ReactTooltip delayShow={1000} />
                        <p className="truncate text-neutral-100">{target.name}</p>
                    </div>
                </a>
            </div>
            {
                showMenu ? (
                    <ReferenceContextMenu
                        type={type}
                        target={target}
                        anchor={anchorPoint}
                        url={downloadData.data}
                        name={target.name}
                        onDelete={deleteTarget}
                        onDownload={downloadTarget}
                    />
                ) : null
            }
        </>
    )
}
