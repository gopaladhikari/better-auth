import { useState } from "react";

export const useForm = <T = unknown>() => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  function handleSubmit(
    callback: (e: React.FormEvent<HTMLFormElement>) => Promise<T | void> | void
  ) {
    return async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      setIsLoading(true);
      setError(null);
      setData(null);

      try {
        const result = await callback(e);

        if (result) setData(result);
      } catch (err) {
        console.error("Form Submission Error:", err);
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };
  }

  return {
    data,
    isLoading,
    error,
    setError,
    setData,
    handleSubmit,
  };
};
