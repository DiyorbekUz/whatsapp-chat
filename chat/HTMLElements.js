const data = ({username, photo_url, date}) =>{
    return `
<div class="row sideBarBody sideBar-body">
            <div class="col-sm-3 col-xs-3 sideBar-avatar">
              <div class="avatar-icon">
                <img src=${photo_url}>
              </div>
            </div>
            <div class="col-sm-9 col-xs-9 sideBar-main">
              <div class="row">
                <div class="col-sm-8 col-xs-8 sideBar-name">
                  <span class="name-meta">${username}
                </span>
                </div>
                <div class="col-sm-4 col-xs-4 pull-right sideBar-time">
                  <span class="time-meta pull-right">${date}
                </span>
                </div>
              </div>
            </div>
          </div>
        `
}

const bodyUsernameHTML = (username, photo_url) =>{
    return `
    <div class="col-sm-3 col-xs-3 heading-avatar">
            <div class="heading-avatar-icon">
              <img src=${photo_url}>
            </div>
          </div>
            <a class="heading-name-meta">${username}</a>
          <div class="col-sm-1 col-xs-1  heading-dot  pull-right">
          <i class="glyphicon glyphicon-log-out pull-right" aria-hidden="true"></i> Log out
          </div>
          <div class="col-sm-2 col-xs-2 heading-compose  pull-right">
            <i class="fa fa-comments fa-2x  pull-right" aria-hidden="true"></i>
          </div>`
}

const writing = (username, photo_url) => {
  return `<div class="col-sm-2 col-md-1 col-xs-3 heading-avatar">
  <div class="heading-avatar-icon">
    <img src=${photo_url}>
  </div>
</div>
<div class="col-sm-8 col-xs-7 heading-name">
  <a class="heading-name-meta">${username}
  </a>
  <span class="heading-online">Online</span>
</div>
<div class="col-sm-1 col-xs-1  heading-dot pull-right">
          <!-- <i class="glyphicon glyphicon-trash  pull-right" aria-hidden="true"></i> -->
        </div>`
}


const receiverMessage = (text, currDate) =>{
  return `<br>
  <div class="row message-body">
  <div class="col-sm-12 message-main-receiver">
    <div class="receiver">
      <div class="message-text">
      ${text}
      </div>
      <span class="message-time pull-right">
        ${currDate}
      </span>
    </div>
  </div>
</div>`
}

const senderMessage = (text, currDate) =>{
    return `<br>
    <div class="row message-body">
    <div class="col-sm-12 message-main-sender">
      <div class="sender">
        <div class="message-text">
          ${text}
        </div>
        <span class="message-time pull-right">
          ${currDate}
        </span>
      </div>
    </div>
  </div>
</div>`
}


let writeUsersHTML = ({username, photo_url, date}) =>{
    return `<div class="row sideBar-body2">
    <div class="col-sm-3 col-xs-3 sideBar-avatar">
      <div class="avatar-icon">
        <img src=${photo_url}>
      </div>
    </div>
    <div class="col-sm-9 col-xs-9 sideBar-main">
      <div class="row">
        <div class="col-sm-8 col-xs-8 sideBar-name">
          <span class="name-meta">${username}
        </span>
        </div>
        <div class="col-sm-4 col-xs-4 pull-right sideBar-time">
          <span class="time-meta pull-right">${date}
        </span>
        </div>
      </div>
    </div>
  </div>`
}

let rowReply = `<div class="col-sm-1 col-xs-1 reply-emojis">
<i class="fa fa-smile-o fa-2x"></i>
</div>
<div class="col-sm-9 col-xs-9 reply-main">
<textarea class="form-control" rows="1" id="comment"></textarea>
</div>
<div class="col-sm-1 col-xs-1 reply-recording">
<i class="fa fa-microphone fa-2x" aria-hidden="true"></i>
</div>
<div class="col-sm-1 col-xs-1 reply-send">
<i class="fa fa-send fa-2x" aria-hidden="true"></i>`