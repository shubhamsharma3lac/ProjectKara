import { Message } from './message';

export class ChatHub {
    public id: string;
    public name: string;
    public status: string;
    public messages: Message[]
    public socketId: string;
    
    // ***********************************
    // Application specific properties
    // ***********************************
    public unreadMessageCount: number = 0;

    constructor() {
    }

    static from(obj: any): ChatHub {
        if(!obj){
            return null;
        }
        
        var hub = new ChatHub();
        hub.id = obj._id;
        hub.socketId = obj.socketId;
        hub.name = obj.firstName + " " + obj.lastName;
        hub.status = obj.status;
        hub.messages = new Array<Message>();
        return hub;
    }
}