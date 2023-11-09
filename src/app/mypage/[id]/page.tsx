import Image from "next/image";

export default function Mypage(props) {
  return (
    <div>
      <h1>나의 현황 페이지</h1>
      parameter: {props.params.id}
    </div>
  );
}
