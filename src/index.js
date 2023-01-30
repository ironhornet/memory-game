import './styles/styles.css'
import { MatchGrid } from './matchGrid/index';
import { config } from './mocks/mock';

const { width, height, columns, rows, pairOfPuzzles, timeLimit } = config;

const matchGrid = new MatchGrid(pairOfPuzzles, width, height, columns, rows, timeLimit);

matchGrid.create();
