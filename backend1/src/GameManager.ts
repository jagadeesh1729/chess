import { Game } from "./Game";
import WebSocket from "ws";
import { INIT_GAME, MOVE } from "./messeges";
export class GameManager{
    private games:Game[];
    private pendingGameId: WebSocket | null;
    private users: WebSocket[];
    constructor(){
        this.games=[];
        this.pendingGameId = null;
        this.users = [];

    }
    addUser(socket:WebSocket){
        this.users.push(socket);
        this.addHandler(socket)


    }
    removeUser(socket:WebSocket){
        this.users=this.users.filter(user=>user!=socket)
    }
    private addHandler(socket:WebSocket){
        socket.on("message",(data)=>{
            const message=JSON.parse(data.toString());
            if(message.type==INIT_GAME){
                if(this.pendingGameId){
                   const g=new Game(this.pendingGameId,socket);
                   this.games.push(g);
                   this.pendingGameId=null;

                }
                else{
                    this.pendingGameId=socket
                }
            }
            if(message.type==MOVE){
                const game=this.games.find(i=>i.player1=== socket|| i.player2===socket);
                if(game){
                    game.makeMove(socket,message.payload.move)
                }
            }
        })
    }
}