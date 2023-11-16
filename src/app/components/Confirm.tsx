import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React, { ReactNode } from "react";

export default function CommonModal(props: {
  title: ReactNode;
  contents: ReactNode;
  size:
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "full"
    | undefined;
  isOpen: boolean; // 열림 flag
  useCustomBtn?: boolean; // 기본 버튼 형태를 사용하지 않을 때 true
  customButton?: ReactNode; // 설정하고 싶은 버튼의 형태를 받음
  confirmBtn?: string; // 확인 버튼 위치의 버튼 명 기본값 : 확인
  onConfirmBtn: (() => void) | undefined; // 확인 버튼의 동작을 설정
  onClose: (() => void) | undefined;
}) {
  return (
    <div>
      <Modal
        isOpen={props.isOpen}
        onClose={props.onClose}
        size={props.size}
        backdrop="opaque"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {props.title}
              </ModalHeader>
              <ModalBody>{props.contents}</ModalBody>
              <ModalFooter>
                {(() => {
                  if (props.useCustomBtn)
                    return <div>{props.customButton}</div>;
                  else
                    return (
                      <div>
                        <Button variant="light" onPress={onClose}>
                          취소
                        </Button>
                        <Button
                          className="bg-[#6f4ef2] shadow-lg shadow-indigo-500/20"
                          onPress={props.onConfirmBtn}
                        >
                          {props.confirmBtn ? props.confirmBtn : "확인"}
                        </Button>
                      </div>
                    );
                })()}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
