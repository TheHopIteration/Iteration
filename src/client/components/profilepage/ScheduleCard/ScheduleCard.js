import React, { useState } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'
import './schedulecard.css'

export const ScheduleCard = ({ user, userEvents }) => {
    const today = new Date();
    const [month, setMonth] = useState(today.getMonth());
    const [year, setYear] = useState(today.getFullYear())
    const lastDayThisMonth = new Date(year, month + 1, 0).getDate();

    const months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    const eventsThisMonth = [];
    userEvents.forEach((event) => {
        const eventDate = new Date(event.start_time);
        if (eventDate.getMonth() === month && eventDate.getFullYear() === year) {
            eventsThisMonth.push(parseInt(eventDate.getDate()));
        }
    })
    // console.log('userEvents this month is: ', eventsThisMonth);

    // handle date click on calendar
    // will filter out a list of pulled dates 
    const pickDate = (val) => {
        console.log('DATE: ', val)
    }
    
    return (


        <div className="flex items-center bg-gray-100 justify-center h-full">
            <Calendar onChange={pickDate}/>
            {/* <div className="max-w-sm w-full shadow-lg">
                <div className="md:p-8 p-5 dark:bg-gray-800 bg-white rounded-t">
                    <div className="px-4 flex items-center justify-between">
                        <span tabIndex="0" className="focus:outline-none text-base font-bold dark:text-gray-100 text-gray-800">{months[month]} {year}</span>
                        <div className="flex items-center">
                            <button aria-label="calendar backward" className="focus:text-gray-400 hover:text-gray-400 text-gray-800 dark:text-gray-100"
                                onClick={() => {
                                    if (month === 0) {
                                        setMonth(11);
                                        setYear(year - 1);
                                    } else {
                                        setMonth(month - 1);
                                    }
                                }}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-left" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <polyline points="15 6 9 12 15 18" />
                                </svg>
                            </button>
                            <button aria-label="calendar forward" className="focus:text-gray-400 hover:text-gray-400 ml-3 text-gray-800 dark:text-gray-100"
                                onClick={() => {
                                    if (month === 11) {
                                        setMonth(0);
                                        setYear(year + 1);
                                    } else {
                                        setMonth(month + 1);
                                    }
                                }}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler  icon-tabler-chevron-right" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <polyline points="9 6 15 12 9 18" />
                                </svg>
                            </button>

                        </div>
                    </div>
                    <div className="flex items-center justify-between pt-12 overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th>
                                        <div className="w-full flex justify-center">
                                            <p className="text-base font-medium text-center text-gray-800 dark:text-gray-100">Mo</p>
                                        </div>
                                    </th>
                                    <th>
                                        <div className="w-full flex justify-center">
                                            <p className="text-base font-medium text-center text-gray-800 dark:text-gray-100">Tu</p>
                                        </div>
                                    </th>
                                    <th>
                                        <div className="w-full flex justify-center">
                                            <p className="text-base font-medium text-center text-gray-800 dark:text-gray-100">We</p>
                                        </div>
                                    </th>
                                    <th>
                                        <div className="w-full flex justify-center">
                                            <p className="text-base font-medium text-center text-gray-800 dark:text-gray-100">Th</p>
                                        </div>
                                    </th>
                                    <th>
                                        <div className="w-full flex justify-center">
                                            <p className="text-base font-medium text-center text-gray-800 dark:text-gray-100">Fr</p>
                                        </div>
                                    </th>
                                    <th>
                                        <div className="w-full flex justify-center">
                                            <p className="text-base font-medium text-center text-gray-800 dark:text-gray-100">Sa</p>
                                        </div>
                                    </th>
                                    <th>
                                        <div className="w-full flex justify-center">
                                            <p className="text-base font-medium text-center text-gray-800 dark:text-gray-100">Su</p>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="pt-6">
                                        <div className="px-2 py-2 cursor-pointer flex w-full justify-center"></div>
                                    </td>
                                    <td className="pt-6">
                                        <div className="px-2 py-2 cursor-pointer flex w-full justify-center"></div>
                                    </td>
                                    <td>
                                        <div className="px-2 py-2 cursor-pointer flex w-full justify-center"></div>
                                    </td>
                                    <td className="pt-6">
                                        {eventsThisMonth.includes(1) ? <div className="w-full h-full">
                                            <div className="flex items-center justify-center w-full rounded-full cursor-pointer">
                                                <a role="link" tabIndex="0" className="focus:outline-none  focus:ring-2 focus:ring-offset-2 focus:ring-emerald-700 focus:bg-emerald-600 hover:bg-emerald-600 text-base w-8 h-8 flex items-center justify-center font-medium text-white bg-emerald-500 rounded-full">
                                                    1</a>
                                            </div>
                                        </div> :
                                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                                                <p className="text-base text-gray-500 dark:text-gray-100 font-medium">
                                                    1</p>
                                            </div>}
                                    </td>
                                    <td className="pt-6">
                                        {eventsThisMonth.includes(2) in eventsThisMonth ? <div className="w-full h-full">
                                            <div className="flex items-center justify-center w-full rounded-full cursor-pointer">
                                                <a role="link" tabIndex="0" className="focus:outline-none  focus:ring-2 focus:ring-offset-2 focus:ring-emerald-700 focus:bg-emerald-600 hover:bg-emerald-600 text-base w-8 h-8 flex items-center justify-center font-medium text-white bg-emerald-500 rounded-full">
                                                    2</a>
                                            </div>
                                        </div> :
                                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                                                <p className="text-base text-gray-500 dark:text-gray-100 font-medium">
                                                    2</p>
                                            </div>}
                                    </td>
                                    <td className="pt-6">
                                        {eventsThisMonth.includes(3) in eventsThisMonth ? <div className="w-full h-full">
                                            <div className="flex items-center justify-center w-full rounded-full cursor-pointer">
                                                <a role="link" tabIndex="0" className="focus:outline-none  focus:ring-2 focus:ring-offset-2 focus:ring-emerald-700 focus:bg-emerald-600 hover:bg-emerald-600 text-base w-8 h-8 flex items-center justify-center font-medium text-white bg-emerald-500 rounded-full">
                                                    3</a>
                                            </div>
                                        </div> :
                                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                                                <p className="text-base text-gray-500 dark:text-gray-100 font-medium">
                                                    3</p>
                                            </div>}
                                    </td>
                                    <td className="pt-6">
                                        {eventsThisMonth.includes(4) ? <div className="w-full h-full">
                                            <div className="flex items-center justify-center w-full rounded-full cursor-pointer">
                                                <a role="link" tabIndex="0" className="focus:outline-none  focus:ring-2 focus:ring-offset-2 focus:ring-emerald-700 focus:bg-emerald-600 hover:bg-emerald-600 text-base w-8 h-8 flex items-center justify-center font-medium text-white bg-emerald-500 rounded-full">
                                                    4</a>
                                            </div>
                                        </div> :
                                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                                                <p className="text-base text-gray-500 dark:text-gray-100 font-medium">
                                                    4</p>
                                            </div>}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        {eventsThisMonth.includes(5) ? <div className="w-full h-full">
                                            <div className="flex items-center justify-center w-full rounded-full cursor-pointer">
                                                <a role="link" tabIndex="0" className="focus:outline-none  focus:ring-2 focus:ring-offset-2 focus:ring-emerald-700 focus:bg-emerald-600 hover:bg-emerald-600 text-base w-8 h-8 flex items-center justify-center font-medium text-white bg-emerald-500 rounded-full">
                                                    5</a>
                                            </div>
                                        </div> :
                                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                                                <p className="text-base text-gray-500 dark:text-gray-100 font-medium">
                                                    5</p>
                                            </div>}
                                    </td>
                                    <td>
                                        {eventsThisMonth.includes(6) ? <div className="w-full h-full">
                                            <div className="flex items-center justify-center w-full rounded-full cursor-pointer">
                                                <a role="link" tabIndex="0" className="focus:outline-none  focus:ring-2 focus:ring-offset-2 focus:ring-emerald-700 focus:bg-emerald-600 hover:bg-emerald-600 text-base w-8 h-8 flex items-center justify-center font-medium text-white bg-emerald-500 rounded-full">
                                                    6</a>
                                            </div>
                                        </div> :
                                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                                                <p className="text-base text-gray-500 dark:text-gray-100 font-medium">
                                                    6</p>
                                            </div>}
                                    </td>
                                    <td>
                                        {eventsThisMonth.includes(7) ? <div className="w-full h-full">
                                            <div className="flex items-center justify-center w-full rounded-full cursor-pointer">
                                                <a role="link" tabIndex="0" className="focus:outline-none  focus:ring-2 focus:ring-offset-2 focus:ring-emerald-700 focus:bg-emerald-600 hover:bg-emerald-600 text-base w-8 h-8 flex items-center justify-center font-medium text-white bg-emerald-500 rounded-full">
                                                    7</a>
                                            </div>
                                        </div> :
                                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                                                <p className="text-base text-gray-500 dark:text-gray-100 font-medium">
                                                    7</p>
                                            </div>}
                                    </td>
                                    <td>
                                        {eventsThisMonth.includes(8) ? <div className="w-full h-full">
                                            <div className="flex items-center justify-center w-full rounded-full cursor-pointer">
                                                <a role="link" tabIndex="0" className="focus:outline-none  focus:ring-2 focus:ring-offset-2 focus:ring-emerald-700 focus:bg-emerald-600 hover:bg-emerald-600 text-base w-8 h-8 flex items-center justify-center font-medium text-white bg-emerald-500 rounded-full">8</a>
                                            </div>
                                        </div> :
                                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                                                <p className="text-base text-gray-500 dark:text-gray-100 font-medium">8</p>
                                            </div>}
                                    </td>
                                    <td>
                                        {eventsThisMonth.includes(9) ? <div className="w-full h-full">
                                            <div className="flex items-center justify-center w-full rounded-full cursor-pointer">
                                                <a role="link" tabIndex="0" className="focus:outline-none  focus:ring-2 focus:ring-offset-2 focus:ring-emerald-700 focus:bg-emerald-600 hover:bg-emerald-600 text-base w-8 h-8 flex items-center justify-center font-medium text-white bg-emerald-500 rounded-full">
                                                    9</a>
                                            </div>
                                        </div> :
                                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                                                <p className="text-base text-gray-500 dark:text-gray-100 font-medium">
                                                    9</p>
                                            </div>}
                                    </td>
                                    <td>
                                        {eventsThisMonth.includes(10) ? <div className="w-full h-full">
                                            <div className="flex items-center justify-center w-full rounded-full cursor-pointer">
                                                <a role="link" tabIndex="0" className="focus:outline-none  focus:ring-2 focus:ring-offset-2 focus:ring-emerald-700 focus:bg-emerald-600 hover:bg-emerald-600 text-base w-8 h-8 flex items-center justify-center font-medium text-white bg-emerald-500 rounded-full">
                                                    10</a>
                                            </div>
                                        </div> :
                                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                                                <p className="text-base text-gray-500 dark:text-gray-100 font-medium">
                                                    10</p>
                                            </div>}
                                    </td>
                                    <td>
                                        {eventsThisMonth.includes(11) ? <div className="w-full h-full">
                                            <div className="flex items-center justify-center w-full rounded-full cursor-pointer">
                                                <a role="link" tabIndex="0" className="focus:outline-none  focus:ring-2 focus:ring-offset-2 focus:ring-emerald-700 focus:bg-emerald-600 hover:bg-emerald-600 text-base w-8 h-8 flex items-center justify-center font-medium text-white bg-emerald-500 rounded-full">
                                                    11</a>
                                            </div>
                                        </div> :
                                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                                                <p className="text-base text-gray-500 dark:text-gray-100 font-medium">
                                                    11</p>
                                            </div>}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        {eventsThisMonth.includes(12) ? <div className="w-full h-full">
                                            <div className="flex items-center justify-center w-full rounded-full cursor-pointer">
                                                <a role="link" tabIndex="0" className="focus:outline-none  focus:ring-2 focus:ring-offset-2 focus:ring-emerald-700 focus:bg-emerald-600 hover:bg-emerald-600 text-base w-8 h-8 flex items-center justify-center font-medium text-white bg-emerald-500 rounded-full">
                                                    12</a>
                                            </div>
                                        </div> :
                                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                                                <p className="text-base text-gray-500 dark:text-gray-100 font-medium">
                                                    12</p>
                                            </div>}
                                    </td>
                                    <td>
                                        {eventsThisMonth.includes(13) ? <div className="w-full h-full">
                                            <div className="flex items-center justify-center w-full rounded-full cursor-pointer">
                                                <a role="link" tabIndex="0" className="focus:outline-none  focus:ring-2 focus:ring-offset-2 focus:ring-emerald-700 focus:bg-emerald-600 hover:bg-emerald-600 text-base w-8 h-8 flex items-center justify-center font-medium text-white bg-emerald-500 rounded-full">
                                                    13</a>
                                            </div>
                                        </div> :
                                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                                                <p className="text-base text-gray-500 dark:text-gray-100 font-medium">
                                                    13</p>
                                            </div>}
                                    </td>
                                    <td>
                                        <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                                            <p className="text-base text-gray-500 dark:text-gray-100 font-medium">14</p>
                                        </div>
                                    </td>
                                    <td>
                                        {eventsThisMonth.includes(14) ? <div className="w-full h-full">
                                            <div className="flex items-center justify-center w-full rounded-full cursor-pointer">
                                                <a role="link" tabIndex="0" className="focus:outline-none  focus:ring-2 focus:ring-offset-2 focus:ring-emerald-700 focus:bg-emerald-600 hover:bg-emerald-600 text-base w-8 h-8 flex items-center justify-center font-medium text-white bg-emerald-500 rounded-full">
                                                    14</a>
                                            </div>
                                        </div> :
                                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                                                <p className="text-base text-gray-500 dark:text-gray-100 font-medium">
                                                    14</p>
                                            </div>}
                                    </td>
                                    <td>
                                        {eventsThisMonth.includes(15) ? <div className="w-full h-full">
                                            <div className="flex items-center justify-center w-full rounded-full cursor-pointer">
                                                <a role="link" tabIndex="0" className="focus:outline-none  focus:ring-2 focus:ring-offset-2 focus:ring-emerald-700 focus:bg-emerald-600 hover:bg-emerald-600 text-base w-8 h-8 flex items-center justify-center font-medium text-white bg-emerald-500 rounded-full">
                                                    15</a>
                                            </div>
                                        </div> :
                                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                                                <p className="text-base text-gray-500 dark:text-gray-100 font-medium">
                                                    15</p>
                                            </div>}
                                    </td>
                                    <td>
                                        <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                                            <p className="text-base text-gray-500 dark:text-gray-100">17</p>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                                            <p className="text-base text-gray-500 dark:text-gray-100">18</p>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                                            <p className="text-base text-gray-500 dark:text-gray-100 font-medium">19</p>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                                            <p className="text-base text-gray-500 dark:text-gray-100 font-medium">20</p>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                                            <p className="text-base text-gray-500 dark:text-gray-100 font-medium">21</p>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                                            <p className="text-base text-gray-500 dark:text-gray-100 font-medium">22</p>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                                            <p className="text-base text-gray-500 dark:text-gray-100 font-medium">23</p>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                                            <p className="text-base text-gray-500 dark:text-gray-100">24</p>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                                            <p className="text-base text-gray-500 dark:text-gray-100">25</p>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                                            <p className="text-base text-gray-500 dark:text-gray-100 font-medium">26</p>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                                            <p className="text-base text-gray-500 dark:text-gray-100 font-medium">27</p>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                                            <p className="text-base text-gray-500 dark:text-gray-100 font-medium">28</p>
                                        </div>
                                    </td>
                                    {lastDayThisMonth >= 29 && (<td>
                                        <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                                            <p className="text-base text-gray-500 dark:text-gray-100 font-medium">29</p>
                                        </div>
                                    </td>)}
                                    {lastDayThisMonth >= 30 && (<td>
                                        <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                                            <p className="text-base text-gray-500 dark:text-gray-100 font-medium">30</p>
                                        </div>
                                    </td>)}
                                    {lastDayThisMonth >= 31 && (<td>
                                        <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                                            <p className="text-base text-gray-500 dark:text-gray-100 font-medium">31</p>
                                        </div>
                                    </td>)}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div> */}
        </div>
    )
}
