import { useState } from "react";

const useStatus = () => {
  const [status, setStatus] = useState<{
    isLoading: boolean;
    hasError: boolean;
    statusText: string;
  }>({
    isLoading: false,
    hasError: false,
    statusText: "",
  });
  return { status, setStatus };
};

export default useStatus;
