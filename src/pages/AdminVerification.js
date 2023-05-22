import axios from "axios";
import { useEffect } from 'react';
import { useState } from 'react';
function AdminVerification() {
    const [data, setData] = useState();
    const [search, setSearch] = useState(false);
    useEffect(() => {
        axios
            .get('http://localhost:3001/getrequests')
            .then((res) => {
                setData(res.data);
            })
            .catch(err => {
                console.error(err);
            });
    }, []);
    function Confirm(request) {
        console.log(request);
        if (data) {
            axios
                .post('http://localhost:3001/addPoints', { request })
                .then((res) => {
                    let Message = res.data.message;
                    console.log(Message);
                    if (res.data.message) {
                        document.getElementById("message").innerText = Message;
                    }
                    window.location.reload();
                })
                .catch(err => {
                    console.error(err);
                });
        }
    }
    function Decline(request) {
        console.log(data);
        if (data) {
            axios
                .post('http://localhost:3001/declineRequest', { request })
                .then((res) => {
                    let Message = res.data.message;
                    console.log(Message);
                    if (res.data.message) {
                        document.getElementById("message").innerText = Message;
                    }
                    window.location.reload();
                })
                .catch(err => {
                    console.error(err);
                });
        }
    }
    function getRequests() {
        if (data) {
            return (
                <>
                    {data.map((request, index) => (
                        <div className='requests' key={index}>
                            <p>{request.Student} requested to join {request.Event} for {request.Points} points.</p>
                            <p className="requestdate">{request.Date}</p>
                            <a className='AdminR' onClick={() => Confirm(request)}>Confirm</a>
                            <a className='AdminR' onClick={() => Decline(request)}>Decline</a>
                        </div>
                    ))}
                </>
            )
        }
    }
    return (
        <div id="AdminVerification">
            <form>
                <input required className='Search2' placeholder='Search by Username' onChange={(e) => setSearch(e.target.value)} />
            </form>
            <div id="message"></div>
            {getRequests()}
        </div>
    );
};
export default AdminVerification;