"use client";
import CommonButton from "@/app/components/Buttons";
import CommonInput from "@/app/components/Input";
import { Checkbox } from "@nextui-org/checkbox";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { useEffect, useState } from "react";
import { ToastContainer, TypeOptions, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    const userLoginId = sessionStorage.getItem("userId");
    console.log(userLoginId);
    setRememberId(!rememberId);
    if (rememberId === true) {
      sessionStorage.removeItem("userId");

      console.log("1", rememberId, userLoginId);
    } else {
      sessionStorage.setItem("userId", userId);
      sessionStorage.removeItem("userId");
      console.log("2", rememberId, userLoginId);
    }
  };

  const showToast = (title: string, type?: TypeOptions) => {
    toast(title, { type });
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
    <>
      <ToastContainer autoClose={2000} hideProgressBar={true} />
      <div>
        <CommonInput
          value={userId || ""}
          label="아이디"
          placeholder="아이디를 입력해주세요."
          onValueChange={setUserId}
          isRequired={true}
          isInvalid={userIdCheck}
          errorMessage={userIdCheck ? "아이디를 입력해주세요." : ""}
        />
        <CommonInput
          value={userPw}
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요."
          onValueChange={setUserPw}
          isRequired={true}
          type="password"
          isInvalid={userPwCheck}
          errorMessage={userPwCheck ? "비밀번호를 입력해주세요." : ""}
        />

        <Checkbox isSelected={rememberId} onValueChange={handleRememberId}>
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
    </>
  );
}
