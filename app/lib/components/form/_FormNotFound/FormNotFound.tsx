import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface FormNotFoundProps {
  field: string;
}

export default function FormNotFound({ field }: FormNotFoundProps) {
  return (
    <div className="rounded-lg bg-red-alpha-200 p-3">
      <div className="flex flex-row">
        <FontAwesomeIcon
          icon={faCircleXmark}
          aria-hidden="true"
          className="mr-3 mt-0.5 text-error-primary"
        />
        <div className="flex flex-col text-sm text-error-contrast">
          <div className="font-semibold">Form Error</div>

          <div className="font-normal opacity-60">
            {field} must be used within a Form
          </div>
        </div>
      </div>
    </div>
  );
}
