import React, { ReactElement, useEffect, useState } from 'react'
import {
    File, FileAudio, FileVideo, FilePdf, FileDoc,
    MicrosoftWordLogo, FileText, FileZip, MicrosoftExcelLogo, MicrosoftPowerpointLogo,
    FileCsv, FilePpt, FileCode, FileX
} from 'phosphor-react'
import { FileSkeleton } from './FileSkeleton'

interface Props {
    mimeType: string
}

const mimes = [
    {
        name: 'audio',
        types: ["audio/x-wav", "audio/mpeg", "audio/mp4", "audio/ogg", "audio/x-aiff", "audio/midi", "audio/x-wav", "audio/mp3", "audio/mpeg3"],
        icon: <FileAudio weight='fill' />
    },
    {
        name: 'video',
        types: ["video/mp4", "video/quicktime", "video/x-msvideo", "video/x-ms-wmv", "video/mpeg", "video/webm"],
        icon: <FileVideo weight='fill' />
    },
    {
        name: 'doc',
        types: ["application/msword", "application/vnd.oasis.opendocument.text", "application/msword"],
        icon: <FileDoc weight='fill' />
    },
    {
        name: 'ppt',
        types: [' application/vnd.ms-powerpoint'],
        icon: <FilePpt weight='fill' />
    },
    {
        name: 'docx',
        types: ["application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
        icon: <MicrosoftWordLogo weight='fill' />
    },
    {
        name: 'text',
        types: ["text/plain"],
        icon: <FileText weight='fill' />
    },
    {
        name: 'pdf',
        types: ["application/pdf"],
        icon: <FilePdf weight='fill' />
    },
    {
        name: 'compacted',
        types: ["application/x-tar", "application/vnd.rar", "application/zip", "application/x-7z-compressed", "application/x-zip-compressed", "application/x-7z-compressed"],
        icon: <FileZip weight='fill' />
    },
    {
        name: 'sheets',
        types: ["application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],
        icon: <MicrosoftExcelLogo weight='fill' />
    },
    {
        name: 'csv',
        types: ["text/csv"],
        icon: <FileCsv weight='fill' />
    },
    {
        name: 'slides',
        types: ["application/vnd.ms-powerpoint"],
        icon: <MicrosoftPowerpointLogo weight='fill' />
    },
    {
        name: 'code',
        types: ["text/html", "text/css", "application/x-python-code", "text/x-python", "text/x-java-source", "application/x-javascript", "application/x-php", "text/x-c", "application/json"],
        icon: <FileCode weight='fill' />
    },
    {
        name: 'executables',
        types: ["application/x-msdownload", "application/x-sh", "application/x-shellscript"],
        icon: <FileX weight='fill' />

    }
]


export const FileThumbnail = (props: Props) => {

    const [icon, setIcon] = useState<ReactElement>(<File weight='fill' />)
    const { mimeType } = props

    /* console.log(mimeType) */
    /* Get icon based on mimetype */
    useEffect(() => {
        mimes.forEach(mime => {
            if (mime.types.includes(mimeType)) {
                setIcon(mime.icon)
            }
        })
    }, [])

    return (
        <div className="h-36 w-36 flex items-center justify-center bg-neutral-200 text-teal-500">
            <span className="text-8xl"> {icon} </span>
        </div>
    )
}
