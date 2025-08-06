import React, { type FC } from 'react'
import maleImage from "../assets/male.png";
import femaleImage from "../assets/female.png";
import { type IData } from '../types';

interface IProps {
    students: IData[]
    handleDelete: (id: number) => void
    handleUpdate: (student: IData) => void
}

const StudentView: FC<IProps> = ({ students, handleDelete, handleUpdate }) => {
    return (
        <>
            <div>
                <h2 className="text-xl mb-4">All Students</h2>
            </div>
            <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-3">
                {
                    students?.map((student) => (
                        <div key={student.id} className="p-4 bg-slate-800 rounded-xl ">
                            <div className="relative">
                                <img
                                    className="size-40 object-cover mx-auto rounded-full"
                                    src={student.gender == "male" ? maleImage : femaleImage}
                                    alt=""
                                />
                            </div>
                            <div className="text-center mt-4">
                                <h3 className="font-bold text-xl">{student.fname}</h3>
                                <p className="my-2 text-gray-500">{student.profession}</p>

                                <div className="flex gap-2 mt-4">
                                    <button onClick={() => handleDelete(student.id)} className="py-0.5 border rounded-lg text-sm flex-1 text-red-500">
                                        Delete
                                    </button>
                                    <button onClick={() => handleUpdate(student)} className="py-0.5 border rounded-lg text-sm flex-1 text-green-700">
                                        Update
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default React.memo(StudentView)