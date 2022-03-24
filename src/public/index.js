let usernamein = document.querySelector('.username-signin')
let passwordin = document.querySelector('.password-signin')
let usernameup = document.querySelector('.username-signup')
let passwordup = document.querySelector('.password-signup')
let age = document.querySelector('.age')
let gender = document.querySelector('#gender')
let signup = document.querySelector('.sign-up')
let signin = document.querySelector('.sign-in')

async function usersFunc(){
    try{
        let api = await fetch('https://whatsapp-chatt.herokuapp.com/users')
        api = await api.json()
        return api
    }catch(error){
        console.log(error.message);
    }
}

async function test(){
    let users = await usersFunc()
    var results = document.cookie.match(/username=(.+?)(;|$)/)?.[1]
    console.log(results);
    if (results && users.length) {
        window.location = '/whatsapp'
    } 
}

test()


signin.onclick = async function (event) {
    event.preventDefault()
    log.textContent = ``
    if (usernamein.value.length > 30 || passwordin.value.trim().length < 3 || passwordin.value.trim().length < 5) {
        console.log('valid');
        log.textContent = `Invalid username or password`
        event.preventDefault()
        return
    }else{
        let count = 0
        var users = await usersFunc()
        for (let i = 0; i < users.length; i++) {
            if (users[i]['username'].toLowerCase() == usernamein.value.toLowerCase() && users[i]['password'] == passwordin.value) {
                count = 1
                break
            }
        }
        let photo = ''

        for (let i = 0; i < users.length; i++) {
            if (users[i]['username'].toLowerCase() == usernamein.value.toLowerCase()) {
                photo = users[i]['photo_url']
                break
            }
        }

        if (count == 1) {
            document.cookie = `photo_url=${photo}`; 
            document.cookie = `username=${usernamein.value}`; 
            window.location = '/whatsapp'
        }else{
            console.log('else');
            log.textContent = `Invalid username or password`
            return
        }
    }
}


signup.onclick = async function (event) {
    event.preventDefault()
    reg.textContent = ' '
    let count = 0
    var users = await usersFunc()
    for (let i = 0; i < users.length; i++) {
        if (users[i]['username'].toLowerCase() == usernameup.value.toLowerCase()) {
            count = 1
            break
        }
    }

    if (count == 1) {
        reg.textContent = 'This username is already exists!'
        return
    }

    if (usernameup.value.trim().length > 30 || usernameup.value.trim().length < 3) {
        reg.textContent = 'username\'s length must be less than 30 characters and more than 3 characters '
    }else if(passwordup.value.trim().length > 30 || passwordup.value.trim().length < 6){
        reg.textContent = 'password\'s length must be less than 30 characters and more than 6 characters '
    }else{
        try{
            let photo = gender.value == 'male' ? 'https://www.bootdey.com/img/Content/avatar/avatar4.png' : 'https://www.bootdey.com/img/Content/avatar/avatar3.png'
            let api = await fetch('https://whatsapp-chatt.herokuapp.com/adduser', {
                method: 'POST',
                body: JSON.stringify({
                    username: usernameup.value,
                    age: age.value,
                    gender: gender.value,
                    password: passwordup.value,
                    photo_url: photo
                })
            })
            api = await api.json()
            console.log(api);
            if (api) {
                document.cookie = `username=${usernameup.value}`; 
                document.cookie = `photo_url=${photo}`; 
                window.location = '/whatsapp'

            }else{
                reg.textContent = 'Invalid input!'
            }
        }catch(error){
            console.log(error.message);
        }
    }
}