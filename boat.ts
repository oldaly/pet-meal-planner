function CanTravelTo(gameMatrix : boolean[][], fromRow : number, fromColumn : number, toRow : number, toColumn : number) : boolean
    {
        const rows : number = gameMatrix[0].length;
        const cols : number = gameMatrix[1].length;

        // Check boundaries
        if (fromRow < 0 || fromRow >= rows || toRow < 0 || toRow >= rows 
            || fromColumn < 0 || fromColumn >= cols || toColumn < 0 || toColumn >= cols)
            return false;

        // If no movement, return false
        if (fromRow == toRow && fromColumn == toColumn)
            return false;

        // Start and destination must be water
        if (!gameMatrix[fromRow][fromColumn] || !gameMatrix[toRow][toColumn]) 
            return false;

        // If move is not purely horizontal or vertical, return false
        if (fromRow != toRow && fromColumn != toColumn)
            return false;

        // Vertical move
        if (fromColumn == toColumn)
        {
            let startRow : number = Math.min(fromRow, toRow);
            let endRow : number = Math.max(fromRow, toRow);

            for (let row = startRow; row <= endRow; row++)
            {
                if (!gameMatrix[row][fromColumn])
                    return false;
            }
        }
        // Horizontal move
        else if (fromRow == toRow)
        {
            let startColumn : number = Math.min(fromColumn, toColumn);
            let endColumn : number = Math.max(fromColumn, toColumn);

            for (let col = startColumn; col <= endColumn; col++)
            {
                if (!gameMatrix[fromRow][col])
                    return false;
            }
        }

        return true;
    }

    function main()
    {
        const gameMatrix : boolean[][] = 
        [
            [false, true,  true,  false, false, false],
            [true,  true,  true,  false, false, false],
            [true,  true,  true,  true,  true,  true],
            [false, true,  true,  false, true,  true],
            [false, true,  true,  true,  false, true],
            [false, false, false, false, false, false],
        ];

        console.log(CanTravelTo(gameMatrix, 3, 2, 2, 2)); // true
        console.log(CanTravelTo(gameMatrix, 3, 2, 3, 2)); // false - same cell
        console.log(CanTravelTo(gameMatrix, 3, 2, 6, 2)); // false - out of bounds

    }

    main();

