"use client";
import CommonButton from "@/app/components/Buttons";
import CommonInput from "@/app/components/Input";
import { Checkbox } from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer, TypeOptions, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import { useRenderCtx } from "@/app/_providers/render";

export default function LoginForm() {
  const [userId, setUserId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [userIdCheck, setUserIdCheck] = useState(false);
  const [userPwCheck, setUserPwCheck] = useState(false);
  const [isRememberId, setIsRememberId] = useState(false);
  const router = useRouter();
  const renderCtx = useRenderCtx();

  const loginValidation = () => {
    let isValid = true;
    if (!userId?.length) {
      setUserIdCheck(true);
      isValid = false;
    }
    if (!password?.length) {
      setUserPwCheck(true);
      isValid = false;
    }

    return isValid;
  };

  const showToast = (title: string, type?: TypeOptions) => {
    toast(title, { type });
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") handleLogin();
  };

  const handleLogin = async () => {
    try {
      sessionStorage.setItem("isRememberId", isRememberId.toString());
      if (isRememberId) {
        sessionStorage.setItem("savedUserId", userId);
      } else {
        sessionStorage.removeItem("savedUserId");
      }
      const isValid = loginValidation();
      if (isValid) {
        if (renderCtx) {
          await renderCtx.login(userId, password);
        }
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    const savedUserId = sessionStorage.getItem("savedUserId");
    const savedRememberId = sessionStorage.getItem("isRememberId");
    if (savedUserId && savedRememberId === "true") {
      setUserId(savedUserId);
      setIsRememberId(true);
    }
  }, []);

  return (
    <div className="border border-default-100 rounded-xl px-6 py-8 bg-white shadow-xl">
      <ToastContainer autoClose={2000} hideProgressBar={true} />
      <h1 className="flex-center-column mb-7">
        <img
          src="/icons/logo.svg"
          width="160"
          height="auto"
          alt="step-up logo"
        />
      </h1>
      <CommonInput
        value={userId || ""}
        label="아이디"
        placeholder="아이디를 입력해주세요."
        onValueChange={setUserId}
        isRequired={true}
        isInvalid={userIdCheck}
        errorMessage={userIdCheck ? "아이디를 입력해주세요." : ""}
        className="mb-3"
      />
      <div onKeyUp={handleKeyUp}>
        <CommonInput
          value={password}
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요."
          onValueChange={setPassword}
          isRequired={true}
          type="password"
          isInvalid={userPwCheck}
          errorMessage={userPwCheck ? "비밀번호를 입력해주세요." : ""}
          className="mb-5"
        />
      </div>
      {/* TODO: pub 추가 커스텀 필요 */}
      <div className="flex justify-end">
        <Checkbox
          isSelected={isRememberId}
          onValueChange={setIsRememberId}
          size="sm"
          color="secondary"
          className="mb-1 span:!border-primary-50 cm-checkbox:before:border-default-200 cm-checkbox:before:border cm-checkbox:before:hover:bg-white"
        >
          <span className="text-default-300 font-medium">아이디 저장</span>
        </Checkbox>
      </div>
      <CommonButton
        label="로그인"
        size="md"
        radius="sm"
        color="primary"
        variant="solid"
        fullWidth
        onClick={() => handleLogin()}
      />
    </div>
  );
}
