import { listAll, ref as storageRef, StorageReference, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import { ChangeEvent, DetailedHTMLProps, ReactElement, RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useSigninCheck, useStorage } from 'reactfire';
import { Navbar } from '../components/Navbar';
import { NoFiles } from '../components/common/NoFiles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ReferenceContainer } from '../components/ReferenceContainer';
import { Plus } from 'phosphor-react'
import { UploadContextMenu } from '../components/menus/UploadContextMenu';
import { NewFile } from '../components/modals/NewFile';
import { NewFolder } from '../components/modals/NewFolder';


export const Workspace = () => {

  let { folderId } = useParams();

  const [items, setItems] = useState<StorageReference[]>([]);
  const [prefixes, setPrefixes] = useState<StorageReference[]>([]);


  const { status, data: signInCheckResult } = useSigninCheck({
    suspense: true
  });

  const storage = useStorage();
  if (folderId) {
    folderId = decodeURIComponent(folderId);
    /* reference should point to this folder */
  }

  let listRef = storageRef(storage, signInCheckResult.user?.uid); /* will create new folder if not exists */
  /* append folderId to ref (if its defined) */
  if (folderId) {
    listRef = storageRef(listRef, folderId);
  }

  const fetchItems = async () => {
    const { items, prefixes } = await listAll(listRef);
    setItems(items);
    setPrefixes(prefixes);
  }
  fetchItems();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  const buttonLocation = useRef<HTMLDivElement>(null);
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const [showUploadMenu, setShowUploadMenu] = useState(false);

  const [showNewFolder, setShowNewFolder] = useState(false);
  const uploadInput = useRef<HTMLInputElement>(null);

  const openUploadMenu = useCallback((event: any) => {
    event.preventDefault()
    if (buttonLocation.current) {
      const rect = buttonLocation.current.getBoundingClientRect();
      /* set on top left of btn */
      setAnchorPoint({ x: rect.left - 3 * rect.width, y: rect.top - rect.height });
      /* setAnchorPoint({ x: buttonLocation.current.offsetLeft - 3 * buttonLocation.current.offsetWidth, y: buttonLocation.current.offsetTop - buttonLocation.current.offsetHeight }) */
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

  /* upload */
  const handleFileChange = (event: ChangeEvent) => {
    const file = (event.target as HTMLInputElement).files?.item(0);
    if (file) {
      const ref = storageRef(storage, signInCheckResult.user?.uid + '/' + file.name)
      uploadBytesResumable(ref, file).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      }).catch((error) => {
        console.log(error)
      });

    }
  }

  if (signInCheckResult.signedIn) {
    return (
      <div>
        <input type="file" name="file" onChange={handleFileChange} ref={uploadInput} hidden={true} />
        <ToastContainer />
        <Navbar />
        {items.length === 0 && prefixes.length === 0 && <NoFiles />}

        <div id="files" className="flex m-4 p-6 flex-wrap items-center md:justify-start justify-center">
          {prefixes.map((prefix) => {
            return <ReferenceContainer type='prefix' target={prefix} key={prefix.fullPath} />
          })}
          {items.map((item) => {
            if (item.name != '.exists') {
              return <ReferenceContainer type='item' target={item} key={item.fullPath} />
            }
          })}
        </div>

        {/* upload button positioned at bottom-right */}
        <div className="fixed bottom-0 right-0 m-10" ref={buttonLocation} id="uploadButton">
          {/* round button */}
          <button className="bg-teal-500 hover:bg-teal-700 text-white font-bold p-3 rounded-full" onClick={openUploadMenu} >
            <Plus size={28} />
          </button>
        </div>

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
              onCreate={async (name) => {
                const ref = storageRef(storage, listRef + '/' + name + '/' + '.exists')
                const file = new Blob(['.exists'])
                await uploadBytes(ref, file)
                setShowNewFolder(false)
              }}
            />
          ) : null
        }

        {/* <NewFolder show={showNewFolder} basePath={listRef} /> */}
      </div>
    )
  } else {
    return <Navigate to="/login" />;
  }
}
