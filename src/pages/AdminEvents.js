import '../css/AdminEandS.css';
function AdminEvents() {
    return (
        <div className='Admin'>
            <input required className='Search' placeholder='Enter Event Name Here'></input>
            <a href='/Search' className='SearchB'>Search</a>
            <br></br>
            <div className='ButtonsA'>
                <a href='/SortBy' className='AdminB'>SortBy:<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="White" class="bi bi-arrow-down" viewBox="0 0 16 14"><path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z" /></svg></a>
                <a href='/AddEvent' className='AdminB'>Add New Event+</a>
            </div>
            <div className='Boxs'> 
                <img src='' alt='StudentImg' width='100%' height='100%'></img>
                <p className='BoxText'>Event Name: </p>
                <p className='BoxText'>Point Amount: </p>
                <p className='BoxText'>Event Bio: </p>
            </div>
        </div>
    );
}
export default AdminEvents;