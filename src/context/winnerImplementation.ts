import { IWinner } from "./interfaces";

class Winner implements IWinner {
    id = 0;
    wins = 0;
    time = 0;
}

export default Winner;