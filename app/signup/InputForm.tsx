import { useRef, useState } from "react";

type data = {
  // ref?: React.RefObject<HTMLInputElement>,
  name : string,
  type : string,
  min?: number,
  max?: number,
  pattern?: string
}

export default function InputForm (props : data){
  // const [value, setValue] = useState('');
  // const idInput = useRef<HTMLInputElement>(null);

  // const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setValue(`${e.target.value}`)
  // }

  return (
    <div className="mb-2">
        <label
            className="block text-sm font-semibold text-gray-800"
            htmlFor={props.name}
        >
            {props.name}
        </label>
        <input
            // ref={idInput}
            id={props.name}
            name={props.name}
            type={props.type}
            required
            minLength={props.min}
            maxLength={props.max}
            pattern={props.pattern}
            // value={value}
            // onChange={onChange}
            className="block w-full px-4 py-2 mt-2 text-orange-700 bg-white border rounded-md focus:border-orange-400 focus:ring-orange-300 focus:outline-none focus:ring focus:ring-opacity-40"
        />
    </div>
  )
}