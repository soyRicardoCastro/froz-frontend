import { HTMLInputTypeAttribute } from 'react'

interface Props {
  body: {
    type: HTMLInputTypeAttribute
    placeholder: string
    id: string
    label: string
  }
}

function Input ({ type, placeholder, id, label, ...props }: Props['body']) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <div className='w-full my-2 rounded-2xl bg-gray-200 px-4 ring-2 ring-gray-100 focus-within:ring-green-400 text-gray-900'>
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          autoComplete='off'
          required
          className='my-3 w-full border-none bg-transparent outline-none focus:outline-none'
          {...props}
        />
      </div>
    </>
  )
}

export default Input
