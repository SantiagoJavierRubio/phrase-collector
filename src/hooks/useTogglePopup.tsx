import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type RefObject,
} from "react";

export type TogglePopup = {
  ref: RefObject<HTMLDivElement | null>;
  isOpen: boolean;
  close: () => void;
  open: () => void;
};

/**
 * Handles the state of popup display. Sets it to close on any click outside it's target.
 * @param handleClose A callback to be called upon closing.
 * @param initialState True if popup starts as open.
 * @returns {TogglePopup} 
 *  ref: Ref to pass to container to avoid closing on clicks within. 
 *  isOpen: the current state.
 *  close: function to set state to closed.
 *  open: function to set state to opened.
 */
export function useTogglePopup(
  handleClose?: () => void,
  initialState: boolean = false,
): TogglePopup {
  const [isOpen, setOpen] = useState<boolean>(initialState);

  const ref = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    if (handleClose) handleClose();
    setOpen(false);
  }, [handleClose]);

  const open = useCallback(() => setOpen(true), []);

  useEffect(() => {
    const handleClickOutside = (ev: PointerEvent) => {
      const target = ev.target as HTMLElement;

      if (
        ref.current &&
        !ref.current.contains(target)
      ) {
        close();
      }
    };

    document.addEventListener("pointerdown", handleClickOutside);

    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, [ref, close]);

  return { ref, isOpen, close, open };
}