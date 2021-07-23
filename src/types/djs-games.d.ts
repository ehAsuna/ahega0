declare module "djs-games" {
	import { Message } from "discord.js";
	abstract class Game {
		startGame(message: Message): void
	}
	class GuessTheNumber extends Game { }
	class ConnectFour extends Game { }
	class FastTyper extends Game { }
	class RockPaperScissors extends Game { }
	class SnakeGame extends Game { };
	class TicTacToe extends Game { };
	class Pokemon {
		start() { };
		constructor(data: { message: Discord.Message, token: string }) {

		}
	}
	export { ConnectFour, FastTyper, GuessTheNumber, Pokemon, RockPaperScissors, SnakeGame, TicTacToe }
}