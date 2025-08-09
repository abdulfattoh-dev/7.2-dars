import React, { useEffect, useState, type Dispatch, type FC, type SetStateAction } from 'react'
import maleImage from "../assets/male.png";
import femaleImage from "../assets/female.png";
import { type IData } from '../types';
import { MdTableRows, MdDelete } from "react-icons/md";
import { PiCardsBold } from "react-icons/pi";
import { RiEdit2Fill } from "react-icons/ri";
import CardSkeleton from './ui/CardSkeleton';
import TableSkeleton from './ui/TableSkeleton';

interface IProps {
    students: IData[]
    handleDelete: (id: number) => void
    setUpdateStudent: Dispatch<SetStateAction<IData | null>>
}

const StudentView: FC<IProps> = ({ students, handleDelete, setUpdateStudent }) => {
    const [style, setStyle] = useState<boolean>(JSON.parse(localStorage.getItem('style') || 'true'))

    useEffect(() => {
        localStorage.setItem('style', JSON.stringify(style))
    }, [style])

    return (
        <>
            <div className='flex justify-between items-center mb-4'>
                <h2 className="text-xl">All Students</h2>
                <button onClick={() => setStyle(!style)} className='p-3 rounded-lg bg-slate-700 flex justify-center items-center hover:bg-slate-600'>{style ? <PiCardsBold /> : <MdTableRows />}</button>
            </div>students
            {
                style ? (
                    <div>
                        <table className="w-full text-white bg-slate-700 border border-gray-700 rounded-xl overflow-hidden">
                            <thead className="bg-slate-800 text-white">
                                <tr>
                                    <th className="py-3 px-6 text-left">#</th>
                                    <th className="py-3 px-6 text-left">Full Name</th>
                                    <th className="py-3 px-6 text-left">Profession</th>
                                    <th className="py-3 px-6 text-left">Gender</th>
                                    <th>Update</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            {
                                students.length == 0 ? <TableSkeleton /> : (
                                    <tbody>
                                        {
                                            students?.map((student, index) => (
                                                <tr key={student.id} className="border-b hover:bg-slate-600">
                                                    <td className="py-3 px-6">{index + 1}</td>
                                                    <td className="py-3 px-6">{student.fname}</td>
                                                    <td className="py-3 px-6">{student.profession}</td>
                                                    <td className="py-3 px-6">{student.gender}</td>
                                                    <td onClick={() => setUpdateStudent(student)} className="text-center"><button><RiEdit2Fill /></button></td>
                                                    <td onClick={() => handleDelete(student.id)} className="text-center"><button><MdDelete /></button></td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                )
                            }
                        </table>
                    </div>
                ) : (
                    <>
                        {
                            students.length == 0 ? <CardSkeleton /> : (
                                <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-3">
                                    {
                                        students?.map((student) => (
                                            <div key={student.id} className="p-4 bg-slate-800 rounded-xl">
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
                                                        <button onClick={() => setUpdateStudent(student)} className="py-0.5 border rounded-lg text-sm flex-1 text-green-700">
                                                            Update
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            )
                        }
                    </>
                )
            }
        </>
    )
}

export default React.memo(StudentView)