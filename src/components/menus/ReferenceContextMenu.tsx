import { StorageReference } from 'firebase/storage'
import React, { useState } from 'react'
import { Eye, TrashSimple, DownloadSimple } from 'phosphor-react'
import ReactTooltip from 'react-tooltip'
import 'react-toastify/dist/ReactToastify.css';
import { MenuActionButton } from './MenuActionButton';


interface Props {
    type: 'item' | 'prefix'
    target: StorageReference
    anchor: { x: number, y: number }
    url: string | null
    name: string
    onClose?: () => void
    onDelete: () => void
    onDownload: () => void
}

export const ReferenceContextMenu = (props: Props) => {

    const { type, anchor, name, url, onDelete, onDownload } = props

    const [target, setTarget] = useState<StorageReference | null>(props.target);

    return (
        //Context menu that will be shown when user right clicks on an item
        <div className='absolute z-10' style={{ top: anchor.y, left: anchor.x }}>
            <div className="bg-white shadow rounded-lg p-1 w-48">

                <div className='m-2 p-1'>
                    <div className="text-teal-600 font-bold truncate" data-tip={name}>
                        <ReactTooltip delayShow={1000} />
                        {name}
                    </div>
                    <hr />
                </div>

                {/* Action buttons */}
                <div className='mx-1'>
                    <MenuActionButton onClick={onDelete}>
                        <TrashSimple />
                        <p className="text-sm ml-1">Delete</p>
                    </MenuActionButton>
                    <MenuActionButton onClick={onDownload} disabled={type === 'prefix'}>
                        <DownloadSimple />
                        <p className="text-sm ml-1">Download</p>
                    </MenuActionButton>

                </div>

            </div>
        </div>
    )
}
