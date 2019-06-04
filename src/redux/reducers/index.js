let user={
    email:null
}

export default (state=user, action)=>{
    switch(action.type){
        case 'SIGNED_IN':
            const email=action.email;
            user={
                email
            }
            return user;
        default:
            return state;
    }
}