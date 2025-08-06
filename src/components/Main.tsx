import React, { useState } from 'react'
import FormControl from './FormControl'
import StudentView from './StudentView'
import { type IData } from '../types'

const Main = () => {
    const [students, setStudents] = useState<IData[]>([])
    const [updateStudent, setUpdateStudent] = useState<IData>({
        id: -1,
        fname: '',
        profession: '',
        gender: ''
    })

    const [fname, setFname] = useState<string>('')
    const [profession, setProfession] = useState<string>('')
    const [gender, setGender] = useState<string>('')


    const handleDelete = (id: number) => {
        setStudents((students) => students.filter((student) => student.id != id))
    }

    const handleUpdate = (student: IData) => {
        setUpdateStudent(student)

        setFname(student.fname);
        setProfession(student.profession);
        setGender(student.gender);
    }

    return (
        <div className="container mx-auto py-10 min-h-screen text-white">
            <FormControl setStudents={setStudents} updateStudent={updateStudent} fname={fname} setFname={setFname} profession={profession} setProfession={setProfession} gender={gender} setGender={setGender} setUpdateStudent={setUpdateStudent} />
            <StudentView students={students} handleDelete={handleDelete} handleUpdate={handleUpdate} />
        </div>
    )
}

export default React.memo(Main)