class Users {

    constructor() {
        this.users = [];
    }


    addUser(id, name, room) {
        let user = { id, name, room };

        this.users.push(user);

        return this.users;
    }

    getUser(id) {
        return this.users.filter( u => u.id === id)[0];
    }

    getUsers() {
        return this.users;
    }

    getUsersByRoom(room) {
        return this.users.filter(u => u.room === room);
    }

    deleteUser(id) {

       let user = this.getUser(id); 

       this.users =  this.users.filter( u => u.id !== id);

       return user;
    }

}


module.exports = {
    Users
};