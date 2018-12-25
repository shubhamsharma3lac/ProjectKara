export class Message{
    public id: string;
    public fromUserId: string;
    public toUserId: string;
    public content: string;
    public dateSent: Date;
    public dateRecieved: Date;
    public dateReaded: Date;
    public styles: any;

    constructor(){
    }

    static from(obj: any): Message {
        if(!obj){
            return null;
        }
        
        var message = new Message();
        message.id = obj._id;
        message.fromUserId = obj.fromUserId;
        message.toUserId = obj.toUserId;
        message.content = obj.content;
        message.dateSent = obj.dateSent;
        message.dateRecieved = obj.dateRecieved;
        message.dateReaded = obj.dateReaded;
        return message;
    }
}