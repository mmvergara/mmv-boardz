import TextModal from "../components/Modal/TextModal";
import {useState} from 'react'

interface useModalOptions {
  exitButtonText:string
  title:string
  message:string
}

const useModal = (ModalOptions:useModalOptions) =>{ 
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOptions,setModalOption] = useState<useModalOptions>(ModalOptions)
  const modalCloseHandler = () => {
    setModalOpen(false);
  };

  function modalOpenHandler() {
    setModalOpen(true);
  }
  const TextModalEl = <TextModal
  exitButtonText={modalOptions.exitButtonText}
  isOpen={modalOpen}
  title={modalOptions.title}
  message={modalOptions.message}
  modalCloseHandler={modalCloseHandler}
/>

return {modalOpenHandler, TextModalEl, setModalOption}
}

export default useModal