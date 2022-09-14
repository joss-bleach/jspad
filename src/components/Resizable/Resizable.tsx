import "./resizable.css";
import { useEffect, useState } from "react";
import { ResizableBox, ResizableBoxProps } from "react-resizable";

interface ResizableProps {
  direction: "horizontal" | "vertical";
  children: React.ReactNode;
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  const [currentInnerHeight, setCurrentInnerHeight] = useState(
    window.innerHeight
  );
  const [currentInnerWidth, setCurrentInnerWidth] = useState(window.innerWidth);
  const [width, setWidth] = useState(window.innerWidth * 0.75);

  useEffect(() => {
    let timer: any;
    const listener = () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setCurrentInnerHeight(window.innerHeight);
        setCurrentInnerWidth(window.innerWidth);
        if (window.innerWidth * 0.75 < width) {
          setWidth(window.innerWidth * 0.75);
        }
      }, 100);
    };
    window.addEventListener("resize", listener);
    return () => {
      window.removeEventListener("resize", listener);
    };
  }, []);

  let resizableProps: ResizableBoxProps;
  if (direction === "horizontal") {
    resizableProps = {
      className: "resize-horizontal",
      minConstraints: [currentInnerWidth * 0.2, Infinity],
      maxConstraints: [currentInnerWidth * 0.75, Infinity],
      height: Infinity,
      width,
      resizeHandles: ["e"],
      onResizeStop: (event, data) => {
        setWidth(data.size.width);
      },
    };
  } else {
    resizableProps = {
      height: 300,
      width: Infinity,
      maxConstraints: [Infinity, currentInnerHeight * 0.9],
      minConstraints: [Infinity, 50],
      resizeHandles: ["s"],
    };
  }

  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
