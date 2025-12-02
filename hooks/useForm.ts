import { useReducer } from "react";

interface States<T = unknown> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

type Action<T = unknown> =
  | { type: "PENDING" }
  | { type: "RESOLVED"; payload: T }
  | { type: "REJECTED"; payload: Error }
  | { type: "CUSTOM"; payload: States }
  | { type: "RESET" };

function reducer(state: States, action: Action): States {
  switch (action.type) {
    case "PENDING":
      return {
        data: null,
        isLoading: true,
        error: null,
      };

    case "REJECTED":
      return {
        data: null,
        isLoading: false,
        error: action.payload,
      };

    case "RESOLVED":
      return {
        data: action.payload,
        isLoading: false,
        error: null,
      };

    case "RESET":
      return initialState;

    case "CUSTOM":
      return action.payload;

    default:
      return state;
  }
}

const initialState: States = {
  data: null,
  isLoading: false,
  error: null,
};

export const useForm = <T = unknown>() => {
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleSubmit(
    callback: (event: React.FormEvent<HTMLFormElement>) => Promise<T>
  ) {
    return async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      dispatch({ type: "PENDING" });

      try {
        const result = await callback(e);

        if (
          result &&
          typeof result === "object" &&
          "error" in result &&
          result.error
        ) {
          const errorObj =
            result.error instanceof Error
              ? result.error
              : new Error(
                  (result.error as Error)?.message || "An error occurred"
                );

          dispatch({
            type: "REJECTED",
            payload: errorObj,
          });

          return result;
        }

        if (result && typeof result === "object" && "data" in result) {
          dispatch({ type: "RESOLVED", payload: result.data });
          return result;
        }

        dispatch({ type: "RESOLVED", payload: result });
        return result;
      } catch (err) {
        dispatch({
          type: "REJECTED",
          payload: err instanceof Error ? err : new Error(String(err)),
        });
      }
    };
  }

  return {
    ...state,
    dispatch,
    handleSubmit,
  };
};
