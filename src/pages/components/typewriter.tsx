import React, {useState, useEffect} from 'react';
import { IHasChildrenProps } from "./layout";

export interface ITypewriterProps{
    text: string,
    speed?: number
}
export interface ICodeProps extends IHasChildrenProps{
  width?: string
}

const useTypewriter = (text: string, speed = 50) => {
    const [displayedText, setDisplayedText] = useState('');
    const [index, setIndex] = useState(0);
  
    useEffect(() => {
      if (index < text.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(displayedText + text[index]);
          setIndex(index + 1);
        }, speed);
        return () => clearTimeout(timeout);
      }
    }, [index, text, displayedText, speed]);
    return displayedText;
  };

export const Typewriter: React.FC<ITypewriterProps> = (props: ITypewriterProps) => {
    const width = props.text.length + "ch";
    const typewriterText = useTypewriter(props.text, props.speed);
    return <div style={{width}}><Code>{typewriterText}</Code></div>
}

export const Code: React.FC<IHasChildrenProps> = (props) => {
  return (
        <code className="px-1 py-0.5  bg-black/[.05] dark:bg-white/[.06] rounded font-semibold">
            {props.children}
        </code>
      );
}