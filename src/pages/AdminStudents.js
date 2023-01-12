import '../css/AdminEandS.css';
import axios from "axios";
import { useEffect } from 'react';
import { useState } from 'react';
function AdminStudents() {
    const [data, setData] = useState();
    const [result, setResult] = useState();
    const [search, setSearch] = useState("");
    useEffect(() => {
        axios
            .get('http://localhost:3001/getstudents')
            .then((res) => {
                setData(res.data);
                //console.log(res.data);
            })
            .catch(err => {
                console.error(err);
            });
    }, []);
    function SubmitForm(e) {
        e.preventDefault();
        console.log(search);
        axios
            .post('http://localhost:3001/studentSearch', { search })
            .then((res) => {
                console.log(res.data);
                setResult(res.data);
            })
            .catch(err => {
                console.error(err);
            });
    }
    return (
        <div className='Admin'>
            <form onSubmit={e => SubmitForm(e)}>
                <input required className='Search' placeholder='Enter Student First Name Here' onChange={(e) => setSearch(e.target.value)}></input>
                <button type='submit' className='SearchB'>Search</button>
            </form>
            <br></br>
            <div className='ButtonsA'>
                <a href='/SortBy' className='AdminB'>SortBy:<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="White" className="bi bi-arrow-down" viewBox="0 0 16 14"><path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z" /></svg></a>
                <a href='/newaccount' className='AdminB'>Add New Student+</a>
            </div>
            {(result ? (
                <>
                    {result.map((user, index) => (
                        <div className='Boxs'>
                            <p className='BoxText'>Name: {user.lastname}, {user.firstname}</p>
                            <p className='BoxText'>Points: {user.points}</p>
                            <p className='BoxText'>Grade Level: {user.grade}</p>
                        </div>
                    ))};
                </>
            ) : (
                <>
                    {(data) ? (
                        <>
                            {data.map((user, index) => (
                                <div className='Boxs'>
                                    <p className='BoxText'>Name: {user.lastname}, {user.firstname}</p>
                                    <p className='BoxText'>Points: {user.points}</p>
                                    <p className='BoxText'>Grade Level: {user.grade}</p>    
                                </div>
                            ))}
                        </>
                    ) : (<></>)}
                </>
            ))}          
        </div>
    );
}
export default AdminStudents;