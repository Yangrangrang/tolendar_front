'use Client'

import { useState , useRef, MutableRefObject } from "react";

type Props = {
  setInputPasswordCheck: MutableRefObject<boolean>;
};

export default function PasswordInputForm (props : Props){
  // console.log("test")

  // 비밀번호 두 개가 서로 같은 상태 변화
  const [isValid, setIsValid] = useState(true);

  // value 값 가져오기
  const passwordInput = useRef<HTMLInputElement>(null);
  const passwordCheckInput = useRef<HTMLInputElement>(null);

  // password check 유효성 검사
  const validatePassword = () => {
    const passwordValue = passwordInput.current?.value;
    const passwordCheckValue = passwordCheckInput.current?.value;

    if (passwordValue === passwordCheckValue) {
      props.setInputPasswordCheck.current = true;
      setIsValid(true);
    } else {
      props.setInputPasswordCheck.current = false;
      setIsValid(false);
    }
  };
  
  return (
    <div className="mb-2">
        <label
            className="block text-sm font-semibold text-gray-800"
            htmlFor="password"
        >
            password
        </label>
        <input
            ref={passwordInput}
            id="password"
            name="password"
            type="password"
            required
            minLength={8}
            maxLength={20}
            pattern="[a-z0-9]{1,15}"
            className="block w-full px-4 py-2 mt-2 text-orange-700 bg-white border rounded-md focus:border-orange-400 focus:ring-orange-300 focus:outline-none focus:ring focus:ring-opacity-40"
        />
        <label
            className="block text-sm font-semibold text-gray-800"
            htmlFor="passwordCheck"
        >
            passwordCheck
        </label>
        <input
            ref={passwordCheckInput}
            id="passwordCheck"
            name="passwordCheck"
            type="password"
            required
            minLength={8}
            maxLength={20}
            pattern="[a-z0-9]{1,15}"
            onChange={validatePassword}
            className="block w-full px-4 py-2 mt-2 text-orange-700 bg-white border rounded-md focus:border-orange-400 focus:ring-orange-300 focus:outline-none focus:ring focus:ring-opacity-40"
        />
        {isValid  ? " " : <p className="text-red-500">비밀번호가 일치하지 않습니다.</p>}
    </div>
  )
}