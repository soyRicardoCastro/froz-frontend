import { useState } from 'react'
import { Layout } from '.'
import { CollegeFit } from '../types'
import { states } from '../constants/states'
import { asks } from '../constants/asks'
import { toast } from 'react-toastify'
import axios from '../services/axios'
import { getUser } from '../services'

import useStore from '../store'

export default function MultiForm () {
  const [step, setStep] = useState<number>(0)
  const [data, setData] = useState<CollegeFit>({
    ask1: '',
    ask2: '',
    ask3: '',
    ask4: '',
    ask5: '',
    ask6: [],
    ask7: '',
    ask8: '',
    ask9: '',
    ask10: '',
    ask11: ''
  })

  const { user, setUser } = useStore()

  const [checkedState, setCheckedState] = useState(
    new Array(states.length).fill(false)
  )

  const style = 'w-[50px] h-[50px] rounded-full text-white z-5 relative font-extrabold flex justify-center items-center'
  const btnStyle = 'px-5 py-3 rounded-xl text-white font-bold text-xl bg-lime-500'

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await toast.promise(async () => await axios.put(`/api/users/college-fit/${user?._id}`, data), {
        pending: 'Sending info',
        error: 'Error',
        success: 'Successfully sended'
      })

      await toast.promise(async () => {
        const id = user?._id as string
        const data = await getUser(id)

        setUser(data)
      }, {
        pending: "Updating user",
        error: "Error",
        success: "User updated Successfully"
      })
    } catch (e: any) {
      console.error(e)
      toast.error(e)
    }
  }

  const handleOnChange = (position: number) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);

    const state = states[position]

    if (updatedCheckedState[position] === true)
      return data.ask6.push(state)
    
    if (updatedCheckedState[position] === false) {
      const s: Array<string> = data.ask6.filter((s: string) => s !== state[position])

      data.ask6 = s
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => 
    setData({
      ...data,
      [e.target.name]: e.target.value
    })

  return (
    <Layout
      title='Multi Form'
      category='User'
    >
      <div className='flex justify-between items-center w-[80%] mx-auto relative'>
        <span className='absolute w-full h-[2px] bg-gray-200 z-1' />
        <div className={`${style} ${step === 0 ? 'bg-blue-600' : 'bg-lime-500'}`}>
          1
        </div>

        <div className={`${style} ${step === 1 ? 'bg-blue-600' : 'bg-lime-500'}`}>
          2
        </div>

        <div className={`${style} ${step === 2 ? 'bg-blue-600' : 'bg-lime-500'}`}>
          3
        </div>
      </div>

      <form onSubmit={handleSubmit} className='w-[90%] mx-auto my-20 outline-red-400 flex flex-col'>

        {step === 0 && (
        <>
        <h4 className='my-6 font-bold text-md'>1. {asks[0]}</h4>
        <table className='w-[90%] mx-auto'>
          <tr>
            <th />
            <th className='p-1'>A lot</th>
            <th>Some</th>
            <th>Not much</th>
            <th>Nothing at all</th>
          </tr>
          <tbody>
            <tr>
              <td>Athletic and Academic Scholarships</td>
              <td>
                <input
                  type='radio'
                  value='A lot'
                  name='ask1'
                  onChange={handleChange}
                />
              </td>
              <td>
                <input
                  type='radio'
                  value='Some'
                  name='ask1'
                  onChange={handleChange}
                />
              </td>
              <td>
                <input type='radio' value='Not much' name='ask1' onChange={handleChange} />
              </td>
              <td>
                <input type='radio' value='Nothing at all' name='ask1' onChange={handleChange} />
              </td>
            </tr>

            <tr>
              <td>The Recruitment Proccess</td>
              <td>
                <input type='radio' value='A lot' name='ask2' onChange={handleChange} />
              </td>
              <td>
                <input type='radio' value='Some' name='ask2' onChange={handleChange} />
              </td>
              <td>
                <input type='radio' value='Not much' name='ask2' onChange={handleChange} />
              </td>
              <td>
                <input type='radio' value='Nothing at all' name='ask2' onChange={handleChange} />
              </td>
            </tr>

            <tr>
              <td>College Sports in General</td>
              <td><input type='radio' value='A lot' name='ask3' onChange={handleChange} /></td>
              <td><input type='radio' value='Some' name='ask3' onChange={handleChange} /></td>
              <td><input type='radio' value='Not much' name='ask3' onChange={handleChange} /></td>
              <td><input type='radio' value='Nothing at all' name='ask3' onChange={handleChange} /></td>
            </tr>
          </tbody>
        </table>
        <hr className='mb-8' />

        <h4 className='my-8 font-bold text-md'>2. {asks[1]}</h4>

        <select 
          defaultValue='select'
          className='bg-gray-400 text-white'
          name='ask4'
          onChange={handleChange}
        >
          <option disabled value='select'>- Select a option -</option>
          <option value="Native">Native</option>
          <option value="Advanced">Advanced</option>
          <option value="Basic">Basic</option>
          <option value="Billingual">Billingual</option>
          <option value="Intermediate">Intermediate</option> 
        </select>

        <hr className='mb-6' />

        <h4 className='my-8 font-bold text-md'>3. {asks[2]}</h4>

        <select defaultValue='select' className='bg-gray-400 text-white' name='ask5' onChange={handleChange}>
          <option disabled value='select'>- Select a option -</option>
          <option value="North">North</option>
          <option value="South">South</option>
          <option value="Weast">Weast</option>
          <option value="East">East</option>
        </select>
        </>
        )}

        {step === 1 && (
        <>
        <h4 className='my-8 font-bold text-md'>4. {asks[3]}</h4>
        <ul className='flex flex-wrap w-[90%] mx-auto gap-3'>
        {states.map((state, index) => (
        <li key={index}>
          <div className="toppings-list-item">
            <div className="left-section">
              <input
                type="checkbox"
                id={`custom-checkbox-${index}`}
                name={state}
                value={state}
                checked={checkedState[index]}
                onChange={() => handleOnChange(index)}
              />
              <label htmlFor={`custom-checkbox-${index}`}>{state}</label>
              </div>
          </div>
        </li>
        ))}
        </ul>

        <hr className='mb-6' />

        <h4 className='my-8 font-bold text-md'>5. {asks[4]}</h4>
        <select defaultValue='select' className='bg-gray-400 text-white' name='ask7' onChange={handleChange}>
          <option disabled value='select'>- Select a option -</option>
          <option value="Small City">Small City</option>
          <option value="Medium City">Medium City</option>
          <option value="Big City">Big City</option>
        </select>

        <hr className='mb-6' />

        <h4 className='my-8 font-bold text-md'>6. {asks[5]}</h4>
        <label>
        Very Large (+25.000 students) 
        <input
          type='radio'
          value='Very Large (+25.000 students)'
          name='ask8'
          onChange={handleChange}
        />
        </label>

        <label>
        Large(+15.000 students)
        <input
          type='radio'
          value='Large (+15.000 students)'
          name='ask8'
          onChange={handleChange}
        />
        </label>

        <label>
        Medium(+5000 students)
        <input
          type='radio'
          value='Medium(+5000 students)'
          name='ask8'
          onChange={handleChange}
        />
        </label>

        <label>
        Very Large (+25.000 students)
        <input
          type='radio'
          value='Small (+1000 students)'
          name='ask8'
          onChange={handleChange}
        />
        </label>

        <label>
        Very Large (+25.000 students)
        <input
          type='radio'
          value='Very Small (-1.000 students)'
          name='ask8'
          onChange={handleChange}
        />
        </label>
        </>
        )}

        {step === 2 && (
        <>
          <h4 className='my-8 font-bold text-md'>7. {asks[6]}</h4>
          <label>
          A less selective university that allows me to have more time and less pressure on academics
          <input
            type='radio'
            value='A less selective university that allows me to have more time and less pressure on academics'
            name='ask9'
            onChange={handleChange}
          />
          </label>

          <label>
          A less selective university that allows me to have more time and less pressure on academics
          <input
            type='radio'
            value='A less selective university that allows me to have more time and less pressure on academics'
            name='ask9'
            onChange={handleChange}
          />
          </label>

          <label>
          A less selective university that allows me to have more time and less pressure on academics
          <input
            type='radio'
            value='A less selective university that allows me to have more time and less pressure on academics'
            name='ask9'
            onChange={handleChange}
          />
          </label>

          <hr className='mb-6' />

          <h4 className='my-8 font-bold text-md'>8. {asks[7]}</h4>
          <select defaultValue='select' className='bg-gray-400 text-white' name='ask10' onChange={handleChange}>
            <option disabled value='select'>- Select a option -</option>
            <option value="My family needs a full scholarship">My family needs a full scholarship</option>
            <option value="My family needs a full scholarship">My family needs a full scholarship</option>
            <option value="My family needs a full scholarship">My family needs a full scholarship</option>
          </select>

          <hr className='mb-6' />

          <h4 className='my-8 font-bold text-md'>9. {asks[8]}</h4>
          <select defaultValue='select' className='bg-gray-400 text-white' name='ask11' onChange={handleChange}>
            <option disabled value='select'>- Select a option -</option>
            <option value="Not importanuserst">Not important</option>
            <option value="So important">So important</option>
          </select>
        </>
        )}

        <footer className='flex justify-between w-[200px] items-center mx-auto my-[45px]'>
        {step > 0 && (
          <strong
            className={btnStyle}
            onClick={() => setStep(step - 1)}
          >
            Prev
          </strong>
        )}

        {step < 2 && (
          <strong
            className={btnStyle}
            onClick={() => setStep(step + 1)}
          >
            Next
          </strong>
        )}

        {step === 2 && (
          <input  
            type='submit'
            value='Submit'
            className={btnStyle}
          />
        )}
        </footer>
      </form>
    </Layout>
  )
}
