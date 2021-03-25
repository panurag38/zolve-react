const copyToClipboard = (str) => {
  console.log('this');
  const el = document.createElement('textarea');
  el.value = str;
  el.readOnly = true;
  el.contentEditable = true;
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  const range = document.createRange();
  range.selectNodeContents(el);
  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
  el.setSelectionRange(0, 999999);
  el.contentEditable = false;
  el.readOnly = true;
  document.execCommand('copy');
  document.body.removeChild(el);
  console.log('navigator.clipboard >>>>>>>>>>>>>> success');
  return 'success';
};

export const copyLinkFn = (url) => {
  const _url = url;
  if (!navigator.clipboard) return;
  navigator.clipboard.writeText(_url).then(() => {
    console.log('Async: Copying to clipboard was successful!');
  }, (err) => {
    copyToClipboard(_url);
    console.error('Async: Could not copy text: ', err);
  });
};
