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
  const [userPw, setUserPw] = useState<string>("");
  const [userIdCheck, setUserIdCheck] = useState(false);
  const [userPwCheck, setUserPwCheck] = useState(false);
  const [rememberId, setRememberId] = useState(false);
  const router = useRouter();

  const loginValidation = () => {
    let isValid = true;
    if (!userId?.length) {
      setUserIdCheck(true);
      isValid = false;
    }
    if (!userPw?.length) {
      setUserPwCheck(true);
      isValid = false;
    }

    return isValid;
  };

  const handleRememberId = () => {
    setRememberId(!rememberId); // 토글 기능을 위해 현재 상태의 반대값으로 설정
    if (!rememberId) {
      sessionStorage.setItem("userId", userId);
    } else {
      sessionStorage.removeItem("userId");
    }
  };

  const showToast = (title: string, type?: TypeOptions) => {
    toast(title, { type });
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") handleLogin();
  };

  const handleLogin = async () => {
    try {
      const isValid = loginValidation();
      sessionStorage.setItem("userId", userId);
      if (isValid) {
        const result = await axios.post("/stepup/api/login", {
          userId: userId,
          password: userPw,
        });
        sessionStorage.setItem("loginUserId", result.data.body.userId);
        sessionStorage.setItem("loginUserName", result.data.body.userNm);
        sessionStorage.setItem("loginUserMaster", result.data.body.masterYn);
        if (
          result.data.code === "20000000" &&
          result.data.body.masterYn === "Y"
        ) {
          router.push("/confirm");
        } else if (
          result.data.code === "20000000" &&
          result.data.body.masterYn === "Y"
        ) {
          router.push(`/mypage/${result.data.body.userId}`);
        }
      }
    } catch (error: any) {
      if (error.response.data.code === "40000000") {
        showToast("아이디 또는 비밀번호가 일치하지 않습니다.", "error");
      }
    }
  };

  useEffect(() => {
    const savedUserId = sessionStorage.getItem("userId");
    if (savedUserId) {
      setUserId(savedUserId);
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
          value={userPw}
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요."
          onValueChange={setUserPw}
          isRequired={true}
          type="password"
          isInvalid={userPwCheck}
          errorMessage={userPwCheck ? "비밀번호를 입력해주세요." : ""}
          className="mb-5"
        />
      </div>
      <div>
        <Checkbox isSelected={rememberId} onValueChange={setRememberId}>
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
          onClick={() => handleLogin()}
        />
      </div>
    </div>
  );
}
