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


    const handleDelete = (id: number) => {
        setStudents((students) => students.filter((student) => student.id != id))
    }

    const handleUpdate = (student: IData) => {
        setUpdateStudent(student)
    }

    return (
        <div className="container mx-auto py-10 min-h-screen text-white">
            <FormControl setStudents={setStudents} updateStudent={updateStudent} />
            <StudentView students={students} handleDelete={handleDelete} handleUpdate={handleUpdate} />
        </div>
    )
}

export default React.memo(Main)