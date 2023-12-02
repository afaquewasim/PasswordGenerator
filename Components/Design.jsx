import { useState, useCallback, useEffect, useRef } from 'react'

const Design = () => {
    const [length, setLength] = useState(8)
    const [numAllowed, setNumAllowed] = useState(false)
    const [charAllowed, setCharAllowed] = useState(false)
    const [password, setPassword] = useState("")

    const passwordRef = useRef(null)

    const passwordGenerator = useCallback(() => {
        let pass = ""
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnoprstuvwxyz"

        if (numAllowed) str += "0123456789"
        if (charAllowed) str += "!@#$%^&*_-"

        for (let i = 0; i <= length; i++) {
            let char = Math.floor(Math.random() * str.length + 1)
            pass += str.charAt(char)

        }

        setPassword(pass)

    }, [length, numAllowed, charAllowed, setPassword])

    const copyPassToClip = useCallback(()=>{
        passwordRef.current?.select()
        window.navigator.clipboard.writeText(password)
    }, [password])
    useEffect(() => {
        passwordGenerator()
    }, [length, numAllowed, charAllowed, passwordGenerator])

    return (
        <>
            <div className='w-full max-w-md mx-auto shadow-md rounded-lg py-10 px-4 my-8 text-orange-500 bg-slate-500'>
                <div className='flex shadow rounded-lg overflow-hidden mb-4'>
                    <input
                        type="text"
                        value={password}
                        className='outline-none w-full py-2 px-3'
                        placeholder='Password'
                        readOnly
                        ref={passwordRef}
                    />
                    <button
                        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
                        onClick={copyPassToClip}
                    >
                        Copy
                    </button>
                </div>
                <div className='flex text-sm gap-x-3'>
                    <div className='flex items-center gap-x-2'>
                        <input
                            className='cursor-pointer'
                            type="range"
                            min={8}
                            max={50}
                            value={length}
                            onChange={(e) => { setLength(e.target.value) }}
                        />
                        <label className='text-black font-semibold'>Length:{length}</label>
                    </div>
                    <div className='flex items-center gap-x-1'>
                        <input
                            type="checkbox"
                            defaultChecked={numAllowed}
                            id='numInp'
                            onChange={() => {
                                setNumAllowed((prev) => !prev)
                            }}
                        />
                        <label className='text-black font-semibold'>Number</label>
                    </div>
                    <div className='flex items-center gap-x-1'>
                        <input
                            type="checkbox"
                            defaultChecked={charAllowed}
                            id='numInp'
                            onChange={() => {
                                setCharAllowed((prev) => !prev)
                            }}
                        />
                        <label className='text-black font-semibold'>Charecter</label>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Design
