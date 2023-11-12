import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react'
import React, { ReactNode, useEffect } from 'react'

export default function CommonModal(props: {
  title: ReactNode;   
  contents: ReactNode;
  size: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full" | undefined;
  isOpen: boolean | undefined; 
  useCustomBtn?: boolean;
  customButton?: ReactNode;
  confirmBtn?: string;
  onConfirmBtn: (() => void) | undefined;
  onClose: (() => void) | undefined
}){
  const {isOpen, onClose, onOpenChange} = useDisclosure();

  return (
    <div>
       <Modal 
        isOpen={isOpen} 
        size={props.size}
        backdrop="opaque"
      >
        <ModalContent>
          {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{props.title}</ModalHeader>
              <ModalBody>
                {props.contents}
              </ModalBody>
              <ModalFooter>
                {
                  (() => {
                    if(props.useCustomBtn) return <div>{props.customButton}</div>
                    else return (
                      <div>
                        <Button  variant="light" onPress={onClose}>
                          Close
                        </Button>
                        <Button className="bg-[#6f4ef2] shadow-lg shadow-indigo-500/20" onPress={onClose}>
                          Action
                        </Button>
                      </div>)
                  })()
                 }
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

