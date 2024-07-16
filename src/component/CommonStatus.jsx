import { Icon } from "@iconify/react";
import React from "react";

// 1 = (active, green ), 2= (pending, yellow), 0 = (inactive, red)

const CommonStatus = ({
  status,
  fontSize = "16px",
  rejectedStatusText = "Un-verified",
  approvedStatusText = "Verified",
  pendingStatusText = "Pending",
  minWidth,
  maxWidth,
}) => {
  const makeStatusReadable = (passedStatus) => {
    if (passedStatus === 1) {
      return approvedStatusText;
    } else if (passedStatus === 0) {
      return rejectedStatusText;
    } else if (passedStatus === 2) {
      return pendingStatusText;
    } else if (passedStatus === "PENDING") {
      return pendingStatusText;
    } else if (passedStatus === "SUCCESS") {
      return approvedStatusText;
    } else if (passedStatus === "REJECTED") {
      return rejectedStatusText;
    }
  };
  return (
    <div
      className={
        status === 1 || status === "SUCCESS"
          ? "status-design-active"
          : status === 2 || status === "PENDING"
          ? "status-design-pending"
          : "status-design-inactive"
      }
      style={{ minWidth: minWidth, maxWidth: maxWidth, fontSize: fontSize }}
    >
      <Icon
        icon={
          status === 1 || status === "SUCCESS"
            ? "mdi:tick-circle"
            : status === 2 || status === "PENDING"
            ? "zondicons:exclamation-outline"
            : "carbon:error"
        }
        style={{
          fontSize: fontSize,
          color:
            status === 1 || status === "SUCCESS"
              ? "#02B062"
              : status === 2 || status === "PENDING"
              ? "#e0b64b"
              : "#e77774",
        }}
      />
      <span className="ms-1">{makeStatusReadable(status)}</span>
    </div>
  );
};

export default CommonStatus;
