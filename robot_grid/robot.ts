export class Robot{
    private x: number;
    private y: number;
    private gridSize: number;
    
    constructor(gridSize: number){
        this.x = 0;
        this.y=0;
        this.gridSize = gridSize;
    }
    move(instructions: string){
        for (const char of instructions)
            switch (char){
                case('U'): 
                    if (this.y < this.gridSize) this.y++;
                    break;
                case('D'):
                    if (this.y > 0) this.y--;
                    break;
                case('L'):
                    if (this.x > 0) this.x--;
                    break;
                case('R'): 
                    if (this.x < this.gridSize) this.x++;
                    break;
        
        
        }

    }

    getPosition(): [number, number]{
        return [this.x, this.y];
    }

}

function main(){
    const robot = new Robot(5);
    robot.move('UUDDLR');
    console.log(robot.getPosition());
}

main();