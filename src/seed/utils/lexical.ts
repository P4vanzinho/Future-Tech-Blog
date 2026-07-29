type LexicalTextNode = {
  type: "text";
  text: string;
  version: 1;
  detail: 0;
  format: 0;
  mode: "normal";
  style: "";
};

type LexicalHeadingNode = {
  type: "heading";
  tag: "h2" | "h3";
  version: 1;
  direction: null;
  format: "";
  indent: 0;
  children: LexicalTextNode[];
};

type LexicalParagraphNode = {
  type: "paragraph";
  version: 1;
  direction: null;
  format: "";
  indent: 0;
  textFormat: 0;
  textStyle: "";
  children: LexicalTextNode[];
};

type LexicalChild = LexicalHeadingNode | LexicalParagraphNode;

function textNode(text: string): LexicalTextNode {
  return {
    type: "text",
    text,
    version: 1,
    detail: 0,
    format: 0,
    mode: "normal",
    style: "",
  };
}

export function heading(tag: "h2" | "h3", text: string): LexicalHeadingNode {
  return {
    type: "heading",
    tag,
    version: 1,
    direction: null,
    format: "" as const,
    indent: 0,
    children: [textNode(text)],
  };
}

export function paragraph(text: string): LexicalParagraphNode {
  return {
    type: "paragraph",
    version: 1,
    direction: null,
    format: "" as const,
    indent: 0,
    textFormat: 0,
    textStyle: "",
    children: [textNode(text)],
  };
}

export function createLexicalDocument(children: LexicalChild[]) {
  return {
    root: {
      type: "root" as const,
      version: 1,
      direction: null,
      format: "" as const,
      indent: 0,
      children,
    },
  };
}

export function createArticleBodyContent() {
  return createLexicalDocument([
    heading("h2", "Introduction"),
    paragraph(
      "Artificial intelligence is reshaping healthcare delivery, diagnostics, and research. This article explores how AI tools are moving from pilots to production across hospitals and clinics."
    ),
    heading("h2", "Diagnostic Imaging"),
    paragraph(
      "Machine learning models can flag anomalies in X-rays, MRIs, and CT scans earlier than manual review alone, helping clinicians prioritize urgent cases."
    ),
    heading("h3", "Radiology Workflows"),
    paragraph(
      "Integrated AI assistants reduce reporting time while keeping physicians in control of final decisions."
    ),
    heading("h2", "Personalized Treatment"),
    paragraph(
      "Patient-specific models support care teams with treatment recommendations grounded in history, risk factors, and outcomes data."
    ),
    heading("h2", "Conclusion"),
    paragraph(
      "Responsible adoption of AI in healthcare depends on transparency, governance, and continuous human oversight."
    ),
  ]);
}
