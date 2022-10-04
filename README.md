post api
url - http://ec2-3-83-120-234.compute-1.amazonaws.com:8080/detective/data?userName=de
response - {
"success": true,
"data": "bd7jF"
}

Tasks : 1. establish socket connection http://ec2-3-83-120-234.compute-1.amazonaws.com:8080/ws
Host 1. subscribe to topic /chatroom/${invite-code}
     2. publish user /app/join -> payload -> {inviteCode:string, id:number, senderName:string}
  Join:
     1. post api
      - http://ec2-3-83-120-234.compute-1.amazonaws.com:8080/user/getId?inviteCode=${invite-code}
response - {
"success": true,
"data": {user id}
} 2. subscribe to topic /chatroom/${invite-code} 3. publish user /app/join -> payload -> {inviteCode:string, id:number, senderName:string}

Socket response:
userList: user[{ senderName:string, status:READY|NOT_READY, isOwner:boolean, id: number}]
gameStatus: STARTED|NOT_STARTED;
gameLocation:number
