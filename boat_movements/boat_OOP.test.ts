import { Boat } from '../boat_movements/boat_OOP'; // adjust if your filename is different

describe('Boat Movement Tests', () => {
    const matrix: boolean[][] = [
        [false, true,  true,  false, false, false],
        [true,  true,  true,  false, false, false],
        [true,  true,  true,  true,  true,  true],
        [false, true,  true,  false, true,  true],
        [false, true,  true,  true,  false, true],
        [false, false, false, false, false, false],
    ];

    const boat = new Boat(matrix);

    test('allows vertical travel on clear path', () => {
        expect(boat.canTravelTo(3, 2, 2, 2)).toBe(true);
    });

    test('returns false when trying to move to the same cell', () => {
        expect(boat.canTravelTo(3, 2, 3, 2)).toBe(false);
    });

    test('returns false when destination is out of bounds', () => {
        expect(boat.canTravelTo(3, 2, 6, 2)).toBe(false);
    });
});
