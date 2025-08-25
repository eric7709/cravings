import { CARD_STYLES } from "./cardStyles";

export const getCancelButtonStyles = (isPending: boolean): string => {
  const baseStyles =
    "p-1 rounded cursor-pointer transition-all duration-150 flex-shrink-0 border";
  const stateStyles = isPending
    ? CARD_STYLES.cancelButton.pending
    : CARD_STYLES.cancelButton.active;
  return `${baseStyles} ${stateStyles}`;
};
