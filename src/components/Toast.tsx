import { ToastContainer, toast, cssTransition } from 'react-toastify';
// import "animate.css/animate.min.css";
import 'react-toastify/dist/ReactToastify.css';

export const bounce = cssTransition({
  enter: 'animate__animated animate__bounceIn',
  exit: 'animate__animated animate__bounceOut',
});

export const swirl = cssTransition({
  enter: 'swirl-in-fwd',
  exit: 'swirl-out-bck',
});

export const ToastModal = ({
  closeToast,
  toastProps,
  status,
  message,
}: {
  closeToast: any;
  toastProps: any;
  status: string;
  message: string | undefined;
}) => {
  return (
    <div className="flex rounded-md items-center font-sans">
      {status == 'success' && (
        <img src="/success.png" width={34} height={34} />
      )}
      {status == 'failure' && (
        <img src="/close.png" width={34} height={34} />
      )}
      <div className="ml-2">
        <p
          className={`text-base font-bold ${
            status == 'success' ? 'text-green-800' : 'text-red-800'
          }`}
        >
          Transaction Notification
        </p>
        <p className="text-sm">
          Transaction {status == 'success' ? 'Successful' : 'Failed'}
        </p>
        {message && <p className="text-sm py-2 text-gray-900">{message}</p>}
      </div>
    </div>
  );
};

export const displayToast = (status: string, message?: string) => {
  toast(
    <ToastModal
      closeToast={undefined}
      toastProps={undefined}
      status={status}
      message={message}
    />,
    { autoClose: 12000, position: toast.POSITION.TOP_LEFT }
  );
};
