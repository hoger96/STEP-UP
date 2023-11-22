import StepupStatus from "../_components/StepupStatus";
import StepupTabs from "../_components/StepupTabContainer";

export default function Mypage(props: {
  params: {
    id: string
  };
}) {

  return (
    <div>
      <StepupStatus requestId={props.params.id} />
      <StepupTabs requestId={props.params.id} />
    </div>
  );
}
