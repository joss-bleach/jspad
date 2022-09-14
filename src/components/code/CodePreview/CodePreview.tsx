import "./code-preview.css";
import { useEffect, useRef } from "react";

interface CodePreviewProps {
  code: string;
  bundleStatus: string;
}

const html = `
    <html>
        <head>
          <style>
            html { background-color: white; }
          </style>
        </head>
        <body>
            <div id="root"></div>
            <script>
                const handleError = (err) => {
                        const root = document.querySelector("#root");
                        root.innerHTML = '<div style="color: red;"><h4>Runtime error:</h4>' + err + '</div>';
                        console.error(err);
                }
                window.addEventListener('error', (event) => {
                  event.preventDefault();
                  handleError(event.error);
                })
                window.addEventListener('message', (event) => {
                    try {
                        eval(event.data);
                    } catch (err) {
                        handleError(err);
                    }
                }, false)
            </script>
        </body>
    </html>
  `;

const CodePreview: React.FC<CodePreviewProps> = ({ code, bundleStatus }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcodc = html;
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, "*");
    }, 50);
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe
        sandbox="allow-scripts"
        ref={iframe}
        srcDoc={html}
        title="Code Preview"
      />
      {bundleStatus && (
        <div className="preview-error">
          <h4>Bundle error:</h4>
          {bundleStatus}
        </div>
      )}
    </div>
  );
};

export default CodePreview;
