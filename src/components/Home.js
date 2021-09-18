import React from 'react'

function Home({user}) {

    
    
    return (
        <>
            <h1>Welcome <span class="badge bg-secondary">{user.first_name} {user.last_name}!!</span></h1>
            
            <img src="https://images.pexels.com/photos/2432221/pexels-photo-2432221.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" class="rounded float-start img-thumbnail" alt="wereopen"></img>
            <img src="https://images.pexels.com/photos/1884579/pexels-photo-1884579.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" class="rounded float-end img-thumbnail" alt="clothes"></img>
            <img src="https://images.pexels.com/photos/2434049/pexels-photo-2434049.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" class="rounded mx-auto d-block img-thumbnail" alt="lady"></img>
        </>
    )
}

export default Home
