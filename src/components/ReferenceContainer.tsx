import axios from 'axios';
import { deleteObject, listAll, StorageReference } from 'firebase/storage'
import { FormEvent, ReactElement, useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import ReactTooltip from 'react-tooltip';
import { useStorageDownloadURL } from 'reactfire';
import { FileSkeleton } from './thumbnails/FileSkeleton';
import { FileThumbnail } from './thumbnails/FileThumbnail';
import { FolderThumbnail } from './thumbnails/FolderThumbnail';
import { ImageThumbnail } from './thumbnails/ImageThumbnail';
import { ReferenceContextMenu } from './menus/ReferenceContextMenu';
import fileDownload from 'js-file-download'
import { useNavigate } from 'react-router-dom';

interface Props {
    target: StorageReference
    type: 'item' | 'prefix'
    onDelete:  (target: StorageReference, type: string) => void;
}

const imageExtensions = ['image/jpg', 'image/jpeg', 'image/png', 'image/bmp', 'image/svg', 'image/webp'];

export const ReferenceContainer = (props: Props) => {

    const navigate = useNavigate();

    const [thumbnail, setThumbnail] = useState<ReactElement>(<FileSkeleton />);

    const { target, type, onDelete } = props

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

    const handleClick = (event: FormEvent) => {
        event.preventDefault();
        if (type === 'item') {
            console.log(encodeURIComponent(downloadData.data))
        } else if (type === 'prefix') {
            /* go to /workspace/:folderId */
            navigate(`/workspace/${target.fullPath}`)
        }
    }


    return (
        <>
            <div className="flex m-2 rounded-lg overflow-hidden flex-col hover:opacity-80" onContextMenu={openMenu} onClick={handleClick}>
                <a href="">
                    <div id="thumbnail" className="w-36">
                        {type === 'prefix' ? (<FolderThumbnail />) : thumbnail}
                    </div>
                    <div className="p-4 bg-teal-500 hover:bg-teal-400 w-36" data-tip={target.name}>
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
                        onDelete={() => onDelete(target, type)}
                        onDownload={downloadTarget}
                    />
                ) : null
            }
        </>
    )
}
