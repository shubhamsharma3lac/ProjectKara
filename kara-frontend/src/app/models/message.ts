export class Message{
    constructor(
        public fromUserId: string, 
        public toUserId: string,
        public content: string,
        public dateSent: Date,
        public dateRecieved: Date,
        public dateReaded: Date){

    }
}