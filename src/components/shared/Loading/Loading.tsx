import React from "react";

const imageBase64 = `
data:image/gif;base64,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
`;

const Loading = () => (
  <div
    style={{
      height: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}
  >
    <img src={imageBase64} alt="Loading..." />
  </div>
);

Loading.displayName = "Loader";

export default Loading;