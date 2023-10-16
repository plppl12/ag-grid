import { useEffect, useRef } from 'react';

export const useFocusInput = (focus: boolean | undefined) => {
  // NOTE: we need to use bypass typechecking
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>(null);
  useEffect(() => {
    if (focus) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      ref.current?.focus?.();
    }
  }, [focus]);
  return ref;
};
