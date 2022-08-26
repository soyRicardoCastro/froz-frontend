interface Props {
  body: {
    category: string
    title: string
  }
}

function Header ({ category, title }: Props['body']) {
  return (
    <div className='mb-10 ml-10'>
      <p className='text-lg text-gray-400 capitalize'>{category}</p>
      <p className='text-3xl font-bold tracking-tight text-gray-200 capitalize'>
        {title}
      </p>
    </div>
  )
}

export default Header
