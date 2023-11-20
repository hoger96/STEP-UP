import { ReactChild, ReactFragment, ReactPortal } from "react";
import StepupStatus from "../_components/StepupStatus";
import StepupTabs from "../_components/StepupTabContainer";

export default function Mypage(props: {
  params: {
    id: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined;
  };
}) {
  return (
    <div>
      <StepupStatus />
      <StepupTabs />
    </div>
  );
}
