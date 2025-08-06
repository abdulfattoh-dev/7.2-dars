import React, { useEffect, useState, type Dispatch, type FC, type FormEvent, type SetStateAction } from 'react'
import { type IData } from '../types'

interface IProps {
    setStudents: Dispatch<SetStateAction<IData[]>>
    updateStudent: IData | null
    setUpdateStudent: Dispatch<SetStateAction<IData | null>>
}

const initialState: IData = {
    id: -1,
    fname: '',
    profession: '',
    gender: ''
}

const FormControl: FC<IProps> = ({ setStudents, updateStudent, setUpdateStudent }) => {
    const [formStudent, setFormStudent] = useState<IData>(initialState)

    useEffect(() => {
        if (updateStudent) {
            setFormStudent(updateStudent)
        }
    }, [updateStudent])

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (updateStudent) {
            setStudents((students) =>
                students.map((student) =>
                    student.id === updateStudent.id
                        ? { ...student, ...formStudent }
                        : student
                )
            );

            setUpdateStudent(null);
        } else {
            const newStudent: IData = {
                ...formStudent,
                id: Date.now()
            };

            setStudents((students) => [...students, newStudent]);
        }

        setFormStudent(initialState)
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { value, name } = e.target;
        setFormStudent((p) => ({ ...p, [name]: value }));
    }

    return (
        <div className="mb-10 bg-slate-800 p-6 rounded-xl">
            <h2 className="text-xl mb-4">Create Student</h2>
            <form onSubmit={handleSubmit} className=" grid md:grid-cols-2 gap-4 " action="">
                <input
                    name="fname"
                    value={formStudent.fname}
                    onChange={handleChange}
                    className="border bg-slate-700 border-slate-500 rounded-lg py-2 px-4 "
                    type="text"
                    placeholder="full name"
                />
                <input
                    name="profession"
                    value={formStudent.profession}
                    onChange={handleChange}
                    className="border bg-slate-700 border-slate-500 rounded-lg py-2 px-4 "
                    type="text"
                    placeholder="profession"
                />
                <select
                    name="gender"
                    value={formStudent.gender}
                    onChange={handleChange}
                    className="border bg-slate-700 border-slate-500 rounded-lg py-2 px-4"
                >
                    <option value="" hidden>
                        Select gender
                    </option>
                    <option value="male" className="bg-slate-800">
                        male
                    </option>
                    <option value="female" className="bg-slate-800">
                        female
                    </option>
                </select>
                <button className="border cursor-pointer hover:opacity-60 border-slate-700 rounded-lg py-2 px-4 bg-slate-900">
                    {updateStudent ? "Save" : "Submit"}
                </button>
            </form>
        </div>
    )
}

export default React.memo(FormControl)