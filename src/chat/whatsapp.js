class Chat {
    hiding = document.querySelector('#hiding')
    username = document.cookie.match(/username=(.+?)(;|$)/)?.[1]
    photo_url = document.cookie.match(/photo_url=(.+?)(;|$)/)?.[1]
    date = document.cookie.match(/date=(.+?)(;|$)/)?.[1]
    bodyUsername = document.querySelector('#bodyUsername')
    sideBar = document.querySelector('.sideBar')
    allUsers = document.querySelector('.compose-sideBar')
    allMessages = document.querySelector('#conversation')
    replyRow = document.querySelector('.reply')
    search = document.querySelector('#searchText')
    allUserSearch = document.querySelector('#composeText')
    setIntervall
    // sendIcon = document.querySelector('.fa-send')

    async usersFunc(){
        try{
            const api = await fetch('http://192.168.1.67:5000/users')
            const json = await api.json()
            return Promise.resolve(json)
        }catch(error){
            return Promise.reject(error)
        }
    }

    async getMessages(){
        try{
            const api = await fetch('http://192.168.1.67:5000/messages')
            const json = await api.json()
            return Promise.resolve(json)
        }catch(error){
            return Promise.reject(error)
        }
    }

    async getWriteUsers(){
        try{
            const api = await fetch('http://192.168.1.67:5000/writeusers')
            const json = await api.json()
            return Promise.resolve(json)
        }catch(error){
            return Promise.reject(error)
        }
    }
    
    async test(){
        let users = await this.usersFunc()
        if (!this.username || !users.length) {
            window.location = '/'
        } 
    }
    
    async render(){
        try {
            
            const users = await  this.usersFunc()
            let writeUsers = await this.getWriteUsers()
            this.allUsers.innerHTML = ''
            this.sideBar.innerHTML = ''

            for (let i = 0; i < writeUsers.length; i++) {
                if (writeUsers[i]['who'] == this.username) {
                    for (let j = 0; j < writeUsers[i]['allChats'].length; j++) {
                        let el = writeUsersHTML(writeUsers[i]['allChats'][j])
                        this.sideBar.innerHTML += el
                    }
                }
            }

            for(let user of users){ 
                if (user['username'] != this.username) {
                    let elem = data(user)
                    this.allUsers.innerHTML += elem
                }else{
                    document.cookie = `date=${user.date}`
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    async renderMessage(reciever, allDate){
        let getAllMessages = await this.getMessages()
        this.allMessages.innerHTML = ''
        getAllMessages.forEach((e, i) => {
            let who = getAllMessages[i]['who'].split('-')
            if ((reciever.trim() == who[0] || reciever.trim() == who[1]) && (this.username == who[0] || this.username == who[1])) {
                for (let j = 0; j < getAllMessages[i].messages.length; j++) {
                    if (getAllMessages[i].messages[j].username == reciever.trim()) {
                        let mess = receiverMessage(getAllMessages[i].messages[j].message, allDate)
                        this.allMessages.innerHTML += mess
                    }else if(getAllMessages[i].messages[j].username == this.username){
                        let mess = senderMessage(getAllMessages[i].messages[j].message, allDate)
                        this.allMessages.innerHTML += mess
                    }
                }
            }
        });
    }

    async sendMessage(fromUsername, toUsername, comment, date, photo_url, hidingDate){
        fromUsername = fromUsername.trim()
        toUsername = toUsername.trim()
        comment = comment.trim()
        let whoUser = `${fromUsername}-${toUsername}`
        let api = await fetch('http://192.168.1.67:5000/sendmessage', {
                method: 'POST',
                body: JSON.stringify({
                    who: whoUser,
                    fromUsername: fromUsername,
                    comment: comment,
                    date: date
                })
            })
        api = await api.json()
        if (api) {
            this.headingUsers(fromUsername, toUsername, photo_url, hidingDate)
        }
    }

    async headingUsers(who, username, photo_url, date){
        let api = await fetch('http://192.168.1.67:5000/addwriteusers', {
                method: 'POST',
                body: JSON.stringify({
                    who: who,
                    username: username,
                    photo_url: photo_url,
                    date: date
                })
            })
        api = await api.json()

        if (api) {
            let json1 = await fetch('http://192.168.1.67:5000/addwriteusers', {
                method: 'POST',
                body: JSON.stringify({
                    who: username,
                    username: who,
                    photo_url: photo_url,
                    date: date
                })
            })
        json1 = await json1.json()
        }
    }

    async writingSearchUsers(){
		this.sideBar.innerHTML = ''
		let users = await this.getWriteUsers()
		for(let user of users){
            user.allChats.forEach((e,i) => {
                if(user.allChats[i].username.toLowerCase().includes(this.search.value)){
                    let el = writeUsersHTML(user.allChats[i])
                    this.sideBar.innerHTML += el
                }
            });
		}
	}

    async allSearchUsers(){
		this.allUsers.innerHTML = ''
		let users = await this.usersFunc()
		for(let user of users){
            if(user.username.toLowerCase().includes(this.allUserSearch.value)){
                let el = writeUsersHTML(user)
                this.allUsers.innerHTML += el
            }
		}
	}

    async deleteUser(who, username) {

    }
}

// start app
const obj = new Chat()
obj.test()
obj.render()


// render user profile
let el = bodyUsernameHTML(obj.username, obj.photo_url)
obj.bodyUsername.innerHTML = el

// Message's date
let parent = obj.allUsers
let writeChatParent = obj.sideBar
let currentDate = new Date().getDate() + "/" + new Date().getMonth() + "/" + new Date().getFullYear()
let d = new Date()
let currentHour = d.toLocaleTimeString();
let allDate  = `${currentDate} ${currentHour}`
// console.log(allDate);


// if onclick users render top body
let hidingUsername = ''
let hidingPhoto_url = ''
let hidingTime = ''
parent.addEventListener('click', e => {
    const sidebarBody = e.target.closest('.sideBar-body')
  
    hidingPhoto_url = sidebarBody.querySelector('img').src;
    hidingUsername = sidebarBody.querySelector('.name-meta').textContent;
    hidingTime = sidebarBody.querySelector('.time-meta').textContent;
    let element = writing(hidingUsername, hidingPhoto_url)
    obj.hiding.innerHTML = element
    obj.renderMessage(hidingUsername, allDate)
    obj.replyRow.innerHTML = rowReply
    let sendIcon = document.querySelector('.fa-send')
    let comment = document.querySelector('#comment')
    sendIcon.onclick = () =>{
        if (comment.value.trim()) {
            obj.sendMessage(obj.username, hidingUsername, comment.value, allDate, hidingPhoto_url, hidingTime,)
            comment.value = null
        }
    }

    setInterval( async() => {
        obj.renderMessage(hidingUsername, allDate)
    }, 500); 
    
})



writeChatParent.addEventListener('click', e => {
    const sidebarBody = e.target.closest('.sideBar-body2')

    hidingPhoto_url = sidebarBody.querySelector('img').src;
    hidingUsername = sidebarBody.querySelector('.name-meta').textContent;
    let element = writing(hidingUsername, hidingPhoto_url)
    obj.hiding.innerHTML = element
    obj.replyRow.innerHTML = rowReply
    obj.renderMessage(hidingUsername, allDate)
    let sendIcon = document.querySelector('.fa-send')
    let comment = document.querySelector('#comment')

    sendIcon.onclick = () =>{
        if (comment.value.trim()) {
            obj.sendMessage(obj.username, hidingUsername, comment.value, allDate, hidingPhoto_url, hidingTime)
            comment.value = null
        }
    }
    setInterval( async() => {
        obj.renderMessage(hidingUsername, allDate)
    }, 500);

})

// Log out
let logOut = document.querySelector('.glyphicon-log-out')
logOut.onclick = () =>{
    document.cookie = 'username='
    window.location = '/'
}

obj.search.onkeyup = () =>{
    if (obj.search.value.trim()) {
        clearInterval(obj.setIntervall);
        obj.writingSearchUsers()
    }else{
        obj.setIntervall = setInterval( async() => {
            obj.render()
        }, 500); 
    }
}

obj.allUserSearch.onkeyup = () =>{
    if (obj.allUserSearch.value.trim()) {
        clearInterval(obj.setIntervall);
        obj.allSearchUsers()
    }else{
        obj.setIntervall = setInterval( async() => {
            obj.render()
        }, 500); 
    }
}

//delete user
// let trash = document.querySelector('.glyphicon-trash')
// trash.onclick = () =>{
//     obj.deleteUser()
// }

// render to all users setInterval
obj.setIntervall = setInterval( async() => {
    obj.render()
}, 500); 
