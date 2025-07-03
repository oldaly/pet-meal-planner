  https://www.testdome.com/questions/c-sharp/boat-movements/134843

  # Boat Movements Game

A simple TS coding challenge where a boat moves across a 2D game matrix based on provided coordinates. The game matrix consists of water (true) and land (false) cells. The boat can only move horizontally or vertically, not diagonally.

## Problem Description

You are given:

- A 2D boolean array `gameMatrix`:
  - `true` represents water (boat can travel)
  - `false` represents land (boat cannot travel)

You are given:

- `fromRow` (integer): starting row index (zero-based)
- `fromColumn` (integer): starting column index (zero-based)
- `toRow` (integer): destination row index
- `toColumn` (integer): destination column index

### The function must determine whether the boat can travel from the starting cell to the destination cell under the following rules:

1. Boat can only move horizontally or vertically (never diagonally).
2. Boat must stay within the matrix boundaries.
3. The destination cell must be water (`true`).
4. All cells between starting cell and destination cell along the path must also be water.
5. If the start and destination cells are the same, consider this an invalid move and return `false`.
6. If any coordinates are out of bounds, throw an `ArgumentOutOfRangeException`.

## Method Signature

```csharp
public static bool CanTravelTo(bool[,] gameMatrix, int fromRow, int fromColumn, int toRow, int toColumn)
