declare module "ctk-anime-scraper" {
	interface IAnimeData {
		name: string
		image: string
		episodeCount: number
		status: string
		type: string
		genre: string
		released: boolean
	}
	interface ISearchData {
		link: string
	}
	function fetchAnime(link: string, data: { episode?: number, disableEpisodeFetch?: true }): Promise<IAnimeData>
	function search(name: string): Promise<ISearchData[]>
	export { fetchAnime, search };
}