import React, { useEffect, useState } from 'react'
import FormControl from './FormControl'
import StudentView from './StudentView'
import { type IData } from '../types'

const Main = () => {
    const [students, setStudents] = useState<IData[]>(JSON.parse(localStorage.getItem('students') || '[]'))
    const [updateStudent, setUpdateStudent] = useState<IData | null>(null)

    useEffect(() => {
        localStorage.setItem('students', JSON.stringify(students))
    }, [students])

    const handleDelete = (id: number) => {
        setStudents((students) => students.filter((student) => student.id != id))
    }

    return (
        <div className="container mx-auto py-10 min-h-screen text-white">
            <FormControl setStudents={setStudents} updateStudent={updateStudent} setUpdateStudent={setUpdateStudent} />
            <StudentView students={students} handleDelete={handleDelete} setUpdateStudent={setUpdateStudent} />
        </div>
    )
}

export default React.memo(Main)