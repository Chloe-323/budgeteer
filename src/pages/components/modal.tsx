import { useState } from 'react';
import {Card} from './elements'
import { IHasChildrenProps } from './layout'

export interface IModalProps extends IHasChildrenProps {
    open: boolean,
    setOpen: (open: boolean) => void
}

export const Modal: React.FC<IModalProps> = (props) => {
    return (
        props.open ? (
            <>
            <div
              className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
              onClick={() => props.setOpen(false)}
            >
              <div
                className="relative w-auto mx-auto max-w-sm"
                onClick={(e) => e.stopPropagation()}
              >
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-cascade-100 outline-none">
                 {props.children}
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
        ) : null
    );
}

