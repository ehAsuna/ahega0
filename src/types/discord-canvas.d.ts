declare module "discord-canvas" {
	import Canvas from "canvas";
	class Greeting {
		setAvatar(value: string): this
		setDiscriminator(value: string): this;
		setUsername(value: string): this;
		setGuildName(value: string): this;
		setMemberCount(value: number): this;
		setBackground(value: string): this;
		setColor(variable: string, value: string): this;
		setText(variable: string, value: string): this;
		setOpacity(variable: string, value: number): this;
		toAttachment(): Promise<Canvas.Canvas>
	}
	class Welcome extends Greeting { };
	//class Welcome extends Greeting { };

	export { Greeting, Welcome }
}