import { useEffect, useRef } from "react";

interface CodePreviewProps {
  code: string;
}

const html = `
    <html>
        <head></head>
        <body>
            <div id="root"></div>
            <script>
                window.addEventListener('message', (event) => {
                    try {
                        eval(event.data);
                    } catch (err) {
                        const root = document.querySelector("#root");
                        root.innerHTML = '<div style="color: red;"><h4>Runtime error:</h4>' + err + '</div>';
                        console.error(err);
                    }
                }, false)
            </script>
        </body>
    </html>
  `;

const CodePreview: React.FC<CodePreviewProps> = ({ code }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcodc = html;
    iframe.current.contentWindow.postMessage(code, "*");
  }, [code]);
  return (
    <iframe
      sandbox="allow-scripts"
      ref={iframe}
      srcDoc={html}
      title="Code Preview"
    />
  );
};

export default CodePreview;
