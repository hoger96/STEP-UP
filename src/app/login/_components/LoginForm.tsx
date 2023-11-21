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

export default function LoginForm() {
  const [userId, setUserId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [userIdCheck, setUserIdCheck] = useState(false);
  const [userPwCheck, setUserPwCheck] = useState(false);
  const [isRememberId, setIsRememberId] = useState(false);
  const router = useRouter();

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
        const result = await axios.post("/stepup/api/login", {
          userId,
          password,
        });
        sessionStorage.setItem("loginUserId", result.data.body.userId);
        sessionStorage.setItem("loginUserName", result.data.body.userNm);
        sessionStorage.setItem("loginUserMaster", result.data.body.masterYn);

        if (result.data.body.masterYn === "Y") {
          router.push("/confirm");
        } else if (result.data.body.masterYn === "N") {
          router.push(`/mypage/${result.data.body.userId}`);
        }
      }
    } catch (error: any) {
      showToast("아이디 또는 비밀번호를 확인해주세요.", "error");
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
    <div className="border rounded-md p-5">
      <ToastContainer autoClose={2000} hideProgressBar={true} />
      <div>
        <h1 className="flex-center-column mb-7">
          <Image
            src="/icons/logo.svg"
            width="160"
            height="25"
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
      </div>
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
      <div>
        <Checkbox isSelected={isRememberId} onValueChange={setIsRememberId}>
          아이디 저장
        </Checkbox>
      </div>
      <div>
        <CommonButton
          label="로그인"
          size="md"
          radius="md"
          color="primary"
          variant="solid"
          fullWidth
          onClick={() => handleLogin()}
        />
      </div>
    </div>
  );
}
