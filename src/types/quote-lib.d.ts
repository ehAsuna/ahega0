declare module "quote-lib" {
	namespace quotes {
		export function getByCategory(category: string): { category: string, quote: string, author: string }
	}
	export = quotes;
}