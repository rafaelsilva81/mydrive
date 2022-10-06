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
  search?: string
}
const WorkspaceView = (props: Props) => {

  const { path, items, prefixes, onDelete, search } = props;

  return (
    <>

      {/* show breadcumb after items are rendered */}
      <div className="flex mx-4 px-7 mt-2 flex-wrap items-center"> <Breadcumb path={path} /></div>


      <div id="files" className="flex mx-4 px-6 mt-2 flex-wrap items-center md:justify-start justify-center">
        {items?.length === 0 && prefixes?.length === 0 && <NoFiles />}
        {prefixes?.map((prefix) => {
          return <ReferenceContainer onDelete={onDelete} search={search} type='prefix' target={prefix} key={prefix.fullPath} />
        })}
        {items?.map((item) => {
          return <ReferenceContainer onDelete={onDelete} search={search} type='item' target={item} key={item.fullPath} />
        })}
      </div>

    </>
  )
}

export default WorkspaceView