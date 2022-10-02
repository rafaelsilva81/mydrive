import React from 'react'
import { FolderSimple, UploadSimple } from 'phosphor-react'
import { MenuActionButton } from './MenuActionButton'

interface Props {
    anchor: { x: number, y: number }
    onUpload: () => void
    onNewFolder: () => void
}


export const UploadContextMenu = (props: Props) => {
    const { anchor, onUpload, onNewFolder } = props
    return (
        <div className='absolute z-10' style={{ bottom: anchor.y, right: anchor.x }} id="uploadMenu">
            <div className="bg-white shadow rounded-lg p-1 w-48">

                {/* Action buttons */}
                <div className='mx-1'>
                    {/* New folder button */}
                    <MenuActionButton onClick={onNewFolder}>
                        <FolderSimple />
                        <p className="text-sm ml-1">New folder</p>
                    </MenuActionButton>

                    {/* Upload file button */}
                    <MenuActionButton onClick={onUpload}>
                        <UploadSimple />
                        <p className="text-sm ml-1">Upload file</p>
                    </MenuActionButton>

                </div>

            </div>

        </div>
    )
}

