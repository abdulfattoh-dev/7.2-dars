import React, { useState, type Dispatch, type FC, type FormEvent, type SetStateAction } from 'react'
import { type IData } from '../types'

interface IProps {
    setStudents: Dispatch<SetStateAction<IData[]>>
    updateStudent: IData
}

const FormControl: FC<IProps> = ({ setStudents, updateStudent }) => {
    const [fname, setFname] = useState<string>('')
    const [profession, setProfession] = useState<string>('')
    const [gender, setGender] = useState<string>('')
    // const [editingItem, setEditingItem] = useState(null)

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (updateStudent.id > 0) {
            setFname(updateStudent.fname);
            setProfession(updateStudent.profession);
            setGender(updateStudent.gender);

            setStudents((students) =>
                students.map((student) =>
                    student.id === updateStudent.id
                        ? { ...student, fname, profession, gender }
                        : student
                )
            );

            // setupdateStudent(null);
        } else {
            const newStudent: IData = {
                id: Date.now(),
                fname,
                profession,
                gender
            };

            setStudents((students) => [...students, newStudent]);
        }

        setFname('');
        setProfession('');
        setGender('');
    };

    return (
        <div className="mb-10 bg-slate-800 p-6 rounded-xl">
            <h2 className="text-xl mb-4">Create Student</h2>
            <form onSubmit={handleSubmit} className=" grid md:grid-cols-2 gap-4 " action="">
                <input
                    name="fname"
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                    className="border bg-slate-700 border-slate-500 rounded-lg py-2 px-4 "
                    type="text"
                    placeholder="full name"
                />
                <input
                    name="profession"
                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                    className="border bg-slate-700 border-slate-500 rounded-lg py-2 px-4 "
                    type="text"
                    placeholder="profession"
                />
                <select
                    name="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
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
                    {updateStudent.id > 0 ? "Save" : "Submit"}
                </button>
            </form>
        </div>
    )
}

export default React.memo(FormControl)