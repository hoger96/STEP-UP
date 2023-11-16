import CommonButton from "@/app/components/Buttons";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ApprovalButton(props: {
  approvalId: string;
  approvalStatus: string;
  userId: string;
  onClosePopup: (title: string) => void;
}) {
  const handleReject = async (approvalId: string) => {
    try {
      const params = {
        approvalStus: "REJECT",
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
      };
      await axios.put(`stepup/api/management/approval/${approvalId}`, params);
      props.onClosePopup("승인");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleGotoUserPage = () => {
    window.location.href = `/mypage/${props.userId}`;
  };

  return (
    <div className="flex ">
      {props.approvalStatus === "WAIT" && (
        <div className="flex">
          <div className="mr-1">
            <CommonButton
              color={"primary"}
              variant={"solid"}
              onClick={() => handleReject(props.approvalId)}
              label={"반려"}
            />
          </div>
          <div className="mr-1">
            <CommonButton
              color={"primary"}
              variant={"solid"}
              onClick={() => handleApproval(props.approvalId)}
              label={"승인"}
            />
          </div>
        </div>
      )}
      <div>
        <CommonButton
          color={"default"}
          variant={"solid"}
          onClick={handleGotoUserPage}
          label={"결재자 상세보기"}
        />
      </div>
    </div>
  );
}
