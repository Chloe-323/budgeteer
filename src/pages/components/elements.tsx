import { Button } from '@headlessui/react'
import { EnvelopeIcon } from '@heroicons/react/24/outline'
import ReactMarkdown from 'react-markdown';
import { IHasChildrenProps } from './layout';
import { ReactNode } from 'react';
import { Code } from './typewriter';

export interface IChipProps {
    color: string,
    children: string,
    icon?: ReactNode,
}

export const Markdown: React.FC<IHasChildrenProps> = (props) => {
    return <ReactMarkdown components = {
      {
        h1: ({children}: {children?: ReactNode}) => <Header1>{children}</Header1>,
        h2: ({children}: {children?: ReactNode}) => <Header2>{children}</Header2>,
        h3: ({children}: {children?: ReactNode}) => <Header3>{children}</Header3>,
        h4: ({children}: {children?: ReactNode}) => <Header4>{children}</Header4>,
        code: ({children}: {children?: ReactNode}) => <Code>{children}</Code>,
        ol: ({children}: {children?: ReactNode}) => <OrderedList>{children}</OrderedList>,
        ul: ({children}: {children?: ReactNode}) => <UnorderedList>{children}</UnorderedList>,
        li: ({children}: {children?: ReactNode}) => <ListItem>{children}</ListItem>,
    }
    }>
        {props.children?.toString()}
    </ReactMarkdown>
}

export const Header1: React.FC<IHasChildrenProps> = (props) => {
    return <h1 className="text-4xl text-foreground font-extrabold sm:text-5xl">{props.children}</h1>
}
export const Header2: React.FC<IHasChildrenProps> = (props) => {
    return <h2 className="text-3xl text-foreground font-extrabold sm:text-4xl">{props.children}</h2>
}
export const Header3: React.FC<IHasChildrenProps> = (props) => {
    return <h3 className="text-2xl text-foreground font-extrabold sm:text-3xl">{props.children}</h3>
}
export const Header4: React.FC<IHasChildrenProps> = (props) => {
    return <h4 className="text-1xl text-foreground font-extrabold sm:text-2xl">{props.children}</h4>
}
export const OrderedList: React.FC<IHasChildrenProps> = (props) => {
return <ol className="list-inside list-decimal text-sm text-center sm:text-left">{props.children}</ol>
}
export const UnorderedList: React.FC<IHasChildrenProps> = (props) => {
    return <ul className=" list-inside list-disc text-sm text-center sm:text-left">{props.children}</ul>
}
export const ListItem: React.FC<IHasChildrenProps> = (props) => {
    return <li className='list-item'>{props.children}</li>
}

export const Chip: React.FC<IChipProps> = (props) => {
    return (
        <div className="flex">
        <div className={`rounded-md bg-${props.color}-600 py-0.5 px-2.5 border border-transparent text-sm text-white transition-all shadow-sm overflow-hidden`}>
            {props.children}
        </div>
        </div>
    );
}
export const ContactButton: React.FC = () => {
    return (
        <Button className="btn-primary text-sm">
            <EnvelopeIcon className='size-6' />
            <span>Contact</span>
        </Button>
    )
}

