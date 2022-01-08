class Users {

    constructor() {
        this.users = [];
    }


    addUser(id, name) {
        let user = { id, name };

        this.users.push(user);

        return this.users;
    }

    getUser(id) {
        return this.users.filter( u => u.id === id)[0];
    }

    getUsers() {
        return this.users;
    }

    getUserByRoom(room) {

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