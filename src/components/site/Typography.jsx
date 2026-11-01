import { useEffect } from 'react';

/**
 * Typographie française : les espaces avant « : ; ! ? » et à l'intérieur des
 * guillemets ne doivent jamais tomber en début de ligne. On remplace ces
 * espaces par des espaces insécables dans le texte rendu — y compris le
 * contenu saisi depuis l'espace de gestion, qui n'est pas dans le code.
 */
const RULES = [
  [/ ([:;!?»])/g, (match, punctuation) => `\u00A0${punctuation}`],
  [/« /g, '«\u00A0'],
  [/(\d) (€|%)/g, (match, number, unit) => `${number}\u00A0${unit}`],
];

const SKIP = ['SCRIPT', 'STYLE', 'TEXTAREA', 'INPUT'];

const fixTextNode = (node) => {
  const value = node.nodeValue;
  if (!value || value.trim() === '') return;
  const fixed = RULES.reduce((text, [pattern, replace]) => text.replace(pattern, replace), value);
  if (fixed !== value) node.nodeValue = fixed;
};

const fixTree = (root) => {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode: (node) =>
      node.parentElement && SKIP.includes(node.parentElement.tagName)
        ? NodeFilter.FILTER_REJECT
        : NodeFilter.FILTER_ACCEPT,
  });
  let node = walker.nextNode();
  while (node) {
    fixTextNode(node);
    node = walker.nextNode();
  }
};

export default function Typography() {
  useEffect(() => {
    fixTree(document.body);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'characterData') {
          fixTextNode(mutation.target);
          return;
        }
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.TEXT_NODE) fixTextNode(node);
          else if (node.nodeType === Node.ELEMENT_NODE) fixTree(node);
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    return () => observer.disconnect();
  }, []);

  return null;
}