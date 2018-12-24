import { Message } from './message';

export class User{
    public id: string;
    public name: string;
    public status: string;
    public firstName: string;
    public lastName: string;
    public friendListId: [string];
    public friendList: [User]
    public chats: [Message]
    
    constructor(){
    }
}