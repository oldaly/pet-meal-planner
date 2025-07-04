import { Robot } from "./robot";
const robot = new Robot(6);

test('robot move UUDDLR', () => {
        robot.move('UUDDLR');
        expect(robot.getPosition()).toEqual([1,0]);
    });