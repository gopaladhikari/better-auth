import { useReducer } from "react";

interface States<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

type Action<T = unknown> =
  | { type: "PENDING" }
  | { type: "RESOLVED"; payload: T }
  | { type: "REJECTED"; payload: Error }
  | { type: "CUSTOM"; payload: States<T> }
  | { type: "RESET" };

function reducer<T>(state: States<T>, action: Action<T>): States<T> {
  switch (action.type) {
    case "PENDING":
      return { ...state, data: null, isLoading: true, error: null };

    case "REJECTED":
      return {
        ...state,
        data: null,
        isLoading: false,
        error: action.payload,
      };

    case "RESOLVED":
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        error: null,
      };

    case "RESET":
      return initialState as States<T>;

    default:
      return state;
  }
}

const initialState: States<unknown> = {
  data: null,
  isLoading: false,
  error: null,
};

export const useForm = <T>() => {
  const [state, dispatch] = useReducer(
    reducer<T>,
    initialState as States<T>
  );

  function handleSubmit<R extends T>(
    callback: (event: React.FormEvent<HTMLFormElement>) => Promise<R>
  ) {
    return async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const form = e?.currentTarget;

      dispatch({ type: "PENDING" });

      try {
        const data: T = await callback(e);

        dispatch({ type: "RESOLVED", payload: data });
        form?.reset();

        return data;
      } catch (err) {
        const error =
          err instanceof Error
            ? err
            : new Error(
                (err as Error)?.message || "Something went wrong"
              );

        dispatch({
          type: "REJECTED",
          payload: error,
        });
      }
    };
  }

  return {
    ...state,
    data: state.data as T | null,
    isLoading: state.isLoading,
    error: state.error,
    handleSubmit,
    reset: () => dispatch({ type: "RESET" }),
  };
};
