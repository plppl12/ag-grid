import { useEffect, useRef } from 'react';

type HasFocus = {
  focus(): void;
};

export const useFocusInput = (focus: boolean | undefined) => {
  const ref = useRef<HasFocus | null>(null);
  useEffect(() => {
    if (focus) {
      ref.current?.focus?.();
    }
  }, [focus]);
  return (instance: HasFocus | null) => {
    ref.current = instance;
  };
};
