import PrismLoader from "@component/PrismLoader";

type TextCodeProps = {
  code: string;
  language: string;
  className?: string;
};

export default function TextCode(
  { code, language, className }: Readonly<TextCodeProps> = {
    code: "",
    language: "",
    className: "",
  }
) {
  return (
    <div className={className}>
      <pre className={`language-${language}`}>
        <code className={`language-${language}`}>{code}</code>
      </pre>
      <PrismLoader />
    </div>
  );
};
