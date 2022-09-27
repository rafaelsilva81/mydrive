import React, { ReactElement, useEffect, useState } from 'react'
import { File, FileAudio, FileVideo, FilePdf, FileDoc, MicrosoftWordLogo, FileText, FileZip } from 'phosphor-react'
import { FileSkeleton } from './FileSkeleton'

interface Props {
    mimeType: string
}

const mimes = [
    {
        name: 'audio',
        types: ["audio/x-wav", "audio/mpeg", "audio/mp4", "audio/ogg", "audio/x-aiff", "audio/midi", "audio/x-wav", "audio/mp3", "audio/mpeg3"],
        icon: <FileAudio />
    },
    {
        name: 'video',
        types: ["video/mp4", "video/quicktime", "video/x-msvideo", "video/x-ms-wmv", "video/mpeg", "video/webm"],
        icon: <FileVideo />
    },
    {
        name: 'doc',
        types: ["application/msword"],
        icon: <FileDoc />
    },
    {
        name: 'docx',
        types: ["application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
        icon: <MicrosoftWordLogo />
    },
    {
        name: 'odt',
        types: ["application/vnd.oasis.opendocument.text"],
        icon: <FileText />
    },
    {
        name: 'pdf',
        types: ["application/pdf"],
        icon: <FilePdf />
    },
    {
        name: 'compacted',
        types: ["application/x-tar", "application/vnd.rar", "application/zip", "application/x-7z-compressed", "application/x-zip-compressed"],
        icon: <FileZip />
    }
]

/* const audioMimes = ["audio/x-wav", "audio/mpeg", "audio/mp4", "audio/ogg", "audio/x-aiff", "audio/midi", "audio/x-wav", "audio/mp3", "audio/mpeg3"]
const videoMimes = ["video/mp4", "video/quicktime", "video/x-msvideo", "video/x-ms-wmv", "video/mpeg", "video/webm"]
const documentMimes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.oasis.opendocument.text"]
const compactedMimes = ["application/x-tar", "application/vnd.rar", "application/zip", "application/x-7z-compressed"] */

export const FileThumbnail = (props: Props) => {

    const [icon, setIcon] = useState<ReactElement>(<File />)
    const { mimeType } = props

    /* Get icon based on mimetype */
    useEffect(() => {
        mimes.forEach(mime => {
            if (mime.types.includes(mimeType)) {
                setIcon(mime.icon)
            }
        })
    }, [])

    return (
        <div className="h-48 w-48 flex items-center justify-center bg-neutral-200 text-teal-500">
            <span className="text-8xl"> {icon} </span>
        </div>
    )
}
