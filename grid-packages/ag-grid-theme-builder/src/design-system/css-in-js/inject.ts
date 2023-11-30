export type InjectParams = {
  id: string;
  replace: boolean;
  generate: () => string;
};

export const inject = ({ id, generate, replace }: InjectParams) => {
  id = `ag-injected-style-${id}`;
  const head = document.querySelector('head');
  if (!head) throw new Error("Can't inject theme before document head is created");
  let style = head.querySelector(`#${id}`) as HTMLStyleElement;
  const preexisting = !!style;
  if (!style) {
    style = document.createElement('style');
    style.setAttribute('id', id);
    head.insertBefore(style, head.firstChild);
  }
  if (!preexisting || replace) {
    style.textContent = generate();
  }
};
