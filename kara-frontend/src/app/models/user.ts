import { Message } from './message';
import { ChatHub } from './chat-hub';

export class User {
    public id: string;
    public name: string;
    public status: string;
    public firstName: string;
    public lastName: string;
    public hubList: ChatHub[];
    public socketId: string;

    constructor() {
    }

    static from(obj: any): User {
        if(!obj){
            return null;
        }
        
        var user = new User();
        user.id = obj._id;
        user.socketId = obj.socketId;
        user.name = obj.firstName + obj.lastName;
        user.firstName = obj.firstName;
        user.lastName = obj.lastName;
        user.hubList = new Array<ChatHub>();
        return user;
    }
}