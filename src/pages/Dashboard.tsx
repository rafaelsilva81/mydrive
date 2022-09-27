import { listAll, ref as storageRef, StorageReference } from 'firebase/storage';
import { DetailedHTMLProps, ReactElement, RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useSigninCheck, useStorage } from 'reactfire';
import { Navbar } from '../components/Navbar';
import { NoFiles } from '../components/common/NoFiles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ReferenceContainer } from '../components/ReferenceContainer';
import { Plus } from 'phosphor-react'
import { UploadContextMenu } from '../components/menus/UploadContextMenu';
export const Dashboard = () => {

  const [items, setItems] = useState<StorageReference[]>([]);
  const [prefixes, setPrefixes] = useState<StorageReference[]>([]);

  const { status, data: signInCheckResult } = useSigninCheck({
    suspense: true
  });

  const storage = useStorage();
  const listRef = storageRef(storage, signInCheckResult.user?.uid);

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

  const openUploadMenu = useCallback((event: any) => {
    event.preventDefault()
    if (buttonLocation.current) {
      const rect = buttonLocation.current.getBoundingClientRect();
      /* set on top left of btn */
      setAnchorPoint({ x: rect.left - 3 * rect.width, y: rect.top - rect.height });
      /* setAnchorPoint({ x: buttonLocation.current.offsetLeft - 3 * buttonLocation.current.offsetWidth, y: buttonLocation.current.offsetTop - buttonLocation.current.offsetHeight }) */
      setShowUploadMenu(true)
    }
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

  if (signInCheckResult.signedIn) {
    return (
      <div>
        <ToastContainer />
        <Navbar />
        {items.length === 0 && prefixes.length === 0 && <NoFiles />}

        <div id="files" className="flex m-4 p-6 flex-wrap items-center md:justify-start justify-center">
          {prefixes.map((prefix) => {
            return <ReferenceContainer type='prefix' target={prefix} key={prefix.fullPath} />
          })}
          {items.map((item) => {
            return <ReferenceContainer type='item' target={item} key={item.fullPath} />
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
              onNewFolder={() => { alert('new folder') }}
              onUpload={() => { }}
            />
          ) : null
        }
      </div>
    )
  } else {
    return <Navigate to="/login" />;
  }
}
