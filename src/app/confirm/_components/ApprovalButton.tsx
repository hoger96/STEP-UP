import CommonButton from "@/app/components/Buttons";
import axios from "axios";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";

export default function ApprovalButton(props: {
  approvalId: string;
  approvalStatus: string;
  userId: string;
  onClosePopup: (title: string) => void;
}) {
  const router = useRouter();
  const handleReject = async (approvalId: string) => {
    try {
      const params = {
        approvalStus: "REJECT",
        userId: props.userId,
      };
      await axios.put(`stepup/api/management/approval/${approvalId}`, params);
      props.onClosePopup("반려");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleApproval = async (approvalId: string) => {
    try {
      const params = {
        approvalStus: "APPROVAL",
        userId: props.userId,
      };
      await axios.put(`stepup/api/management/approval/${approvalId}`, params);
      props.onClosePopup("승인");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleGotoUserPage = () => {
    router.push(`/mypage/${props.userId}`);
  };

  return (
    <div className="flex ">
      {props.approvalStatus === "WAIT" && (
        <div className="flex">
          <CommonButton
            color={"primary"}
            variant={"bordered"}
            onClick={() => handleReject(props.approvalId)}
            label={"반려"}
            className="mr-1 border"
          />
          <CommonButton
            color={"primary"}
            variant={"solid"}
            onClick={() => handleApproval(props.approvalId)}
            label={"승인"}
            className="mr-1"
          />
        </div>
      )}
      <CommonButton
        color="primary"
        variant={"solid"}
        onClick={handleGotoUserPage}
        label={"결재자 상세보기"}
      />
    </div>
  );
}
