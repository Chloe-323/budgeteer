import { Card } from "./elements"
import { InformationCircleIcon } from "@heroicons/react/24/outline"

export interface IFormProps {
    items: (IFormItemProps | IFormItemProps[])[],
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

export interface IFormItemProps {
    type: string,
    placeholder: string,
    id: string,
    tooltip?: string,
}

export const Form: React.FC<IFormProps> = (props) => {
    return (
        <form onSubmit={props.onSubmit}>
            <div className="grid gap-2 mb-6 w-80">
                {props.items.map((item, index) => {
                    if (Array.isArray(item)) {
                        return (
                            <div key={index} className="flex space-x-2">
                                {item.map((subItem, subIndex) => <FormItem props={subItem} key={subIndex} />)}
                            </div>
                        );
                    } else {
                        return <FormItem props={item} key={index} />;
                    }
                })}
                <button type="submit" className="mt-6 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-foreground bg-cascade-500 hover:bg-cascade-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cascade-500">Submit</button>
            </div>
        </form>
    )
}

export default Form;
export const FormItem: React.FC<{ props: IFormItemProps }> = (props) => {
    return (
        <div className="relative">
            <input 
                type={props.props.type} 
                name={props.props.id} 
                id={props.props.id} 
                placeholder={props.props.placeholder} 
                className={`mt-1 p-2 block w-full shadow-sm sm:text-sm rounded-md border-gray-300 text-black ${props.props.tooltip ? 'pr-10' : ''}`} 
            />
            {props.props.tooltip && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center group pt-1">
                    <InformationCircleIcon className="w-5 center text-gray-500 cursor-pointer" />
                    <div className="opacity-0 w-32 bg-cascade-500 text-white text-xs rounded-lg px-2 py-2 absolute z-10 group-hover:opacity-100 bottom-full right-0 transform translate-y-2 pointer-events-none group-hover:pointer-events-auto">
                        {props.props.tooltip}
                        <svg className="absolute text-cascade-500 h-2 w-2 right-1 top-full transform rotate-45" viewBox="0 0 255 255">
                        </svg>
                    </div>
                </div>
            )}
        </div>
    );
}