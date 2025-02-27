import {
  type Ref,
  forwardRef,
  type ComponentProps,
  type MouseEvent,
} from "react";
import { GoX } from "react-icons/go";
import { twMerge } from "tailwind-merge";

/**
 * Provides a wrapper for displaying a modal using the state and callbacks provided by useTogglePopup
 * @param hideCloseBtn Whether the close button should be displayed in the modal corner.
 * @param isOpen Whether modal should be open or not (useTogglePopup encouraged).
 * @param close Callback to close the modal. Will be fired when user clicks the close button (useTogglePopup encouraged).
 * @param ref The ref to pass to the object to prevent closing this elements on clicks within (useTogglePopup encouraged).
 */
const Modal = forwardRef(function Modal(
  props: ComponentProps<"div"> & {
    isOpen: boolean;
    close: () => void;
    hideCloseBtn?: boolean;
  },
  ref: Ref<HTMLDivElement>,
) {
  const {
    children,
    isOpen,
    close,
    className,
    hideCloseBtn,
    id,
    ...otherProps
  } = props;

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <>
      <div
        ref={ref}
        className={twMerge(
          `no-scrollbar fixed inset-1/2 z-20 origin-center -translate-x-1/2 -translate-y-1/2 overflow-x-hidden overflow-y-scroll rounded-2xl bg-white px-4 pt-10 shadow-xl shadow-gray-500/50 transition-all ${isOpen ? "scale-100" : "scale-0"}`,
          className,
        )}
        id={"modal_" + id}
        {...otherProps}
        onClick={handleClick}
      >
        {(hideCloseBtn === undefined || !hideCloseBtn) && (
          <button
            type="button"
            className="absolute right-0 top-0 aspect-square h-10 cursor-pointer rounded-bl-lg rounded-tr-lg bg-red-300 p-2 text-gray-50"
            onClick={close}
          >
            <GoX size={26} strokeWidth={1} />
          </button>
        )}
        {children}
      </div>
      {isOpen && (
        <div
          id={`modal-backdrop_${id}`}
          className="fixed inset-0 z-10 bg-black/20"
          onClick={close}
        ></div>
      )}
    </>
  );
});

export default Modal;
