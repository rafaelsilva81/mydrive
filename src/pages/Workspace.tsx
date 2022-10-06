import { deleteObject, getDownloadURL, listAll, ref as storageRef, StorageReference, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import { ChangeEvent, lazy, useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useSigninCheck, useStorage } from 'reactfire';
import { Navbar } from '../components/Navbar';
import { NoFiles } from '../components/common/NoFiles';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ReferenceContainer } from '../components/ReferenceContainer';
import { UploadWidget } from '../components/UploadWidget';
import { Breadcumb } from '../components/Breadcumb';
import { Loadable, Barloader } from '../components/common/Loading';
import ForbiddenError from './errors/ForbiddenError';
import { confirmAlert } from 'react-confirm-alert';
import { DeleteConfirmation } from '../components/modals/DeleteConfirmation';

const WorkspaceView = Loadable(lazy(() => import('./WorkspaceView')), Barloader);

export const Workspace = () => {

  const [items, setItems] = useState<StorageReference[]>([]);
  const [prefixes, setPrefixes] = useState<StorageReference[]>([]);

  const { status, data: signInCheckResult } = useSigninCheck({
    suspense: true
  });

  const storage = useStorage();


  const path = useParams()['*'] || signInCheckResult.user?.uid || '';

  const root = path?.split('/')[0];

  let listRef: StorageReference;
  listRef = storageRef(storage, path);

  /* handle search */
  const [search, setSearch] = useState('');
  const handleSearch = (val: string) => {
    setSearch(val);
  }

  const fetchItems = async () => {
    let { items: i, prefixes: p } = await listAll(listRef);
    /* remove emtpy items and .exists from list of items */
    i = i.filter(item => item.name !== '.exists');
    return { i, p };
  }

  useEffect(() => {
    /* console.log('updated') */
    fetchItems().then(({ i, p }) => {
      if (search.length > 0) {
        const regex = new RegExp(search, 'i');
        const filteredItems = i?.filter(item => regex.test(item.name));
        const filteredPrefixes = p?.filter(prefix => regex.test(prefix.name));
        setItems(filteredItems);
        setPrefixes(filteredPrefixes);
      } else {
        setItems(i);
        setPrefixes(p);
      }
    })
  }, [path, search]);

  /* handle delete */
  const deleteFolder = (target: StorageReference) => {
    /* list all files and prefixes inside the folder to recursively delete */
    listAll(target).then((res) => {
      /*  console.log(res) */
      res.items.forEach((itemRef) => {
        deleteObject(itemRef);
        setItems(items?.filter(item => item.fullPath !== itemRef.fullPath));
      });
      res.prefixes.forEach((folderRef) => {
        deleteFolder(folderRef);
        setPrefixes(prefixes?.filter(prefix => prefix.fullPath !== folderRef.fullPath));
      });
    })
    deleteObject(target);
    setPrefixes(prefixes?.filter(prefix => prefix.fullPath !== target.fullPath));
    toast.success('Folder deleted successfully');
  }

  const deleteFile = (target: StorageReference) => {
    deleteObject(target).catch((error) => {
      toast.error(error.message);
    });
    setItems(items?.filter(item => item.fullPath !== target.fullPath));
    toast.success('File deleted successfully');
  }


  const handleDelete = (target: StorageReference, type: string) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <DeleteConfirmation type={type === 'item' ? 'file' : 'folder'} onClose={onClose} onConfirm={() => {
            type === 'prefix' ? deleteFolder(target) : deleteFile(target);
            onClose();
          }} />
        );
      }
    });
  }



  /* handle upload */
  const handleUpload = (event: ChangeEvent) => {
    /* can be multiple files */
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const ref = storageRef(storage, path + '/' + file.name)
        /* Check if its already on item list */
        if (items?.find(item => item.name === file.name)) {
          toast.error('File already exists on this folder!');
          return;
        }
        const uploadTask = uploadBytesResumable(ref, file);
        uploadTask.on('state_changed', (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          /* Update progress on toast */
          toast.update(uploadTask.snapshot.ref.fullPath, {
            render: `${file.name} - ${progress.toFixed(2)}%`,
            type: toast.TYPE.INFO,
            autoClose: false,
            progress: progress / 100
          });
        }, (error) => {
          toast.error(error.message);
        }, () => {
          toast.update(uploadTask.snapshot.ref.fullPath, {
            render: `${file.name} - Uploaded successfully`,
            type: toast.TYPE.SUCCESS,
            autoClose: 1000,
            progress: 1,
          });
          /* Wait before updating state and closing toast */
          setTimeout(() => {
            /* keep atomicity of state */
            setItems(previousItems => ([...previousItems, uploadTask.snapshot.ref]));
            toast.dismiss(uploadTask.snapshot.ref.fullPath);
          }, 500);

        });
        toast.info(<div>{file.name} - Uploading...</div>, {
          toastId: uploadTask.snapshot.ref.fullPath,
        });
      }
    }
  }


  /* handlle new folder */
  const handleNewFolder = async (name: string) => {
    const ref = storageRef(storage, path + '/' + name + '/' + '.exists')
    const folderRef = storageRef(storage, path + '/' + name)
    /* Check if folder exists in list of prefixes */
    const exists = prefixes?.find(prefix => prefix.name === name);

    if (!exists) {
      const file = new Blob(['.exists'])
      uploadBytes(ref, file).then((snapshot) => {
        setPrefixes([...prefixes, folderRef]);
        return
      }).catch((error) => {
        throw new Error(error.message);
      });
    } else {
      throw new Error('Folder already exists');
    }
  }

  if (signInCheckResult.signedIn) {
    return (
      <div>
        <ToastContainer />
        <Navbar onSearch={handleSearch} />

        <WorkspaceView path={path} items={items} prefixes={prefixes} onDelete={handleDelete} search={search} />

        {/* upload button positioned at bottom-right */}
        <UploadWidget onUpload={handleUpload} onNewFolder={handleNewFolder} />
        {/* <NewFolder show={showNewFolder} basePath={listRef} /> */}
      </div>
    )
  } else {
    return <Navigate to="/login" />;
  }
}

export default Workspace;
