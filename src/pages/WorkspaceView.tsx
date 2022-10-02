import { StorageReference } from 'firebase/storage'
import React, { useEffect } from 'react'
import { Breadcumb } from '../components/Breadcumb'
import { NoFiles } from '../components/common/NoFiles'
import { ReferenceContainer } from '../components/ReferenceContainer'
import { UploadWidget } from '../components/UploadWidget'

interface Props {
  path: string
  items?: StorageReference[]
  prefixes?: StorageReference[]
  onDelete: (target: StorageReference, type: string) => void
}
const WorkspaceView = (props: Props) => {
  
  const { path, items, prefixes, onDelete} = props;

  return (
    <>
          
      {/* show breadcumb after items are rendered */}
      <div className="flex mx-4 px-7 mt-2 flex-wrap items-center"> <Breadcumb path={path} /></div>
      
      {items?.length === 0 && prefixes?.length === 0 && <NoFiles />}
      
      <div id="files" className="flex mx-4 px-6 mt-2 flex-wrap items-center md:justify-start justify-center">
        {prefixes?.map((prefix) => {
          return <ReferenceContainer onDelete={onDelete} type='prefix' target={prefix} key={prefix.fullPath} />
        })}
        {items?.map((item) => {
          return <ReferenceContainer onDelete={onDelete} type='item' target={item} key={item.fullPath} />
        })}
      </div>

    </>
  )
}

export default WorkspaceView